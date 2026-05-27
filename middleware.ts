import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/sessions'

const protectedPrefixes = ['/dashboard']
const authRoutes = ['/auth/login', '/auth/signup', '/auth/forgotpassword']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p))
  const isAuth = authRoutes.includes(pathname)

  const sessionToken = request.cookies.get('session')?.value
  const session = sessionToken ? await decrypt(sessionToken) : null
  const isLoggedIn = !!session?.userId

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuth && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}
