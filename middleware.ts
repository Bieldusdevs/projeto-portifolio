// ============================================
// MIDDLEWARE — Proteção do painel admin
// ============================================
import { NextResponse, NextRequest } from 'next/server'
import { AUTH_COOKIE, getPathSecret } from './lib/admin-auth'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  if (!pathname.startsWith('/painel')) {
    return NextResponse.next()
  }

  const authCookie = request.cookies.get(AUTH_COOKIE)
  const isAuthenticated = authCookie?.value === 'authenticated'
  const pathSecret = getPathSecret()

  // Página de login
  if (pathname === '/painel/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/painel', request.url))
    }
    const chave = searchParams.get('chave')
    if (chave !== pathSecret) {
      // Chave errada → 404 (esconde a existência)
      return NextResponse.rewrite(new URL('/404', request.url))
    }
    return NextResponse.next()
  }

  // Outras páginas admin
  if (!isAuthenticated) {
    const loginUrl = new URL('/painel/login', request.url)
    loginUrl.searchParams.set('chave', pathSecret)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/painel', '/painel/:path*'],
}
