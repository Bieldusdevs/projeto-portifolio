'use client'

// ============================================
// PROJETOS — Cards com previews animados
// Tecnologia: GSAP ScrollTrigger + CSS/SVG
// Dados: do painel admin (usePortfolioData)
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import { colorPresets } from '@/lib/portfolio-data'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { data } = usePortfolioData()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    gsap.fromTo(
      section.querySelector('.section-title'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    gsap.fromTo(
      section.querySelectorAll('.project-card'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.querySelector('.projects-grid'),
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, [])

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="py-32 md:py-48 container-x border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
              (01) — Projetos
            </div>
            <h2 className="section-title font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Trabalhos
              <br />
              <span className="italic text-accent">selecionados.</span>
            </h2>
          </div>
          <p className="font-mono text-sm text-muted max-w-xs">
            Uma seleção curada de projetos recentes com stack e resultados.
          </p>
        </div>

        <div className="projects-grid space-y-6">
          {data.projects.map((project) => (
            <article
              key={project.id}
              className="project-card group relative grid md:grid-cols-12 gap-6 p-6 md:p-8 border border-white/10 rounded-2xl hover:border-accent/50 transition-colors duration-500 overflow-hidden bg-white/[0.02]"
              data-cursor="hover"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${colorPresets[project.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
              />

              <div className="md:col-span-7 relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <ProjectPreview type={project.previewType} title={project.title} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-6 h-6 ml-1 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3 font-mono text-xs text-muted">
                    <span>{project.category}</span>
                    <span>—</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl mb-4 group-hover:text-accent transition-colors duration-500">
                    {project.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 border border-white/20 rounded-full font-mono text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// Previews animados — Substituíveis por vídeos reais:
// <video src="/videos/seu-video.mp4" autoPlay muted loop playsInline />
function ProjectPreview({ type, title }: { type: string; title: string }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-black/40 to-black/20 relative">
      {type === 'ecommerce' && <PreviewEcommerce />}
      {type === 'dashboard' && <PreviewDashboard />}
      {type === 'mobile' && <PreviewMobile />}
      {type === 'web3' && <PreviewWeb3 />}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-white/40 uppercase tracking-wider z-10">
        {title}
      </div>
    </div>
  )
}

function PreviewEcommerce() {
  return (
    <div className="w-full h-full p-8 relative overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-10 h-10 md:w-14 md:h-14 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10"
              style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-6 h-6 bg-white/20 rounded-full" />
        <div className="w-6 h-6 bg-accent rounded-full" />
      </div>
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-accent rounded-full text-[10px] font-mono uppercase">
        Buy Now
      </div>
    </div>
  )
}

function PreviewDashboard() {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 relative">
      <div className="grid grid-cols-3 gap-2 h-full pt-6">
        <div className="bg-white/10 rounded p-2 backdrop-blur-sm border border-white/10">
          <div className="text-[8px] text-white/40 uppercase">Revenue</div>
          <div className="text-base md:text-lg font-mono text-white">$24.5k</div>
          <div className="text-[9px] text-green-400">+12.4%</div>
        </div>
        <div className="bg-white/10 rounded p-2 backdrop-blur-sm border border-white/10">
          <div className="text-[8px] text-white/40 uppercase">Users</div>
          <div className="text-base md:text-lg font-mono text-white">8.2k</div>
          <div className="text-[9px] text-green-400">+5.1%</div>
        </div>
        <div className="bg-white/10 rounded p-2 backdrop-blur-sm border border-white/10">
          <div className="text-[8px] text-white/40 uppercase">Conv.</div>
          <div className="text-base md:text-lg font-mono text-white">3.4%</div>
          <div className="text-[9px] text-green-400">+0.8%</div>
        </div>
        <div className="col-span-3 bg-white/5 rounded p-2 backdrop-blur-sm border border-white/10 relative overflow-hidden h-20">
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
            style={{ height: '100%' }}
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,25 Q20,15 40,18 T80,5 L100,8 L100,30 L0,30 Z"
              fill="url(#grad1)"
            />
            <path
              d="M0,25 Q20,15 40,18 T80,5 L100,8"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
            />
          </svg>
        </div>
        <div className="col-span-3 bg-white/5 rounded p-2 backdrop-blur-sm border border-white/10 flex items-end gap-1 h-16">
          {[40, 60, 30, 80, 50, 90, 70, 60, 95, 45, 75, 85].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-accent/50 to-cyan-400/70 rounded-t"
              style={{
                height: `${h}%`,
                animation: 'fadeIn 0.5s ease-out',
                animationDelay: `${i * 0.05}s`,
                animationFillMode: 'both',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function PreviewMobile() {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-indigo-900/30 to-blue-900/30 relative flex items-center justify-center">
      <div className="w-24 h-44 md:w-32 md:h-56 bg-black/50 rounded-2xl border border-white/20 p-3 relative overflow-hidden shadow-2xl">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full" />
        <div className="mt-4">
          <div className="text-[8px] text-white/40 uppercase tracking-wider">
            Heart Rate
          </div>
          <div className="text-2xl md:text-3xl font-mono text-white mt-1">72</div>
          <div className="text-[8px] text-green-400 mb-3">BPM · Normal</div>
          <svg className="w-full h-12" viewBox="0 0 100 30">
            <path
              d="M0,15 L20,15 L25,5 L30,25 L35,10 L40,15 L100,15"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
            >
              <animate
                attributeName="stroke-dasharray"
                from="0,200"
                to="200,0"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
          <div className="space-y-1 mt-3">
            <div className="flex justify-between text-[8px] text-white/60">
              <span>Steps</span>
              <span className="text-white">8,432</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-accent to-cyan-400 rounded-full" />
            </div>
            <div className="flex justify-between text-[8px] text-white/60 mt-2">
              <span>Sleep</span>
              <span className="text-white">7h 32m</span>
            </div>
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gradient-to-r from-indigo-500 to-accent rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewWeb3() {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-violet-900/30 to-blue-900/30 relative overflow-hidden">
      <div className="grid grid-cols-3 gap-2 mt-6">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-lg backdrop-blur-sm border border-white/10 relative overflow-hidden"
            style={{
              background: `linear-gradient(${i * 40}deg, rgba(255,255,255,0.05), rgba(59,130,246,${
                0.15 + (i % 3) * 0.1
              }))`,
              animation: 'pulse-dot 4s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/30">
              #{i + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full font-mono text-[10px] text-white/80">
        0.5 ETH
      </div>
      <div className="absolute top-3 right-3 px-2 py-1 bg-accent/30 backdrop-blur-sm rounded-full font-mono text-[10px] text-white">
        Connected
      </div>
    </div>
  )
}
