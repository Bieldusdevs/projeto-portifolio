'use client'

// ============================================
// TECNOLOGIAS — Stack organizado por categoria
// Tecnologia: GSAP ScrollTrigger (entrada em stagger)
// EDITE: array `techs` com suas tecnologias
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// EDITE: Adicione/remova categorias e tecnologias
// ============================================
const techs: Record<string, string[]> = {
  'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  '3D & WebGL': ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGPU', 'Blender'],
  'Animation': ['GSAP', 'Framer Motion', 'Lenis', 'CSS Animations'],
  'Backend': ['Node.js', 'PostgreSQL', 'GraphQL', 'tRPC', 'Prisma'],
  'Tools & Deploy': ['Vercel', 'Docker', 'AWS', 'Git', 'Figma'],
}

export default function Technologies() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelectorAll('.tech-category'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      section.querySelectorAll('.tech-item'),
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="tecnologias"
      ref={sectionRef}
      className="py-32 md:py-48 container-x border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 md:mb-32">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
            (02) — Tecnologias
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            Stack &<br />
            <span className="italic text-accent">ferramentas.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {Object.entries(techs).map(([category, items], i) => (
            <div key={i} className="tech-category">
              <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-white/20">
                <h3 className="font-serif text-2xl md:text-3xl">
                  {/* EDITE: Nome da categoria */}
                  {category}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <ul className="space-y-1">
                {items.map((item, j) => (
                  <li
                    key={j}
                    className="tech-item flex items-center justify-between py-3 px-3 -mx-3 hover:bg-white/5 rounded transition-all duration-300 group cursor-default"
                    data-cursor="hover"
                  >
                    <span className="font-mono text-sm">{item}</span>
                    <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-accent text-xs">
                      ↗
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
