'use client'

// ============================================
// CONTATO — Email, social, formulário
// Tecnologia: GSAP ScrollTrigger + Framer Motion
// Dados: do painel admin (sem LinkedIn)
// ============================================
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolioData } from '@/lib/use-portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ email: '', message: '' })
  const [sent, setSent] = useState(false)
  const { data } = usePortfolioData()

  // Apenas GitHub e Twitter (LinkedIn removido)
  const socials = [
    { name: 'GitHub', url: data.socials.github },
    { name: 'Twitter', url: data.socials.twitter },
  ].filter((s) => s.url)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelectorAll('.reveal'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFormData({ email: '', message: '' })
    }, 3000)
  }

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="py-32 md:py-48 container-x border-t border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-6">
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-6 reveal">
              (06) — Contato
            </div>
            <h2 className="reveal font-serif text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tight mb-10">
              Vamos criar
              <br />
              algo
              <br />
              <span className="italic text-accent">extraordinário?</span>
            </h2>

            <div className="reveal space-y-8 mt-12">
              <a
                href={`mailto:${data.profile.email}`}
                className="group flex items-center gap-3 text-2xl md:text-3xl hover:text-accent transition-colors"
                data-cursor="hover"
              >
                <span className="font-serif">{data.profile.email}</span>
                <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  ↗
                </span>
              </a>

              <div className="flex flex-wrap gap-3 pt-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-white/20 rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 font-mono text-xs uppercase tracking-wider"
                    data-cursor="hover"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-6 reveal">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted mb-3">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-transparent border-b-2 border-white/20 py-3 focus:border-accent outline-none transition-colors text-lg placeholder:text-muted/40"
                  placeholder="seu@email.com"
                  data-cursor="hover"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-muted mb-3">
                  Mensagem
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b-2 border-white/20 py-3 focus:border-accent outline-none transition-colors text-lg resize-none placeholder:text-muted/40"
                  placeholder="Conte sobre seu projeto..."
                  data-cursor="hover"
                />
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="px-6 py-4 border border-accent rounded-full text-accent font-mono text-sm inline-flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
                    Mensagem enviada! Retorno em breve.
                  </motion.div>
                ) : (
                  <motion.button
                    key="send"
                    type="submit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full hover:bg-accent hover:text-white transition-colors font-mono text-sm uppercase tracking-wider"
                    data-cursor="hover"
                  >
                    Enviar mensagem
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
