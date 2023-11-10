import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/server/:path*'], // array apply middleware
}

export function middleware(request) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const { pathname } = request.nextUrl;
 
  if (!request.cookies.has('accessToken')) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
 
  return response;
}