// ============================================
// API — Config (público, mostra se está usando defaults)
// Retorna info para o login saber se precisa mostrar avisos
// ============================================
import { NextResponse } from 'next/server'
import { getConfigStatus } from '@/lib/admin-auth'

export async function GET() {
  const status = getConfigStatus()
  return NextResponse.json({
    // Mostra só se está usando defaults, não os valores reais
    usingDefaultPathSecret: status.usingDefaultPathSecret,
    usingDefaultPassword: status.usingDefaultPassword,
    isProduction: status.isProduction,
  })
}
