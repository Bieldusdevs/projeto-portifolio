'use client'

// ============================================
// PUBLIC SHELL — Wrapper condicional
// Renderiza os efeitos do site público SOMENTE fora do /painel
// No painel admin: renderiza apenas children (visual limpo)
// ============================================
import { usePathname } from 'next/navigation'
import WebGLBackground from './WebGLBackground'
import NoiseOverlay from './NoiseOverlay'
import CustomCursor from './CustomCursor'
import Navigation from './Navigation'
import SmoothScroll from './SmoothScroll'

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/painel') ?? false

  // Painel admin: visual limpo, sem efeitos
  if (isAdmin) {
    return <>{children}</>
  }

  // Site público: com todos os efeitos
  return (
    <>
      <WebGLBackground />
      <NoiseOverlay />
      <CustomCursor />
      <Navigation />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  )
}
