import type { VercelRequest, VercelResponse } from './index';
import { prisma } from '../../src/lib/prisma';

/**
 * Vercel Serverless Function: GET /api/events/[slug]
 * Returns single edition telemetry and associated data by slug.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { slug } = req.query;
  const targetSlug = Array.isArray(slug) ? slug[0] : slug;

  if (!targetSlug) {
    return res.status(400).json({ error: 'Missing slug parameter' });
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  res.setHeader('Content-Type', 'application/json');

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(200).json({
        event: {
          slug: targetSlug,
          title: 'Chapter 01: The Dark Resonance',
          chapter: 'CHAPTER 01',
          venue: 'NOW & WOW WAREHOUSE',
          city: 'ROTTERDAM // AMSTERDAM DOCKS',
          eventDate: '2026-11-14T23:00:00.000Z',
          doorsOpen: '23:00',
          doorsClose: '07:00',
        },
      });
    }

    const event = await prisma.event.findUnique({
      where: { slug: targetSlug },
      include: {
        artists: { orderBy: { orderIndex: 'asc' } },
        ticketTiers: { orderBy: { orderIndex: 'asc' } },
      },
    });

    if (!event) {
      return res.status(404).json({ error: 'Edition not found' });
    }

    return res.status(200).json({ event });
  } catch (err: unknown) {
    console.error(`[API /api/events/${targetSlug}] Error:`, err);
    return res.status(500).json({ error: 'Internal server telemetry failure' });
  }
}
