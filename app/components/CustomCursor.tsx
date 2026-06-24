'use client'

// ============================================
// CURSOR CUSTOMIZADO — Dot + Ring com lerp suave
// Tecnologia: GSAP para animação suave
// EDITE: cores, tamanhos e velocidade em cursor/follower
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Verifica se é dispositivo com mouse (desktop)
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    window.addEventListener('mousemove', onMove)

    // RAF loop manual para performance
    let rafId: number
    const tick = () => {
      // Lerp factor: quanto menor, mais suave/lento
      pos.x += (mouse.x - pos.x) * 0.15
      pos.y += (mouse.y - pos.y) * 0.15

      gsap.set(cursor, { x: mouse.x, y: mouse.y })
      gsap.set(follower, { x: pos.x, y: pos.y })

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    // Efeito hover em elementos interativos
    const onEnter = () => {
      gsap.to(cursor, { scale: 0, duration: 0.3 })
      gsap.to(follower, { scale: 2, duration: 0.3, backgroundColor: 'rgba(59, 130, 246, 0.1)' })
    }
    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, duration: 0.3, backgroundColor: 'transparent' })
    }

    // Aplica em todos os elementos clicáveis
    const interactiveSelector = 'a, button, [data-cursor="hover"], input, textarea'
    const applyListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    applyListeners()

    // Re-aplica quando o DOM muda
    const observer = new MutationObserver(applyListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Dot: segue o mouse 1:1 */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      />
      {/* Ring: segue com delay suave */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
