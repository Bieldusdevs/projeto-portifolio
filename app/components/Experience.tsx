'use client'

// ============================================
// EXPERIÊNCIA — Timeline profissional
// Tecnologia: GSAP ScrollTrigger (linha animada + itens)
// EDITE: array `experiences` com suas posições
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// EDITE: Sua trajetória profissional
// ============================================
const experiences = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Studio Atelier',
    period: '2024 — Presente',
    description:
      'Liderança técnica em projetos de alto nível com foco em experiências 3D, animações complexas e arquitetura de componentes escaláveis.',
  },
  {
    role: 'Full Stack Developer',
    company: 'Agência Vértice',
    period: '2022 — 2024',
    description:
      'Desenvolvimento de plataformas SaaS e e-commerce para clientes internacionais, com ênfase em performance e experiência do usuário.',
  },
  {
    role: 'Frontend Developer',
    company: 'Tech Startup XYZ',
    period: '2020 — 2022',
    description:
      'Criação de interfaces reativas, componentização de design system e implementação de micro-frontends em React.',
  },
  {
    role: 'Junior Developer',
    company: 'Freelancer',
    period: '2019 — 2020',
    description:
      'Primeiros projetos profissionais, com foco em landing pages, WordPress customizado e introdução ao desenvolvimento moderno.',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Linha do timeline se desenha conforme scroll
    gsap.fromTo(
      section.querySelector('.timeline-line'),
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.timeline'),
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 1,
        },
      }
    )

    gsap.fromTo(
      section.querySelectorAll('.exp-item'),
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.timeline'),
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="experiencia"
      ref={sectionRef}
      className="py-32 md:py-48 container-x border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
            (03) — Experiência
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Trajetória
            <br />
            <span className="italic text-accent">profissional.</span>
          </h2>
        </div>

        <div className="timeline relative pl-8 md:pl-[200px]">
          {/* Linha do timeline */}
          <div className="timeline-line absolute left-0 md:left-[200px] top-2 bottom-0 w-px bg-gradient-to-b from-accent via-white/20 to-transparent origin-top" />

          <div className="space-y-16">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="exp-item relative grid md:grid-cols-[1fr_2fr] gap-6 group"
                data-cursor="hover"
              >
                {/* Período (visível em desktop) */}
                <div className="hidden md:block font-mono text-sm text-muted pt-1">
                  {exp.period}
                </div>

                {/* Bolinha do timeline */}
                <div className="absolute left-[-5px] md:left-[195px] top-2 w-2.5 h-2.5 bg-accent rounded-full group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300" />

                <div>
                  {/* Período (mobile) */}
                  <div className="md:hidden font-mono text-xs text-muted mb-2 uppercase tracking-wider">
                    {exp.period}
                  </div>

                  {/* EDITE: cargo e empresa */}
                  <h3 className="font-serif text-3xl md:text-4xl mb-2 group-hover:text-accent transition-colors duration-300">
                    {exp.role}
                  </h3>
                  <div className="font-mono text-sm text-muted mb-4">
                    @ {exp.company}
                  </div>
                  <p className="text-muted leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
