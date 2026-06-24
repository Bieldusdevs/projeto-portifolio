// ============================================
// ADMIN AUTH — Login por senha
// Funciona SEM configurar nada (tem defaults).
// Para produção, defina ADMIN_PASSWORD_HASH no .env.
// ============================================
import { createHash } from 'crypto'

// ⚠️ Defaults de DEMO. Mude para produção!
const DEFAULT_PATH_SECRET = 'painel-admin'
const DEFAULT_PASSWORD = 'admin123'

export const AUTH_COOKIE = 'admin-auth'
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 // 24 horas

/**
 * Hash SHA-256 de uma senha
 */
export function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

/**
 * Verifica senha (timing-safe)
 */
export function verifyPassword(password: string, hash: string): boolean {
  try {
    const a = hashPassword(password)
    if (a.length !== hash.length) return false
    let mismatch = 0
    for (let i = 0; i < a.length; i++) {
      mismatch |= a.charCodeAt(i) ^ hash.charCodeAt(i)
    }
    return mismatch === 0
  } catch {
    return false
  }
}

/**
 * Retorna o segredo da URL.
 * Usa DEFAULT se ADMIN_PATH_SECRET não estiver definido.
 */
export function getPathSecret(): string {
  return process.env.ADMIN_PATH_SECRET || DEFAULT_PATH_SECRET
}

/**
 * Retorna o hash da senha.
 * Usa DEFAULT se ADMIN_PASSWORD_HASH não estiver definido.
 */
export function getPasswordHash(): string {
  return process.env.ADMIN_PASSWORD_HASH || hashPassword(DEFAULT_PASSWORD)
}

/**
 * Detecta se está usando valores padrão
 */
export function getConfigStatus() {
  return {
    usingDefaultPathSecret: !process.env.ADMIN_PATH_SECRET,
    usingDefaultPassword: !process.env.ADMIN_PASSWORD_HASH,
    // Em produção, força mudança
    isProduction: process.env.NODE_ENV === 'production',
  }
}
