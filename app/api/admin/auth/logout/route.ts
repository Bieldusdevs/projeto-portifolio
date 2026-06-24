// ============================================
// API — Logout
// ============================================
import { NextResponse } from 'next/server'
import { SESSION_COOKIE } from '@/lib/github-oauth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete({
    name: SESSION_COOKIE,
    path: '/',
  })
  return response
}
