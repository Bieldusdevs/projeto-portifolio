'use client'

// ============================================
// DEPOIMENTOS — Cards com citações de clientes
// Tecnologia: GSAP ScrollTrigger + Framer Motion (hover)
// EDITE: array `testimonials` com seus depoimentos reais
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// EDITE: Depoimentos de clientes/colegas
// ============================================
const testimonials = [
  {
    text: 'Um dos profissionais mais talentosos com quem já trabalhei. Entregou um projeto complexo com qualidade excepcional e atenção aos detalhes impressionante.',
    name: 'Marina Costa',
    role: 'CEO, Aurora',
  },
  {
    text: 'A capacidade de transformar conceitos abstratos em produtos funcionais e belos é rara. Recomendo sem hesitar para qualquer projeto de alto nível.',
    name: 'Ricardo Mendes',
    role: 'CTO, Nimbus',
  },
  {
    text: 'Profissionalismo, criatividade e domínio técnico em um só lugar. O resultado final sempre supera as expectativas mais otimistas dos nossos clientes.',
    name: 'Juliana Pereira',
    role: 'Design Lead, Studio Atelier',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelectorAll('.testimonial'),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      className="py-32 md:py-48 container-x border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
            (05) — Depoimentos
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            O que dizem
            <br />
            <span className="italic text-accent">sobre o trabalho.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:border-accent/50 transition-colors duration-500"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              data-cursor="hover"
            >
              {/* Aspas decorativas */}
              <div className="font-serif text-6xl text-accent mb-4 leading-none">
                &ldquo;
              </div>
              <p className="text-muted leading-relaxed mb-8 min-h-[160px] md:min-h-[180px]">
                {/* EDITE: Texto do depoimento */}
                {t.text}
              </p>
              <div className="pt-4 border-t border-white/10">
                {/* EDITE: Nome e cargo */}
                <div className="font-serif text-lg">{t.name}</div>
                <div className="font-mono text-xs text-muted uppercase tracking-wider mt-1">
                  {t.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
