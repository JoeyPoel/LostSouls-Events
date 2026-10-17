import type { VercelRequest, VercelResponse } from '../events/index';
import { prisma } from '../../src/lib/prisma';
import { sendWaitlistConfirmationEmail, sendAdminWaitlistNotification } from '../../src/lib/mail';

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
  if (req.method && req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  let body: { email?: string; source?: string };
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err: unknown) {
    console.error('[API /api/waitlist] JSON parse error:', err);
    res.status(400).json({ error: 'Invalid JSON payload format' });
    return;
  }

  const { email, source = 'teaser_waitlist' } = body || {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    res.status(400).json({ error: 'Invalid email address format' });
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
      console.error('[API /api/waitlist] DB storage error:', dbErr);
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

  res.status(201).json({
    success: true,
    message: 'check your email',
    email: normalizedEmail,
    emailDispatched,
  });
}
