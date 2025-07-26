import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Protect admin dashboard routes
  if (pathname.startsWith('/admin/dashboard')) {
    const adminToken = request.cookies.get('adminToken')
    
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*'
  ]
} 