import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { getIpHash } from '@/lib/ip';

export async function POST(request) {
  const ipHash = await getIpHash();

  if (!checkRateLimit(`admin-login:${ipHash}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', process.env.ADMIN_SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return response;
}
