'use client'

// ============================================
// LOGIN — Login via GitHub OAuth
// Visual: preto/branco com Framer Motion
// ============================================
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('erro')
  const [checking, setChecking] = useState(true)

  // Se já está autenticado, redireciona
  useEffect(() => {
    fetch('/api/admin/auth/status')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) {
          router.push('/painel')
        } else {
          setChecking(false)
        }
      })
      .catch(() => setChecking(false))
  }, [router])

  const handleLogin = () => {
    const chave = searchParams.get('chave') || ''
    window.location.href = `/api/admin/auth/github?chave=${encodeURIComponent(chave)}`
  }

  const errorMessages: Record<string, string> = {
    nao_autorizado:
      'Sua conta do GitHub não tem permissão para acessar este painel.',
    oauth_falhou: 'Erro na autenticação com GitHub. Tente novamente.',
    access_denied: 'Você cancelou a autorização no GitHub.',
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
        />
      </div>
    )
  }

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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
        >
          <h1 className="font-serif text-2xl mb-2">Entrar</h1>
          <p className="text-sm text-zinc-500 mb-8">
            Use sua conta do GitHub para acessar o painel administrativo.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
            >
              {errorMessages[error] || `Erro: ${error}`}
            </motion.div>
          )}

          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="w-full py-3.5 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors flex items-center justify-center gap-3"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Entrar com GitHub
          </motion.button>

          <div className="mt-8 pt-6 border-t border-zinc-100">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 text-xs mt-0.5 flex-shrink-0">
                ?
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Apenas contas GitHub previamente autorizadas podem acessar este
                painel. O acesso é protegido por URL secreta e sessão
                criptografada.
              </p>
            </div>
          </div>
        </motion.div>

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
