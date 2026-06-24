'use client'

// ============================================
// NAVEGAÇÃO — Topo fixo com scroll progress + mobile menu
// Tecnologia: GSAP ScrollTrigger + Framer Motion (mobile menu)
// EDITE: links do menu em `navLinks`
// ============================================
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// EDITE: Links do menu - href deve bater com ids das seções
// ============================================
const navLinks = [
  { href: '#projetos', label: 'Projetos', num: '01' },
  { href: '#tecnologias', label: 'Tecnologias', num: '02' },
  { href: '#experiencia', label: 'Experiência', num: '03' },
  { href: '#sobre', label: 'Sobre', num: '04' },
  { href: '#depoimentos', label: 'Depoimentos', num: '05' },
  { href: '#contato', label: 'Contato', num: '06' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const progress = progressRef.current
    if (!nav || !progress) return

    // Animação de entrada do nav
    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.8, ease: 'power3.out' }
    )

    // Barra de progresso do scroll
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.3,
      },
      transformOrigin: 'left center',
    })
  }, [])

  return (
    <>
      {/* Barra de progresso de scroll (topo) */}
      <div
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left scale-x-0"
        style={{ willChange: 'transform' }}
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-6">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl md:text-3xl text-white"
            data-cursor="hover"
          >
            portfólio<span className="text-accent">.</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-[0.2em] text-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative hover:text-accent transition-colors duration-300 group"
                data-cursor="hover"
              >
                <span className="opacity-50 mr-1">{link.num}</span>
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 text-white"
            aria-label="Menu"
            data-cursor="hover"
          >
            <span
              className={`w-6 h-px bg-white transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`w-6 h-px bg-white transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[3px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl hover:text-accent transition-colors"
                  data-cursor="hover"
                >
                  <span className="font-mono text-xs text-muted mr-2">
                    {link.num}
                  </span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
