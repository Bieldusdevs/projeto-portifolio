'use client'

// ============================================
// EXPERIÊNCIA — Timeline profissional
// Tecnologia: GSAP ScrollTrigger (linha animada + itens)
// Dados: do painel admin
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolioData } from '@/lib/use-portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const { data } = usePortfolioData()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

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
          <div className="timeline-line absolute left-0 md:left-[200px] top-2 bottom-0 w-px bg-gradient-to-b from-accent via-white/20 to-transparent origin-top" />

          <div className="space-y-16">
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="exp-item relative grid md:grid-cols-[1fr_2fr] gap-6 group"
                data-cursor="hover"
              >
                <div className="hidden md:block font-mono text-sm text-muted pt-1">
                  {exp.period}
                </div>

                <div className="absolute left-[-5px] md:left-[195px] top-2 w-2.5 h-2.5 bg-accent rounded-full group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300" />

                <div>
                  <div className="md:hidden font-mono text-xs text-muted mb-2 uppercase tracking-wider">
                    {exp.period}
                  </div>
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
