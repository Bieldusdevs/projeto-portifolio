// ============================================
// ADMIN AUTH — Helpers de autenticação
// Apenas server-side (usa crypto do Node)
// ============================================
import { createHash, randomBytes, timingSafeEqual } from 'crypto'

/**
 * Gera hash SHA-256 de uma senha
 */
export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Verifica senha comparando com hash (timing-safe)
 */
export function verifyPassword(password: string, hash: string): boolean {
  try {
    const providedHash = hashPassword(password)
    const a = Buffer.from(providedHash, 'hex')
    const b = Buffer.from(hash, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

/**
 * Gera secret aleatório para URL do painel
 */
export function generateSecret(length: number = 12): string {
  return randomBytes(length).toString('base64url').slice(0, length)
}

/**
 * Constantes de configuração do cookie
 */
export const AUTH_COOKIE = 'admin-auth'
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 // 24 horas

export const ATTEMPTS_COOKIE = 'admin-attempts'
export const BLOCK_COOKIE = 'admin-block'
export const MAX_ATTEMPTS = 5
export const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutos

/**
 * Calcula delay exponencial para anti-brute-force
 * 1ª falha: 1s | 2ª: 2s | 3ª: 4s | 4ª: 8s | 5ª: 16s
 */
export function calculateDelay(attempts: number): number {
  return Math.min(1000 * Math.pow(2, attempts - 1), 30000)
}
