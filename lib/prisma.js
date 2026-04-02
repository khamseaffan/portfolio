import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis;

function createClient() {
  // Use DATABASE_URL (port 6543, Transaction mode) for runtime —
  // Transaction mode releases connections after each query, ideal for serverless.
  // Session mode (port 5432) holds connections open and hits pool limits fast.
  const connectionString = (process.env.DATABASE_URL || process.env.DIRECT_URL)
    .replace('?pgbouncer=true', '');

  const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
    max: 1, // One connection per serverless instance — Supabase free tier has limited slots
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
