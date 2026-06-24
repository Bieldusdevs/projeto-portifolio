'use client'

// ============================================
// SOBRE — Apresentação pessoal + estatísticas
// Tecnologia: GSAP ScrollTrigger + Framer Motion (stats hover)
// EDITE: textos em `bioParagraphs` e números em `stats`
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

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

  // ============================================
  // EDITE: Seus parágrafos de bio
  // ============================================
  const bioParagraphs = [
    'Com mais de 6 anos de experiência, trabalho na interseção entre design e tecnologia. Acredito que cada pixel e cada linha de código devem servir a um propósito claro e bem pensado.',
    'Minha abordagem combina sensibilidade visual com rigor técnico — busco sempre o equilíbrio entre performance, acessibilidade e beleza em cada projeto que entrego.',
    'Quando não estou codando, gosto de explorar fotografia analógica, café especial e estudar filosofia do design e sistemas complexos.',
  ]

  // ============================================
  // EDITE: Suas estatísticas (anos, projetos, clientes, etc)
  // ============================================
  const stats = [
    { value: '6+', label: 'Anos de experiência' },
    { value: '50+', label: 'Projetos entregues' },
    { value: '15+', label: 'Clientes felizes' },
  ]

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="py-32 md:py-48 container-x border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 md:gap-16">
        {/* Lado esquerdo - label e "avatar" estilizado */}
        <div className="md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-6 reveal">
            (04) — Sobre
          </div>

          {/* Avatar estilizado (placeholder geométrico) */}
          {/* Para usar foto real, troque por: <img src="/sua-foto.jpg" /> */}
          <motion.div
            className="reveal aspect-square rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.3),transparent_50%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* EDITE: Sua inicial */}
              <div className="font-serif text-[10rem] md:text-[14rem] text-white/5 leading-none">
                A
              </div>
            </div>
            {/* Borda animada */}
            <div className="absolute inset-0 rounded-2xl border border-accent/0 hover:border-accent/30 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* Lado direito - bio e stats */}
        <div className="md:col-span-8 space-y-10">
          <h2 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            {/* EDITE: Seu headline */}
            Desenvolvedor apaixonado por criar interfaces que unem{' '}
            <span className="italic text-accent">estética</span> e{' '}
            <span className="italic text-accent">funcionalidade</span>.
          </h2>

          <div className="reveal space-y-5 text-muted leading-relaxed max-w-2xl text-base md:text-lg">
            {bioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Estatísticas */}
          <div className="reveal grid grid-cols-3 gap-6 md:gap-8 pt-10 border-t border-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="cursor-default"
              >
                <div className="font-serif text-4xl md:text-5xl lg:text-6xl mb-2 text-foreground">
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
