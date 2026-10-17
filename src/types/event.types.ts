import type { TicketTier } from './ticket.types';

export interface Artist {
  id: string;
  name: string;
  performance: string; // e.g. "Hybrid Live", "B2B", "Special Closing"
  orderIndex: number;
  stage: string;       // e.g. "Main Stage", "Dark Tunnel"
  eventId: string;
}

export interface EventEdition {
  id: string;
  slug: string;
  title: string;
  chapter: string;
  venue: string;
  city: string;
  eventDate: string; // ISO string
  doorsOpen: string;
  doorsClose: string;
  heroImage: string;
  isPublished: boolean;
  ticketTiers: TicketTier[];
  artists: Artist[];
  createdAt?: string;
  updatedAt?: string;
}

export type StageName = 'ALL STAGES' | 'MAIN STAGE' | 'DARK TUNNEL';
