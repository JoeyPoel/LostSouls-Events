import type { IncomingMessage, ServerResponse } from 'http';
import { prisma } from '../../src/lib/prisma';
import { sendWaitlistConfirmationEmail, sendAdminWaitlistNotification } from '../../src/lib/mail';

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
 * Vercel Serverless Function: POST /api/waitlist
 * Validates transmission email, records entry into database via Prisma,
 * and executes dispatch of styled confirmation and admin notification emails.
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

    // 1. Database Persistence via Prisma (if configured)
    if (process.env.DATABASE_URL) {
      try {
        await prisma.waitlistSubscriber.upsert({
          where: { email: normalizedEmail },
          update: { source },
          create: {
            email: normalizedEmail,
            source,
          },
        });

        // Synchronize with general subscriber ledger as well
        await prisma.newsletterSubscriber.upsert({
          where: { email: normalizedEmail },
          update: { source: 'waiting_list' },
          create: {
            email: normalizedEmail,
            source: 'waiting_list',
          },
        });
        console.log(`[API /api/waitlist] Successfully persisted ${normalizedEmail} to database.`);
      } catch (dbErr: unknown) {
        console.error('[API /api/waitlist] DB storage error (proceeding to email):', dbErr);
      }
    } else {
      console.warn('[API /api/waitlist] DATABASE_URL undefined; skipping database write.');
    }

    // 2. Dispatch Confirmation and Admin Alert Emails
    let emailDispatched = false;
    try {
      emailDispatched = await sendWaitlistConfirmationEmail({
        email: normalizedEmail,
        source,
        timestamp,
      });

      await sendAdminWaitlistNotification({
        email: normalizedEmail,
        source,
        timestamp,
      });
    } catch (mailErr: unknown) {
      console.error('[API /api/waitlist] Email delivery error:', mailErr);
    }

    sendJson(res, 201, {
      success: true,
      message: 'check your email',
      email: normalizedEmail,
      emailDispatched,
    });
  } catch (fatalErr: unknown) {
    console.error('[API /api/waitlist] Fatal handler exception:', fatalErr);
    sendJson(res, 500, {
      error: 'Transmission failed. Please retry shortly.',
    });
  }
}
