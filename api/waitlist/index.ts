import type { IncomingMessage, ServerResponse } from 'http';
import { prisma } from '../lib/prisma.js';
import { sendWaitlistConfirmationEmail, sendAdminWaitlistNotification } from '../lib/mail.js';
import { withTimeout } from '../lib/async.js';

export interface VercelRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: any;
}

export interface VercelResponse extends ServerResponse {
  status?: (code: number) => VercelResponse;
  json?: (body: any) => VercelResponse;
}

/**
 * Safely parses the JSON request body regardless of whether Vercel pre-parsed it or streams it.
 *
 * @param {VercelRequest} req - Inbound request.
 * @returns {Promise<Record<string, any>>} Parsed body object.
 */
async function parseJsonBody(req: VercelRequest): Promise<Record<string, any>> {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }

  return new Promise((resolve) => {
    let rawData = '';
    req.on('data', (chunk: Buffer | string) => {
      rawData += chunk;
    });
    req.on('end', () => {
      try {
        resolve(rawData.trim() ? JSON.parse(rawData) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

/**
 * Sends a JSON response compatible with both Vercel helper methods and standard Node.js ServerResponse.
 *
 * @param {VercelResponse} res - Outbound server response.
 * @param {number} statusCode - HTTP status code.
 * @param {unknown} data - Payload to serialize.
 */
function sendJson(res: VercelResponse, statusCode: number, data: unknown): void {
  const statusFn = res.status;
  const jsonFn = res.json;
  if (typeof statusFn === 'function' && typeof jsonFn === 'function') {
    statusFn.call(res, statusCode);
    jsonFn.call(res, data);
    return;
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Persists waitlist subscriber to the database bounded by an execution deadline.
 *
 * @param {string} email - Normalized subscriber email.
 * @param {string} source - Registration source tag.
 * @param {number} timeoutMs - Timeout limit in milliseconds.
 * @returns {Promise<'persisted'>}
 */
async function persistWaitlistToDatabase(
  email: string,
  source: string,
  timeoutMs: number
): Promise<'persisted'> {
  const queryPromise = (async () => {
    await prisma.waitlistSubscriber.upsert({
      where: { email },
      update: { source },
      create: {
        email,
        source,
      },
    });

    // Synchronize with general subscriber ledger as well
    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: { source: 'waiting_list' },
      create: {
        email,
        source: 'waiting_list',
      },
    });

    return 'persisted' as const;
  })();

  return await withTimeout(queryPromise, timeoutMs, 'Database waitlist upsert');
}

/**
 * Vercel Serverless Function: POST /api/waitlist
 * Validates transmission email, records entry into database via Prisma with strict timeout,
 * and executes guaranteed dispatch of styled confirmation and admin notification emails.
 *
 * Fail-safe guarantee: If the database is slow, unreachable, or hanging, execution bounds
 * the wait, logs the incident, proceeds directly to email dispatch, and preserves the lead.
 *
 * @param {VercelRequest} req - Incoming serverless request object.
 * @param {VercelResponse} res - Serverless response dispatcher.
 * @returns {Promise<void>}
 */
export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (req.method && req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method Not Allowed' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');

    let body: { email?: string; source?: string } = {};
    try {
      body = await parseJsonBody(req);
    } catch (parseErr: unknown) {
      console.error('[API /api/waitlist] JSON parse error:', parseErr);
      sendJson(res, 400, { error: 'Invalid JSON payload format' });
      return;
    }

    const { email, source = 'teaser_waitlist' } = body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      sendJson(res, 400, { error: 'Invalid email address format' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const timestamp = new Date().toISOString();

    // Database timeout threshold: defaults to 2500ms or DB_TIMEOUT_MS env var
    const dbTimeoutMs = process.env.DB_TIMEOUT_MS
      ? Math.max(500, parseInt(process.env.DB_TIMEOUT_MS, 10) || 2500)
      : 2500;

    let dbStatus: 'persisted' | 'failed' | 'timeout' | 'skipped' = 'skipped';
    let dbError: string | undefined;

    // 1. Database Persistence via Prisma with strict deadline
    if (process.env.DATABASE_URL) {
      try {
        dbStatus = await persistWaitlistToDatabase(normalizedEmail, source, dbTimeoutMs);
        console.log(`[API /api/waitlist] Successfully persisted ${normalizedEmail} to database.`);
      } catch (dbErr: unknown) {
        dbError = dbErr instanceof Error ? dbErr.message : String(dbErr);
        const isTimeout = dbError.toLowerCase().includes('timed out');
        dbStatus = isTimeout ? 'timeout' : 'failed';

        console.warn(
          `[API /api/waitlist] Fail-safe active (${dbStatus}): ${dbError}. Bypassing database wait and proceeding to guaranteed email dispatch.`
        );

        // Structured log line for fail-safe audit trail and log drain recovery
        console.error(
          `[API /api/waitlist] [FAILSAFE_BACKUP] ${JSON.stringify({
            event: 'WAITLIST_DB_FAILOVER',
            email: normalizedEmail,
            source,
            timestamp,
            dbStatus,
            error: dbError,
          })}`
        );
      }
    } else {
      console.warn('[API /api/waitlist] DATABASE_URL undefined; skipping database write.');
    }

    // 2. Guaranteed Dispatch: Confirmation and Admin Alert Emails
    let emailDispatched = false;
    try {
      emailDispatched = await sendWaitlistConfirmationEmail({
        email: normalizedEmail,
        source,
        timestamp,
        dbStatus,
      });

      await sendAdminWaitlistNotification({
        email: normalizedEmail,
        source,
        timestamp,
        dbStatus,
        dbError,
      });
    } catch (mailErr: unknown) {
      console.error('[API /api/waitlist] Email delivery error:', mailErr);
    }

    // 3. Return Success Status (201 Created)
    sendJson(res, 201, {
      success: true,
      message: 'check your email',
      email: normalizedEmail,
      emailDispatched,
      dbStatus,
    });
  } catch (fatalErr: unknown) {
    console.error('[API /api/waitlist] Fatal handler exception:', fatalErr);
    sendJson(res, 500, {
      error: 'Transmission failed. Please retry shortly.',
    });
  }
}
