import { headers } from 'next/headers';
import { createHash } from 'crypto';

export async function getIpHash() {
  const headersList = await headers();
  const forwarded = headersList.get('x-forwarded-for');
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : headersList.get('x-real-ip') || '127.0.0.1';

  return createHash('sha256')
    .update(ip + (process.env.ADMIN_SESSION_SECRET || 'dev-salt'))
    .digest('hex');
}
