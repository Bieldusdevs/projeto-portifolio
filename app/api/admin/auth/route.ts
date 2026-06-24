// ============================================
// API — Login (senha)
// POST /api/admin/auth
// Body: { password, chave }
// ============================================
import { NextRequest, NextResponse } from 'next/server'
import {
  verifyPassword,
  getPasswordHash,
  getPathSecret,
  AUTH_COOKIE,
  AUTH_COOKIE_MAX_AGE,
} from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, chave } = body

    // 1. Validar chave (URL secret)
    if (chave !== getPathSecret()) {
      return NextResponse.json(
        { success: false, error: 'Acesso negado' },
        { status: 403 }
      )
    }

    // 2. Validar senha (com pequeno delay para anti-brute-force)
    const start = Date.now()
    const valid = verifyPassword(password, getPasswordHash())
    // Garante pelo menos 500ms (dificulta brute-force)
    const elapsed = Date.now() - start
    if (elapsed < 500) {
      await new Promise((r) => setTimeout(r, 500 - elapsed))
    }

    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Senha incorreta' },
        { status: 401 }
      )
    }

    // 3. Sucesso - setar cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set(AUTH_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: AUTH_COOKIE_MAX_AGE,
      path: '/',
    })
    return response
  } catch (e) {
    console.error('Erro no login:', e)
    return NextResponse.json(
      { success: false, error: 'Erro interno' },
      { status: 500 }
    )
  }
}
