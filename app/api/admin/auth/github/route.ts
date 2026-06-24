// ============================================
// API — Inicia fluxo OAuth do GitHub
// GET /api/admin/auth/github?chave=SEGREDO
// ============================================
import { NextRequest, NextResponse } from 'next/server'
import {
  generateState,
  getAuthorizeUrl,
  validateConfig,
  STATE_COOKIE,
} from '@/lib/github-oauth'

export async function GET(request: NextRequest) {
  // 1. Validar chave da URL (segurança extra)
  const secret = process.env.ADMIN_PATH_SECRET || 'painel-temporario-2025'
  const chave = request.nextUrl.searchParams.get('chave')
  if (chave !== secret) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }

  // 2. Validar configuração
  const config = validateConfig()
  if (!config.valid) {
    return NextResponse.json(
      {
        error:
          'Painel não configurado. Defina GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET e ADMIN_GITHUB_USERNAME.',
      },
      { status: 500 }
    )
  }

  // 3. Gerar state para CSRF
  const state = generateState()

  // 4. Construir URL de redirecionamento (dinâmica: dev ou prod)
  const redirectUri = `${request.nextUrl.origin}/api/admin/auth/github/callback`

  // 5. Redirecionar para GitHub
  const authorizeUrl = getAuthorizeUrl(state, redirectUri)

  const response = NextResponse.redirect(authorizeUrl)
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // 'lax' necessário para OAuth cross-site
    maxAge: 600, // 10 minutos
    path: '/',
  })

  return response
}
