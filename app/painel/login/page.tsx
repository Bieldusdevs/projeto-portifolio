'use client'

// ============================================
// LOGIN — Senha
// Mostra aviso se estiver usando valores padrão
// ============================================
import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

type Config = {
  usingDefaultPathSecret: boolean
  usingDefaultPassword: boolean
  isProduction: boolean
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [config, setConfig] = useState<Config | null>(null)

  // Buscar config para saber se está usando defaults
  useEffect(() => {
    fetch('/api/admin/auth/config')
      .then((r) => r.json())
      .then(setConfig)
      .catch(() => setConfig(null))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const chave = searchParams.get('chave') || ''

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, chave }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/painel')
      } else {
        setError(data.error || 'Erro ao autenticar')
        setLoading(false)
      }
    } catch (e) {
      setError('Erro de conexão')
      setLoading(false)
    }
  }

  const usingDefaults =
    config?.usingDefaultPathSecret || config?.usingDefaultPassword

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#fafafa]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="font-serif text-3xl mb-3">
            painel<span className="text-black">.</span>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            Acesso restrito
          </div>
        </motion.div>

        {/* Card de login */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
        >
          <h1 className="font-serif text-2xl mb-2">Entrar</h1>
          <p className="text-sm text-zinc-500 mb-8">
            Digite sua senha para acessar o painel.
          </p>

          <div className="mb-6">
            <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            transition={{ duration: 0.2 }}
            className="w-full py-3.5 bg-black text-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Verificando...
              </span>
            ) : (
              'Entrar'
            )}
          </motion.button>

          {/* AVISO: usando valores padrão */}
          {usingDefaults && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900"
            >
              <div className="font-semibold mb-2 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z" />
                </svg>
                Modo demo — você está usando valores padrão
              </div>
              <ul className="space-y-1 ml-5 list-disc">
                {config?.usingDefaultPassword && (
                  <li>
                    Senha padrão: <code className="px-1 bg-amber-100 rounded font-mono">admin123</code>
                  </li>
                )}
                {config?.usingDefaultPathSecret && (
                  <li>
                    URL: <code className="px-1 bg-amber-100 rounded font-mono font-mono">/painel?chave=painel-admin</code>
                  </li>
                )}
              </ul>
              <div className="mt-3 text-amber-800">
                ⚠️ Para produção, defina{' '}
                <code className="px-1 bg-amber-100 rounded font-mono">ADMIN_PASSWORD_HASH</code> e{' '}
                <code className="px-1 bg-amber-100 rounded font-mono">ADMIN_PATH_SECRET</code> no arquivo{' '}
                <code className="px-1 bg-amber-100 rounded font-mono">.env</code>.
              </div>
            </motion.div>
          )}
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8 font-mono text-xs text-zinc-400"
        >
          © {new Date().getFullYear()} — Painel seguro
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  )
}
