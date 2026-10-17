import type { VercelRequest, VercelResponse } from '../events/index';
import { prisma } from '../../src/lib/prisma';

/**
 * Vercel Serverless Function: GET /api/tickets/availability
 * Returns live inventory metrics, remaining allocations, and sold-out states.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json');

  const { eventId } = req.query;
  const targetEventId = Array.isArray(eventId) ? eventId[0] : eventId;

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(200).json({
        availability: [
          { id: 'tier-01', name: 'Community Batch', capacity: 200, soldCount: 200, remaining: 0, status: 'SOLD_OUT' },
          { id: 'tier-02', name: 'Early Soul Pass', capacity: 350, soldCount: 350, remaining: 0, status: 'SOLD_OUT' },
          { id: 'tier-03', name: 'Phase I Entry', capacity: 600, soldCount: 552, remaining: 48, status: 'AVAILABLE' },
          { id: 'tier-04', name: 'Final Soul Allocation', capacity: 400, soldCount: 38, remaining: 362, status: 'AVAILABLE' },
        ],
      });
    }

    const tiers = await prisma.ticketTier.findMany({
      where: targetEventId ? { eventId: targetEventId } : undefined,
      orderBy: { orderIndex: 'asc' },
      select: {
        id: true,
        name: true,
        capacity: true,
        soldCount: true,
        status: true,
        priceCents: true,
        serviceFee: true,
      },
    });

    const availability = tiers.map((tier) => ({
      id: tier.id,
      name: tier.name,
      capacity: tier.capacity,
      soldCount: tier.soldCount,
      remaining: Math.max(0, tier.capacity - tier.soldCount),
      status: tier.soldCount >= tier.capacity ? 'SOLD_OUT' : tier.status,
    }));

    return res.status(200).json({ availability });
  } catch (err: unknown) {
    console.error('[API /api/tickets/availability] Error querying inventory:', err);
    return res.status(500).json({ error: 'Failed retrieving inventory levels' });
  }
}
