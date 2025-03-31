import { NextResponse } from 'next/server';

// Maximum execution time for middleware (in ms)
const MIDDLEWARE_TIMEOUT = 3000;

export async function middleware(request) {
  try {
    // Add a timeout to prevent MIDDLEWARE_INVOCATION_TIMEOUT errors
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Middleware timeout'));
      }, MIDDLEWARE_TIMEOUT);
    });

    const responsePromise = Promise.resolve(NextResponse.next());
    
    // Race between the response and the timeout
    return await Promise.race([responsePromise, timeoutPromise]);
  } catch (error) {
    console.error('Middleware error:', error);
    // Return a next response even in case of errors to prevent
    // MIDDLEWARE_INVOCATION_FAILED errors
    return NextResponse.next();
  }
}

// Only run middleware on specific paths if needed
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 