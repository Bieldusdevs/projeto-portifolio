'use client'

// ============================================
// HERO — Seção de impacto principal
// Tecnologia: GSAP Timeline (entrada) + ScrollTrigger (parallax)
// Dados: do painel admin (usePortfolioData)
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolioData } from '@/lib/use-portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const { data } = usePortfolioData()

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const cta = ctaRef.current
    const marquee = marqueeRef.current
    const badge = badgeRef.current
    if (!section || !title || !subtitle || !cta || !marquee || !badge) return

    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(
      badge,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )

    const words = title.querySelectorAll('.word')
    tl.fromTo(
      words,
      { y: 120, opacity: 0, rotate: 3 },
      {
        y: 0,
        opacity: 1,
        rotate: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: 'power4.out',
      },
      '-=0.4'
    )

    tl.fromTo(
      subtitle,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )

    tl.fromTo(
      cta.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=0.7'
    )

    gsap.to(title, {
      y: -150,
      opacity: 0.2,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })

    gsap.to(marquee.querySelector('.marquee-track'), {
      x: '-50%',
      duration: 25,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  const titleWords = data.profile.heroTitle

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative container-x pt-32 pb-24"
    >
      <div className="max-w-7xl">
        <div
          ref={badgeRef}
          className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-8 flex items-center gap-3"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
          {data.profile.badge}
        </div>

        <h1
          ref={titleRef}
          className="font-serif text-[clamp(3rem,11vw,11rem)] leading-[0.9] tracking-tight mb-12"
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.15em]"
              style={{ overflow: 'hidden' }}
            >
              {word}
            </span>
          ))}
        </h1>

        <div className="grid md:grid-cols-12 gap-8 mt-12">
          <p
            ref={subtitleRef}
            className="md:col-span-7 text-lg md:text-xl text-muted leading-relaxed max-w-2xl"
          >
            {data.profile.heroSubtitle}
          </p>

          <div
            ref={ctaRef}
            className="md:col-span-5 flex flex-col gap-3 md:items-end"
          >
            <a
              href="#projetos"
              className="group flex items-center justify-between gap-3 px-6 py-4 border border-white/20 rounded-full hover:border-accent transition-colors w-full md:w-auto"
              data-cursor="hover"
            >
              <span className="font-mono text-sm uppercase tracking-wider">
                Ver Projetos
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contato"
              className="group flex items-center justify-between gap-3 px-6 py-4 bg-foreground text-background rounded-full hover:bg-accent transition-colors w-full md:w-auto"
              data-cursor="hover"
            >
              <span className="font-mono text-sm uppercase tracking-wider">
                Entrar em Contato
              </span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div
        ref={marqueeRef}
        className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/10 py-5"
      >
        <div className="marquee-track flex gap-12 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 shrink-0">
              <span>Next.js</span>
              <span className="text-accent">·</span>
              <span>React Three Fiber</span>
              <span className="text-accent">·</span>
              <span>Three.js</span>
              <span className="text-accent">·</span>
              <span>GSAP</span>
              <span className="text-accent">·</span>
              <span>Lenis</span>
              <span className="text-accent">·</span>
              <span>GLSL Shaders</span>
              <span className="text-accent">·</span>
              <span>Framer Motion</span>
              <span className="text-accent">·</span>
              <span>WebGPU</span>
              <span className="text-accent">·</span>
              <span>TypeScript</span>
              <span className="text-accent">·</span>
              <span>Tailwind</span>
              <span className="text-accent">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
