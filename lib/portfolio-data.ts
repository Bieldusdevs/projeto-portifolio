// ============================================
// PORTFOLIO DATA — Tipos e dados padrão
// Edite os valores em `defaultData` para o conteúdo inicial
// ============================================

export type ColorPreset =
  | 'blue-purple'
  | 'cyan-blue'
  | 'indigo-blue'
  | 'violet-blue'

export type PreviewType = 'ecommerce' | 'dashboard' | 'mobile' | 'web3'

export type Project = {
  id: string
  title: string
  category: string
  /** Descrição técnica com stack e resultados */
  description: string
  tags: string[]
  year: string
  url: string
  color: ColorPreset
  previewType: PreviewType
}

export type Experience = {
  id: string
  role: string
  company: string
  period: string
  description: string
}

export type TechCategory = {
  id: string
  name: string
  items: string[]
}

export type Testimonial = {
  id: string
  text: string
  name: string
  role: string
}

export type Stat = {
  value: string
  label: string
}

export type Profile = {
  name: string
  badge: string
  /** Cada palavra do hero anima separadamente */
  heroTitle: string[]
  heroSubtitle: string
  bioParagraphs: string[]
  email: string
}

export type Socials = {
  github: string
  twitter: string
}

export type PortfolioData = {
  profile: Profile
  stats: Stat[]
  projects: Project[]
  experience: Experience[]
  technologies: TechCategory[]
  testimonials: Testimonial[]
  socials: Socials
}

// ============================================
// Mapa de cores dos projetos (gradientes)
// ============================================
export const colorPresets: Record<ColorPreset, string> = {
  'blue-purple': 'from-blue-500/20 to-purple-500/20',
  'cyan-blue': 'from-cyan-500/20 to-blue-500/20',
  'indigo-blue': 'from-indigo-500/20 to-blue-500/20',
  'violet-blue': 'from-violet-500/20 to-blue-500/20',
}

// ============================================
// DADOS PADRÃO — Editados pelo painel admin
// Estas são as descrições melhoradas (técnicas + resultados)
// ============================================
export const defaultData: PortfolioData = {
  profile: {
    name: 'Seu Nome',
    badge: 'Disponível para novos projetos',
    heroTitle: ['Criando', 'experiências', 'digitais', 'que', 'importam.'],
    heroSubtitle:
      'Desenvolvedor full stack especializado em criar produtos digitais de alta performance. Combinando rigor técnico com sensibilidade estética para construir interfaces que são funcionais e memoráveis.',
    bioParagraphs: [
      'Com mais de 6 anos de experiência, trabalho na interseção entre design e tecnologia. Acredito que cada pixel e cada linha de código devem servir a um propósito claro e bem pensado.',
      'Minha abordagem combina sensibilidade visual com rigor técnico — busco sempre o equilíbrio entre performance, acessibilidade e beleza em cada projeto que entrego.',
      'Quando não estou codando, gosto de explorar fotografia analógica, café especial e estudar filosofia do design e sistemas complexos.',
    ],
    email: 'contato@email.com',
  },

  stats: [
    { value: '6+', label: 'Anos de experiência' },
    { value: '50+', label: 'Projetos entregues' },
    { value: '15+', label: 'Clientes felizes' },
  ],

  projects: [
    {
      id: 'aurora',
      title: 'Aurora',
      category: 'E-commerce Headless',
      description:
        'E-commerce headless com Next.js e Three.js. Implementei visualização 3D interativa de produtos, checkout em uma etapa e React Server Components para reduzir JS no cliente. Stack: Next.js 14, Three.js, Stripe, GSAP. Resultados: +47% conversões, -62% bounce rate, LCP <0.8s.',
      tags: ['Next.js', 'Three.js', 'Stripe', 'GSAP'],
      year: '2025',
      url: '#',
      color: 'blue-purple',
      previewType: 'ecommerce',
    },
    {
      id: 'nimbus',
      title: 'Nimbus',
      category: 'SaaS Dashboard',
      description:
        'Dashboard analítico com React, D3.js e tRPC. Visualização de dados em tempo real via WebSockets, type-safety end-to-end e queries otimizadas com React Query. Suporta 10k+ usuários ativos diários com paginação cursor-based e cache invalidation.',
      tags: ['React', 'D3.js', 'tRPC', 'PostgreSQL'],
      year: '2024',
      url: '#',
      color: 'cyan-blue',
      previewType: 'dashboard',
    },
    {
      id: 'pulse',
      title: 'Pulse',
      category: 'App de Saúde Mobile',
      description:
        'App mobile-first com React Native e TensorFlow Lite. Sincronização com Apple HealthKit, modelos de ML em edge para detectar anomalias cardíacas, offline-first com SQLite. Latência <500ms em consultas, 4.8★ na App Store.',
      tags: ['React Native', 'TensorFlow', 'Firebase'],
      year: '2024',
      url: '#',
      color: 'indigo-blue',
      previewType: 'mobile',
    },
    {
      id: 'ethereal',
      title: 'Ethereal',
      category: 'Plataforma Web3',
      description:
        'Marketplace descentralizado para NFTs com galeria 3D em Three.js. Smart contracts em Solidity, integração multi-chain (Ethereum, Polygon, Arbitrum), IPFS para armazenamento descentralizado. Mint em 1-click, gas otimizado com batch transactions.',
      tags: ['Solidity', 'Web3.js', 'IPFS', 'Three.js'],
      year: '2023',
      url: '#',
      color: 'violet-blue',
      previewType: 'web3',
    },
  ],

  experience: [
    {
      id: 'exp-1',
      role: 'Senior Frontend Engineer',
      company: 'Studio Atelier',
      period: '2024 — Presente',
      description:
        'Liderança técnica em projetos de alto nível com foco em experiências 3D, animações complexas e arquitetura de componentes escaláveis em Next.js e React Three Fiber.',
    },
    {
      id: 'exp-2',
      role: 'Full Stack Developer',
      company: 'Agência Vértice',
      period: '2022 — 2024',
      description:
        'Desenvolvimento de plataformas SaaS e e-commerce para clientes internacionais. Stack: Node.js, React, PostgreSQL, GraphQL. Foco em performance e DX.',
    },
    {
      id: 'exp-3',
      role: 'Frontend Developer',
      company: 'Tech Startup XYZ',
      period: '2020 — 2022',
      description:
        'Criação de interfaces reativas, componentização de design system e implementação de micro-frontends em React com Module Federation.',
    },
    {
      id: 'exp-4',
      role: 'Junior Developer',
      company: 'Freelancer',
      period: '2019 — 2020',
      description:
        'Primeiros projetos profissionais: landing pages, WordPress customizado e introdução ao desenvolvimento moderno com React e Node.js.',
    },
  ],

  technologies: [
    {
      id: 'frontend',
      name: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    },
    {
      id: 'webgl',
      name: '3D & WebGL',
      items: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGPU', 'Blender'],
    },
    {
      id: 'animation',
      name: 'Animation',
      items: ['GSAP', 'Framer Motion', 'Lenis', 'CSS Animations'],
    },
    {
      id: 'backend',
      name: 'Backend',
      items: ['Node.js', 'PostgreSQL', 'GraphQL', 'tRPC', 'Prisma'],
    },
    {
      id: 'tools',
      name: 'Tools & Deploy',
      items: ['Vercel', 'Docker', 'AWS', 'Git', 'Figma'],
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      text: 'Um dos profissionais mais talentosos com quem já trabalhei. Entregou um projeto complexo com qualidade excepcional e atenção aos detalhes impressionante.',
      name: 'Marina Costa',
      role: 'CEO, Aurora',
    },
    {
      id: 'test-2',
      text: 'A capacidade de transformar conceitos abstratos em produtos funcionais e belos é rara. Recomendo sem hesitar para qualquer projeto de alto nível.',
      name: 'Ricardo Mendes',
      role: 'CTO, Nimbus',
    },
    {
      id: 'test-3',
      text: 'Profissionalismo, criatividade e domínio técnico em um só lugar. O resultado final sempre supera as expectativas mais otimistas dos nossos clientes.',
      name: 'Juliana Pereira',
      role: 'Design Lead, Studio Atelier',
    },
  ],

  socials: {
    github: 'https://github.com/seu-user',
    twitter: 'https://twitter.com/seu-user',
  },
}
