// ============================================
// FOOTER — Rodapé simples
// EDITE: nome, copyright e links
// ============================================
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 md:py-16 container-x border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="font-serif text-2xl">
          {/* EDITE: Seu nome/marca */}
          portfolio<span className="text-accent">.</span>
        </div>

        {/* Copyright */}
        <div className="font-mono text-xs text-muted uppercase tracking-wider">
          {/* EDITE: Texto do copyright */}
          © {year} — Feito com atenção aos detalhes
        </div>

        {/* Socials */}
        <div className="flex gap-6 font-mono text-xs uppercase tracking-wider">
          <a
            href="https://github.com/seu-user"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            data-cursor="hover"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/seu-user"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            data-cursor="hover"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/seu-user"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
            data-cursor="hover"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  )
}
