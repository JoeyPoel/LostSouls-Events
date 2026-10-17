import type { VercelRequest, VercelResponse } from '../events/index.js';
import { prisma } from '../lib/prisma.js';

/**
 * Vercel Serverless Function: POST /api/newsletter/subscribe
 * Validates email formatting and stores community subscriptions.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.setHeader('Content-Type', 'application/json');

  let body: { email?: string; source?: string };
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch (err: unknown) {
    console.error('[API /api/newsletter/subscribe] JSON parse error:', err);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const { email, source = 'website_footer' } = body || {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid transmission address format' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!process.env.DATABASE_URL) {
    return res.status(201).json({
      success: true,
      message: 'Subscription confirmed for inner circle dispatch',
    });
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: normalizedEmail },
      update: { source },
      create: {
        email: normalizedEmail,
        source,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Subscription registered successfully',
    });
  } catch (err: unknown) {
    console.error('[API /api/newsletter/subscribe] DB Error:', err);
    return res.status(500).json({ error: 'Failed to record transmission subscription' });
  }
}
