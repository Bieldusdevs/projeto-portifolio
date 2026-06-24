// ============================================
// API — Callback do GitHub OAuth
// GitHub redireciona para cá com ?code=XXX&state=YYY
// ============================================
import { NextRequest, NextResponse } from 'next/server'
import {
  exchangeCode,
  getGitHubUser,
  isAuthorized,
  signSession,
  SESSION_COOKIE,
  STATE_COOKIE,
} from '@/lib/github-oauth'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Caso 1: GitHub retornou erro (usuário cancelou, etc)
  if (error) {
    return NextResponse.redirect(
      new URL(
        `/painel/login?erro=${encodeURIComponent(error)}`,
        request.url
      )
    )
  }

  // Caso 2: Parâmetros faltando
  if (!code || !state) {
    return NextResponse.json(
      { error: 'Parâmetros code ou state ausentes' },
      { status: 400 }
    )
  }

  // Caso 3: Verificar CSRF (state)
  const stateCookie = request.cookies.get(STATE_COOKIE)
  if (!stateCookie || stateCookie.value !== state) {
    return NextResponse.json(
      { error: 'State inválido (possível CSRF)' },
      { status: 403 }
    )
  }

  try {
    // 1. Trocar code por access_token
    const accessToken = await exchangeCode(code)

    // 2. Buscar dados do usuário
    const user = await getGitHubUser(accessToken)

    // 3. Verificar se está autorizado
    if (!isAuthorized(user.login)) {
      return NextResponse.redirect(
        new URL('/painel/login?erro=nao_autorizado', request.url)
      )
    }

    // 4. Criar sessão
    const session = {
      username: user.login,
      name: user.name || user.login,
      avatar: user.avatar_url,
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 horas
    }

    const sessionToken = signSession(session)

    // 5. Redirecionar para painel com cookie de sessão
    const response = NextResponse.redirect(
      new URL('/painel', request.url)
    )

    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 horas
      path: '/',
    })
    response.cookies.delete(STATE_COOKIE)

    return response
  } catch (e) {
    console.error('Erro no OAuth callback:', e)
    return NextResponse.redirect(
      new URL('/painel/login?erro=oauth_falhou', request.url)
    )
  }
}
