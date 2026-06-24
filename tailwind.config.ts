import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ============================================
      // CORES — Edite aqui para mudar a paleta
      // ============================================
      colors: {
        background: '#0a0a0f',   // Fundo principal (preto profundo)
        foreground: '#f5f5f7',   // Texto principal (off-white)
        accent: '#3b82f6',       // Cor de destaque (azul elétrico)
        muted: '#6b6b7b',        // Texto secundário (cinza)
      },
      // Fontes usando CSS variables do next/font
      fontFamily: {
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
