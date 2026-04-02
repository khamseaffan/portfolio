import { NextResponse } from 'next/server';

export function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const session = request.cookies.get('admin_session')?.value;
    if (!session || session !== process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
