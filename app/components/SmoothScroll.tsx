'use client'

// ============================================
// SMOOTH SCROLL — Integração Lenis + GSAP
// Tecnologia: Lenis (smooth scroll) + GSAP ScrollTrigger
// EDITE: ajuste duration e easing em `new Lenis({...})`
// ============================================
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inicializa Lenis com curva de easing custom
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sincroniza ScrollTrigger do GSAP com Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Usa o ticker do GSAP como RAF loop
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
