'use client'

// ============================================
// PROJETOS — Cards com previews animados (substituindo screenshots)
// Tecnologia: GSAP ScrollTrigger + animações CSS/SVG
// EDITE: array `projects` com seus projetos reais
// Para trocar previews animados por VÍDEOS REAIS:
//   substitua <ProjectPreview /> por <video src="..." autoPlay muted loop />
// ============================================
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ============================================
// EDITE: Seus projetos aqui
// Cada projeto tem um preview animado correspondente
// ============================================
const projects = [
  {
    title: 'Aurora',
    category: 'Plataforma E-commerce',
    description:
      'Plataforma de e-commerce com experiências 3D imersivas, animações fluidas e checkout otimizado que aumentou conversões em 47%.',
    tags: ['Next.js', 'Three.js', 'Stripe', 'GSAP'],
    year: '2025',
    color: 'from-blue-500/20 to-purple-500/20',
    url: '#',
  },
  {
    title: 'Nimbus',
    category: 'SaaS Dashboard',
    description:
      'Dashboard analítico com visualização de dados em tempo real, gráficos interativos e relatórios automatizados para mais de 10k usuários.',
    tags: ['React', 'D3.js', 'PostgreSQL', 'tRPC'],
    year: '2024',
    color: 'from-cyan-500/20 to-blue-500/20',
    url: '#',
  },
  {
    title: 'Pulse',
    category: 'App de Saúde',
    description:
      'Aplicativo mobile-first para monitoramento de saúde com IA, integração com wearables e sincronização em tempo real.',
    tags: ['React Native', 'TensorFlow', 'Firebase'],
    year: '2024',
    color: 'from-indigo-500/20 to-blue-500/20',
    url: '#',
  },
  {
    title: 'Ethereal',
    category: 'Web3 Platform',
    description:
      'Plataforma descentralizada para NFTs com galeria imersiva em 3D, minting simplificado e integração multi-chain.',
    tags: ['Solidity', 'Web3.js', 'IPFS', 'Three.js'],
    year: '2023',
    color: 'from-violet-500/20 to-blue-500/20',
    url: '#',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Animação do título da seção
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

    // Cards em stagger
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
        {/* Header da seção */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 md:mb-32 gap-8">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
              {/* EDITE: Numeração das seções */}
              (01) — Projetos
            </div>
            <h2 className="section-title font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              {/* EDITE: Título da seção */}
              Trabalhos
              <br />
              <span className="italic text-accent">selecionados.</span>
            </h2>
          </div>
          <p className="font-mono text-sm text-muted max-w-xs">
            {/* EDITE: Texto auxiliar */}
            Uma seleção curada de projetos recentes que representam minha abordagem técnica e estética.
          </p>
        </div>

        {/* Grid de projetos */}
        <div className="projects-grid space-y-6">
          {projects.map((project, i) => (
            <article
              key={i}
              className="project-card group relative grid md:grid-cols-12 gap-6 p-6 md:p-8 border border-white/10 rounded-2xl hover:border-accent/50 transition-colors duration-500 overflow-hidden bg-white/[0.02]"
              data-cursor="hover"
            >
              {/* Gradiente de hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
              />

              {/* Preview do projeto (animado, substitua por vídeo real se quiser) */}
              <div className="md:col-span-7 relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <ProjectPreview index={i} title={project.title} />
                {/* "Play button" para indicar que é um vídeo */}
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

              {/* Conteúdo */}
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

// ============================================
// PREVIEWS ANIMADOS — Substituam por vídeos reais!
// Para usar vídeo: troque <ProjectPreview /> por:
//   <video src="/videos/aurora.mp4" autoPlay muted loop playsInline />
// ============================================
function ProjectPreview({ index, title }: { index: number; title: string }) {
  const previews = [
    <PreviewEcommerce key="0" />,
    <PreviewDashboard key="1" />,
    <PreviewMobile key="2" />,
    <PreviewWeb3 key="3" />,
  ]
  return (
    <div className="w-full h-full bg-gradient-to-br from-black/40 to-black/20 relative">
      {previews[index]}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-white/40 uppercase tracking-wider">
        {title}
      </div>
    </div>
  )
}

// Preview 1: E-commerce com cards flutuantes
function PreviewEcommerce() {
  return (
    <div className="w-full h-full p-8 relative overflow-hidden bg-gradient-to-br from-blue-900/30 to-purple-900/30">
      {/* Cards de produto flutuantes */}
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
      {/* Barra de navegação fake */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="w-6 h-6 bg-white/20 rounded-full" />
        <div className="w-6 h-6 bg-accent rounded-full" />
      </div>
      {/* Botão CTA */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-accent rounded-full text-[10px] font-mono uppercase">
        Buy Now
      </div>
    </div>
  )
}

// Preview 2: Dashboard com gráficos animados
function PreviewDashboard() {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 relative">
      <div className="grid grid-cols-3 gap-2 h-full pt-6">
        {/* KPI Cards */}
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
        {/* Gráfico de linha */}
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
        {/* Bar chart */}
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

// Preview 3: Mobile app (mockup de celular)
function PreviewMobile() {
  return (
    <div className="w-full h-full p-4 bg-gradient-to-br from-indigo-900/30 to-blue-900/30 relative flex items-center justify-center">
      <div className="w-24 h-44 md:w-32 md:h-56 bg-black/50 rounded-2xl border border-white/20 p-3 relative overflow-hidden shadow-2xl">
        {/* Notch */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full" />
        {/* Conteúdo do app */}
        <div className="mt-4">
          <div className="text-[8px] text-white/40 uppercase tracking-wider">
            Heart Rate
          </div>
          <div className="text-2xl md:text-3xl font-mono text-white mt-1">72</div>
          <div className="text-[8px] text-green-400 mb-3">BPM · Normal</div>
          {/* ECG line */}
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
          {/* Stats */}
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

// Preview 4: Web3 NFT gallery
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
