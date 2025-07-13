import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'dev-auth';

export function middleware(request: NextRequest) {
  // We only run this middleware in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has(AUTH_COOKIE_NAME);

  // Allow access to the login page and API routes
  if (pathname.startsWith('/login') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all routes except for static files and next-specific folders
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
