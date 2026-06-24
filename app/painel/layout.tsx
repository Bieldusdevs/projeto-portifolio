// ============================================
// PAINEL LAYOUT — Wrapper do admin (preto/branco)
// Adiciona classe admin-mode ao body
// ============================================
'use client'

import { useEffect } from 'react'

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('admin-mode')
    return () => {
      document.body.classList.remove('admin-mode')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a] font-sans antialiased">
      {children}
    </div>
  )
}
