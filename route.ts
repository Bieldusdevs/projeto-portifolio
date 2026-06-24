// ============================================
// DEBUG — Endpoint temporário de diagnóstico
// Mostra quais env vars estão acessíveis
// ⚠️ REMOVER APÓS RESOLVER O PROBLEMA
// ============================================
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    // Boolean: está definida?
    env_vars_present: {
      GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: !!process.env.GITHUB_CLIENT_SECRET,
      ADMIN_GITHUB_USERNAME: !!process.env.ADMIN_GITHUB_USERNAME,
      SESSION_SECRET: !!process.env.SESSION_SECRET,
      ADMIN_PATH_SECRET: !!process.env.ADMIN_PATH_SECRET,
    },
    // Preview dos valores (sem revelar tudo)
    env_vars_preview: {
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID
        ? process.env.GITHUB_CLIENT_ID.slice(0, 4) + '...' + process.env.GITHUB_CLIENT_ID.slice(-4)
        : null,
      ADMIN_GITHUB_USERNAME: process.env.ADMIN_GITHUB_USERNAME || null,
      ADMIN_PATH_SECRET: process.env.ADMIN_PATH_SECRET || null,
    },
    // Ambiente atual
    vercel_env: process.env.VERCEL_ENV || 'unknown',
    node_env: process.env.NODE_ENV,
  })
}
