import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/', '/server/:path*', '/sign-in/:path*'], // array apply middleware
}

const authPrefixes = ['/sign-in', '/sign-up']

export function middleware(request) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const { pathname } = request.nextUrl;

  // console.log("COOKIES MIDDLEWARE")
  // const allCookies = request.cookies.getAll()
  // console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

  if (authPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    if (pathname === '/sign-in/deleteAllCookies') {

      // console.log(request.cookies.getAll())
      const response = NextResponse.redirect(new URL('/sign-in', request.url));
      response.cookies.delete('accessToken')
      response.cookies.delete('refreshToken')
      return response;
    }

    if (request.cookies.has('accessToken')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  } 
  // console.log("++++NEXT_URL")
  // // console.log(pathname);
  // // console.log(request.url);
  // const allCookies = request.cookies.getAll()
  // console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
 
  // if (!request.cookies.has('accessToken')) {
  //   return NextResponse.redirect(new URL('/sign-in', request.url));
  // }

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  // let cookie = request.cookies.get('nextjs')
  // console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
  // const allCookies = request.cookies.getAll()
  // console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]
 
  // request.cookies.has('nextjs') // => true
  // request.cookies.delete('nextjs')
  // request.cookies.has('nextjs') // => false
 
  // // Setting cookies on the response using the `ResponseCookies` API
  // const response = NextResponse.next()
  // response.cookies.set('vercel', 'fast')
  // response.cookies.set({
  //   name: 'vercel',
  //   value: 'fast',
  //   path: '/',
  // })
  // cookie = response.cookies.get('vercel')
  // console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
  // // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

  return NextResponse.next();
}