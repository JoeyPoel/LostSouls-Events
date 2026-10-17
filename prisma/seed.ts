import { PrismaClient, TicketStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seeds the database with the initial Lost Souls event editions, artists, and ticket tiers.
 */
async function main() {
  console.log('Seeding Lost Souls database...');

  // Clean existing records if any
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.ticketTier.deleteMany({});
  await prisma.artist.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.newsletterSubscriber.deleteMany({});

  // Seed Event Chapter 01
  const gathering = await prisma.event.create({
    data: {
      slug: 'chapter-01-dark-resonance',
      title: 'Chapter 01: The Dark Resonance',
      chapter: 'CHAPTER 01',
      venue: 'NOW & WOW WAREHOUSE',
      city: 'ROTTERDAM // AMSTERDAM DOCKS',
      eventDate: new Date('2026-11-14T23:00:00.000Z'),
      doorsOpen: '23:00',
      doorsClose: '07:00',
      heroImage: '/images/hero-warehouse.webp',
      isPublished: true,
      artists: {
        create: [
          {
            name: 'KOBOSIL',
            performance: 'SPECIAL CLOSING',
            orderIndex: 1,
            stage: 'MAIN STAGE',
          },
          {
            name: 'DAX J',
            performance: 'HYBRID LIVE',
            orderIndex: 2,
            stage: 'MAIN STAGE',
          },
          {
            name: 'SOMEMI B2B VORTEK',
            performance: 'B2B',
            orderIndex: 3,
            stage: 'MAIN STAGE',
          },
          {
            name: 'CLOUDY',
            performance: 'LIVE',
            orderIndex: 4,
            stage: 'MAIN STAGE',
          },
          {
            name: 'ANETHA',
            performance: 'HYBRID LIVE',
            orderIndex: 5,
            stage: 'DARK TUNNEL',
          },
          {
            name: 'HEKTOR MASS',
            performance: 'SPECIAL CLOSING',
            orderIndex: 6,
            stage: 'DARK TUNNEL',
          },
          {
            name: 'SARA LANDRY',
            performance: 'B2B',
            orderIndex: 7,
            stage: 'DARK TUNNEL',
          },
        ],
      },
      ticketTiers: {
        create: [
          {
            name: 'Community Batch',
            priceCents: 2200,
            serviceFee: 250,
            capacity: 200,
            soldCount: 200,
            status: TicketStatus.SOLD_OUT,
            orderIndex: 1,
          },
          {
            name: 'Early Soul Pass',
            priceCents: 2700,
            serviceFee: 250,
            capacity: 350,
            soldCount: 350,
            status: TicketStatus.SOLD_OUT,
            orderIndex: 2,
          },
          {
            name: 'Phase I Entry',
            priceCents: 3400,
            serviceFee: 300,
            capacity: 600,
            soldCount: 552, // 92% sold out
            status: TicketStatus.AVAILABLE,
            orderIndex: 3,
          },
          {
            name: 'Final Soul Allocation',
            priceCents: 4200,
            serviceFee: 350,
            capacity: 400,
            soldCount: 38,
            status: TicketStatus.AVAILABLE,
            orderIndex: 4,
          },
        ],
      },
    },
  });

  console.log(`Successfully seeded event: ${gathering.title} (${gathering.id})`);
}

main()
  .catch((e) => {
    console.error('Failed seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
