// ============================================
// LAYOUT PRINCIPAL — Configura fontes e envolve a app
// ============================================
import type { Metadata } from 'next'
import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import PublicShell from './components/PublicShell'

// ============================================
// FONTS — Carregadas via next/font (otimizadas)
// Para mudar fontes, edite aqui.
// ============================================
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// ============================================
// METADATA — SEO do site
// EDITE: troque title, description, og:image
// ============================================
export const metadata: Metadata = {
  title: 'Portfólio — Desenvolvedor Full Stack & Criador de Experiências',
  description:
    'Portfólio de desenvolvimento web de alto nível. Next.js, Three.js, GSAP, WebGL e experiências digitais únicas.',
  keywords: ['desenvolvedor', 'portfólio', 'next.js', 'three.js', 'webgl', 'gsap'],
  authors: [{ name: 'Seu Nome' }],
  openGraph: {
    title: 'Portfólio — Desenvolvedor Full Stack',
    description: 'Criando experiências digitais de alto nível',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  )
}
