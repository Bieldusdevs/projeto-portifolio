// ============================================
// FOOTER — Rodapé (sem LinkedIn)
// Dados: do painel admin
// ============================================
import { usePortfolioData } from '@/lib/use-portfolio-data'

export default function Footer() {
  const year = new Date().getFullYear()
  const { data } = usePortfolioData()

  return (
    <footer className="py-12 md:py-16 container-x border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-serif text-2xl">
          portfólio<span className="text-accent">.</span>
        </div>

        <div className="font-mono text-xs text-muted uppercase tracking-wider">
          © {year} — Feito com atenção aos detalhes
        </div>

        {/* Apenas GitHub e Twitter (LinkedIn removido) */}
        <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
          {data.socials.github && (
            <a
              href={data.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              data-cursor="hover"
            >
              GitHub
            </a>
          )}
          {data.socials.twitter && (
            <a
              href={data.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              data-cursor="hover"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
