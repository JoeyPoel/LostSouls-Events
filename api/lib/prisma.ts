import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Returns the singleton PrismaClient instance, initializing lazily if DATABASE_URL is defined.
 * If DATABASE_URL is missing or initialization fails, returns null.
 *
 * @returns {PrismaClient | null} Active Prisma client or null.
 */
export function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = client;
    }

    return client;
  } catch (err: unknown) {
    console.error('[Prisma] Lazy instantiation error:', err);
    return null;
  }
}

/**
 * Transparent proxy for PrismaClient that defers instantiation until query execution.
 * Prevents serverless functions from crashing on module evaluation when DATABASE_URL
 * is unset or when binary dependencies are initializing.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop: string | symbol) {
    const client = getPrismaClient();
    if (!client) {
      throw new Error(
        `Prisma client unavailable: DATABASE_URL is not set or failed to initialize when accessing "${String(prop)}".`
      );
    }
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

export default prisma;
