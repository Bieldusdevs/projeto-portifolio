// ============================================
// MIDDLEWARE — Proteção do painel admin
// - Esconde URL via chave secreta
// - Exige sessão GitHub válida (cookie assinado HMAC)
// ============================================
import { NextResponse, NextRequest } from 'next/server'
import { verifySession, SESSION_COOKIE } from './lib/github-oauth'

const ADMIN_PATH_SECRET = process.env.ADMIN_PATH_SECRET || 'painel-temporario-2025'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Apenas rotas /painel/*
  if (!pathname.startsWith('/painel')) {
    return NextResponse.next()
  }

  // Verificar sessão (cookie assinado)
  const sessionCookie = request.cookies.get(SESSION_COOKIE)
  const session = sessionCookie?.value ? verifySession(sessionCookie.value) : null
  const isAuthenticated = !!session

  // ========== PÁGINA DE LOGIN ==========
  if (pathname === '/painel/login') {
    // Se já autenticado, vai direto pro painel
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/painel', request.url))
    }
    // Verifica chave da URL
    const chave = searchParams.get('chave')
    if (chave !== ADMIN_PATH_SECRET) {
      // Chave errada → 404 (esconde a existência do painel)
      return NextResponse.rewrite(new URL('/404', request.url))
    }
    return NextResponse.next()
  }

  // ========== DASHBOARD (/) ==========
  if (pathname === '/painel' || pathname === '/painel/') {
    if (!isAuthenticated) {
      const loginUrl = new URL('/painel/login', request.url)
      loginUrl.searchParams.set('chave', ADMIN_PATH_SECRET)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  // ========== OUTRAS PÁGINAS ADMIN ==========
  if (!isAuthenticated) {
    const loginUrl = new URL('/painel/login', request.url)
    loginUrl.searchParams.set('chave', ADMIN_PATH_SECRET)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/painel', '/painel/:path*'],
}
