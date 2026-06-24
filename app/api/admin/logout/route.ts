// ============================================
// API — Logout do painel admin
// ============================================
import { NextResponse } from 'next/server'
import { AUTH_COOKIE } from '@/lib/admin-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete({
    name: AUTH_COOKIE,
    path: '/',
  })
  return response
}
