// ============================================
// GITHUB OAUTH + SESSÃO
// - Inicia fluxo OAuth do GitHub
// - Troca code por access_token
// - Verifica usuário autorizado
// - Assina sessão com HMAC (cookie httpOnly)
// ============================================
import { createHmac, randomBytes } from 'crypto'

const SESSION_SECRET = process.env.SESSION_SECRET || 'mude-isso-em-producao-agora'
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || ''
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || ''
const ADMIN_GITHUB_USERNAME = process.env.ADMIN_GITHUB_USERNAME || ''

export const SESSION_COOKIE = 'admin-session'
export const STATE_COOKIE = 'oauth-state'

// ============================================
// Tipos
// ============================================
export type Session = {
  username: string
  name: string
  avatar: string
  expires: number
}

// ============================================
// SESSÃO — Assina com HMAC-SHA256
// Formato: base64url(payload).base64url(signature)
// ============================================
export function signSession(session: Session): string {
  const data = Buffer.from(JSON.stringify(session)).toString('base64url')
  const signature = createHmac('sha256', SESSION_SECRET)
    .update(data)
    .digest('base64url')
  return `${data}.${signature}`
}

export function verifySession(token: string): Session | null {
  try {
    const [data, signature] = token.split('.')
    if (!data || !signature) return null

    const expected = createHmac('sha256', SESSION_SECRET)
      .update(data)
      .digest('base64url')

    // Comparação timing-safe
    if (
      signature.length !== expected.length ||
      !timingSafeEqualStr(signature, expected)
    ) {
      return null
    }

    const session: Session = JSON.parse(
      Buffer.from(data, 'base64url').toString()
    )

    if (session.expires < Date.now()) return null
    return session
  } catch {
    return null
  }
}

function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

// ============================================
// CSRF — Gera state aleatório
// ============================================
export function generateState(): string {
  return randomBytes(32).toString('base64url')
}

// ============================================
// GITHUB OAUTH
// ============================================
export function getAuthorizeUrl(state: string, redirectUri: string): string {
  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'read:user', // Só precisamos do username
    state,
    allow_signup: 'false', // Não deixa cadastrar durante OAuth
  })
  return `https://github.com/login/oauth/authorize?${params.toString()}`
}

/**
 * Troca o `code` por um access_token do GitHub
 */
export async function exchangeCode(code: string): Promise<string> {
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  })

  if (!res.ok) throw new Error('Falha ao trocar code por token')
  const data = await res.json()

  if (data.error) {
    throw new Error(data.error_description || data.error)
  }

  if (!data.access_token) {
    throw new Error('GitHub não retornou access_token')
  }

  return data.access_token
}

/**
 * Busca info do usuário autenticado no GitHub
 */
export async function getGitHubUser(accessToken: string) {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'Portfolio-Admin',
      Accept: 'application/vnd.github+json',
    },
  })

  if (!res.ok) throw new Error('Falha ao buscar usuário')
  return res.json()
}

/**
 * Verifica se o username está na lista de admins permitidos
 * Suporta múltiplos: "user1,user2,user3"
 */
export function isAuthorized(username: string): boolean {
  if (!ADMIN_GITHUB_USERNAME) return false
  const allowed = ADMIN_GITHUB_USERNAME
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
  return allowed.includes(username.toLowerCase())
}

/**
 * Validação para usar no início do fluxo
 */
export function validateConfig(): { valid: boolean; error?: string } {
  if (!GITHUB_CLIENT_ID) return { valid: false, error: 'GITHUB_CLIENT_ID não definido' }
  if (!GITHUB_CLIENT_SECRET) return { valid: false, error: 'GITHUB_CLIENT_SECRET não definido' }
  if (!ADMIN_GITHUB_USERNAME) return { valid: false, error: 'ADMIN_GITHUB_USERNAME não definido' }
  return { valid: true }
}
