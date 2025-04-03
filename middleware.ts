import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public paths that don't require authentication
const publicPaths = ['/login', '/signup', '/reset-password', '/landing']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the Firebase token from the session cookie
  const session = request.cookies.get('__session')?.value
  const isAuthenticated = !!session

  // Check if the requested path is public
  const isPublicPath = publicPaths.includes(pathname)

  // Get the base URL from the request
  const baseUrl = request.nextUrl.origin

  // Redirect /subscription to /pricing
  if (pathname === '/subscription') {
    return NextResponse.redirect(new URL('/pricing', baseUrl))
  }

  // Redirect authenticated users away from public paths
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', baseUrl))
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthenticated && !isPublicPath && pathname !== '/') {
    const loginUrl = new URL('/login', baseUrl)
    // Add the current path as a redirect parameter
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Handle root path for authenticated users
  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', baseUrl))
  }

  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 