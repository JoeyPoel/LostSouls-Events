import type { IncomingMessage, ServerResponse } from 'http';
import { prisma } from '../../src/lib/prisma';

export interface VercelRequest extends IncomingMessage {
  query: Record<string, string | string[]>;
  body: any;
  method?: string;
}

export interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: any) => VercelResponse;
  setHeader: (name: string, value: string | number | readonly string[]) => this;
}

// Default fallback data for development/environments without live Postgres instance
const FALLBACK_EVENTS = [
  {
    id: 'evt-lost-souls-001',
    slug: 'chapter-01-dark-resonance',
    title: 'Chapter 01: The Dark Resonance',
    chapter: 'CHAPTER 01',
    venue: 'NOW & WOW WAREHOUSE',
    city: 'ROTTERDAM // AMSTERDAM DOCKS',
    eventDate: '2026-11-14T23:00:00.000Z',
    doorsOpen: '23:00',
    doorsClose: '07:00',
    heroImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1470&auto=format&fit=crop',
    isPublished: true,
    artists: [
      { id: 'art-01', name: 'KOBOSIL', performance: 'SPECIAL CLOSING', orderIndex: 1, stage: 'MAIN STAGE', eventId: 'evt-lost-souls-001' },
      { id: 'art-02', name: 'DAX J', performance: 'HYBRID LIVE', orderIndex: 2, stage: 'MAIN STAGE', eventId: 'evt-lost-souls-001' },
      { id: 'art-03', name: 'SOMEMI B2B VORTEK', performance: 'B2B', orderIndex: 3, stage: 'MAIN STAGE', eventId: 'evt-lost-souls-001' },
      { id: 'art-04', name: 'CLOUDY', performance: 'LIVE', orderIndex: 4, stage: 'MAIN STAGE', eventId: 'evt-lost-souls-001' },
      { id: 'art-05', name: 'ANETHA', performance: 'HYBRID LIVE', orderIndex: 5, stage: 'DARK TUNNEL', eventId: 'evt-lost-souls-001' },
      { id: 'art-06', name: 'HEKTOR MASS', performance: 'SPECIAL CLOSING', orderIndex: 6, stage: 'DARK TUNNEL', eventId: 'evt-lost-souls-001' },
      { id: 'art-07', name: 'SARA LANDRY', performance: 'B2B', orderIndex: 7, stage: 'DARK TUNNEL', eventId: 'evt-lost-souls-001' },
    ],
    ticketTiers: [
      { id: 'tier-01', name: 'Community Batch', priceCents: 2200, serviceFee: 250, capacity: 200, soldCount: 200, status: 'SOLD_OUT', orderIndex: 1, eventId: 'evt-lost-souls-001' },
      { id: 'tier-02', name: 'Early Soul Pass', priceCents: 2700, serviceFee: 250, capacity: 350, soldCount: 350, status: 'SOLD_OUT', orderIndex: 2, eventId: 'evt-lost-souls-001' },
      { id: 'tier-03', name: 'Phase I Entry', priceCents: 3400, serviceFee: 300, capacity: 600, soldCount: 552, status: 'AVAILABLE', orderIndex: 3, eventId: 'evt-lost-souls-001' },
      { id: 'tier-04', name: 'Final Soul Allocation', priceCents: 4200, serviceFee: 350, capacity: 400, soldCount: 38, status: 'AVAILABLE', orderIndex: 4, eventId: 'evt-lost-souls-001' },
    ],
  },
];

/**
 * Sends a JSON response compatible with both Vercel helper methods and standard Node.js ServerResponse.
 *
 * @param {VercelResponse} res - Outbound server response.
 * @param {number} statusCode - HTTP status code.
 * @param {unknown} data - Payload to serialize.
 */
function sendJson(res: VercelResponse, statusCode: number, data: unknown): void {
  const statusFn = (res as any).status;
  const jsonFn = (res as any).json;
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
 * Vercel Serverless Function: GET /api/events
 * Returns active published editions with ordered lineups and ticket tier matrix.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method && req.method !== 'GET') {
      sendJson(res, 405, { error: 'Method Not Allowed' });
      return;
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.setHeader('Content-Type', 'application/json');

    if (!process.env.DATABASE_URL) {
      sendJson(res, 200, { events: FALLBACK_EVENTS });
      return;
    }

    const events = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { eventDate: 'asc' },
      include: {
        artists: {
          orderBy: { orderIndex: 'asc' },
        },
        ticketTiers: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!events || events.length === 0) {
      sendJson(res, 200, { events: FALLBACK_EVENTS });
      return;
    }

    sendJson(res, 200, { events });
  } catch (err: unknown) {
    console.error('[API /api/events] Database query failed, using fallback data:', err);
    sendJson(res, 200, { events: FALLBACK_EVENTS });
  }
}
