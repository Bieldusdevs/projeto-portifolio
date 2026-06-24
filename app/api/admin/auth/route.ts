// ============================================
// API — Login do painel admin
// Anti brute-force via cookie + delay exponencial
// ============================================
import { NextRequest, NextResponse } from 'next/server'
import {
  verifyPassword,
  AUTH_COOKIE,
  AUTH_COOKIE_MAX_AGE,
  ATTEMPTS_COOKIE,
  BLOCK_COOKIE,
  MAX_ATTEMPTS,
  BLOCK_DURATION,
  calculateDelay,
} from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password, chave } = body

    // 1. Validar chave (URL secret)
    const adminSecret = process.env.ADMIN_PATH_SECRET || 'painel-temporario-2025'
    if (chave !== adminSecret) {
      return NextResponse.json(
        { success: false, error: 'Acesso negado' },
        { status: 403 }
      )
    }

    // 2. Verificar se está bloqueado
    const blockCookie = request.cookies.get(BLOCK_COOKIE)
    if (blockCookie) {
      const blockedUntil = parseInt(blockCookie.value, 10)
      if (Date.now() < blockedUntil) {
        const minutesLeft = Math.ceil((blockedUntil - Date.now()) / 60000)
        return NextResponse.json(
          {
            success: false,
            error: `Muitas tentativas. Bloqueado por ${minutesLeft} minuto(s).`,
          },
          { status: 429 }
        )
      }
    }

    // 3. Obter número de tentativas
    const attemptsCookie = request.cookies.get(ATTEMPTS_COOKIE)
    const attempts = attemptsCookie ? parseInt(attemptsCookie.value, 10) : 0

    // 4. Verificar senha
    const passwordHash = process.env.ADMIN_PASSWORD_HASH
    if (!passwordHash) {
      console.error('ADMIN_PASSWORD_HASH não configurado')
      return NextResponse.json(
        { success: false, error: 'Painel não configurado. Defina ADMIN_PASSWORD_HASH.' },
        { status: 500 }
      )
    }

    const valid = verifyPassword(password, passwordHash)

    if (!valid) {
      const newAttempts = attempts + 1

      // Delay exponencial (anti brute-force)
      await new Promise((resolve) => setTimeout(resolve, calculateDelay(newAttempts)))

      const response = NextResponse.json(
        { success: false, error: 'Senha incorreta' },
        { status: 401 }
      )

      response.cookies.set(ATTEMPTS_COOKIE, String(newAttempts), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
      })

      // Bloquear após MAX_ATTEMPTS
      if (newAttempts >= MAX_ATTEMPTS) {
        response.cookies.set(BLOCK_COOKIE, String(Date.now() + BLOCK_DURATION), {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: BLOCK_DURATION / 1000,
        })
      }

      return response
    }

    // 5. Sucesso - limpar tentativas e setar auth
    const response = NextResponse.json({ success: true })

    response.cookies.set(AUTH_COOKIE, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: AUTH_COOKIE_MAX_AGE,
      path: '/',
    })

    response.cookies.delete(ATTEMPTS_COOKIE)
    response.cookies.delete(BLOCK_COOKIE)

    return response
  } catch (e) {
    console.error('Erro no login:', e)
    return NextResponse.json(
      { success: false, error: 'Erro interno' },
      { status: 500 }
    )
  }
}
