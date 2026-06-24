// ============================================
// API — Status da sessão
// Retorna dados do usuário logado
// ============================================
import { NextRequest, NextResponse } from 'next/server'
import { verifySession, SESSION_COOKIE } from '@/lib/github-oauth'

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE)

  if (!cookie) {
    return NextResponse.json({ authenticated: false })
  }

  const session = verifySession(cookie.value)
  if (!session) {
    return NextResponse.json({ authenticated: false })
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: session.username,
      name: session.name,
      avatar: session.avatar,
    },
  })
}
