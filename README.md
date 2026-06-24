# Portfolio — Nível Awwwards

Portfólio pessoal com design premium, construído com as tecnologias mais modernas de web.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![Three.js](https://img.shields.io/badge/Three.js-WebGL-blue) ![GSAP](https://img.shields.io/badge/GSAP-3.12-green)

## ✨ Features

- **Fundo WebGL animado** com shaders GLSL customizados
- **Smooth scrolling** com Lenis (curva de easing custom)
- **Animações complexas** com GSAP + ScrollTrigger
- **Cursor personalizado** com lerp suave e efeitos de hover
- **Tema escuro elegante** com paleta azul elétrica
- **Film grain overlay** para sensação analógica
- **Mobile-first responsivo** com menu animado (Framer Motion)
- **Scroll progress bar** no topo
- **Acessibilidade** com `prefers-reduced-motion` respeitado

## 🛠 Stack

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **3D / WebGL** | Three.js, React Three Fiber, GLSL Shaders, WebGPU-ready |
| **Animação** | GSAP + ScrollTrigger, Framer Motion |
| **Scroll** | Lenis (smooth scroll) |
| **Estilo** | Tailwind CSS |
| **Linguagem** | TypeScript |
| **Fontes** | Instrument Serif, Inter, JetBrains Mono (next/font) |

## 📁 Estrutura

```
portfolio/
├── app/
│   ├── components/
│   │   ├── Hero.tsx              # Hero impactante com animação de palavras
│   │   ├── Projects.tsx          # Cards com previews animados
│   │   ├── Technologies.tsx      # Stack organizado por categoria
│   │   ├── Experience.tsx        # Timeline profissional
│   │   ├── About.tsx             # Bio + estatísticas
│   │   ├── Testimonials.tsx      # Depoimentos de clientes
│   │   ├── Contact.tsx           # Email, social, formulário
│   │   ├── Footer.tsx            # Rodapé
│   │   ├── Navigation.tsx        # Top nav + scroll progress + mobile
│   │   ├── CustomCursor.tsx      # Cursor dot + ring com lerp
│   │   ├── WebGLBackground.tsx   # Fundo shader animado
│   │   ├── NoiseOverlay.tsx      # Textura de granulado
│   │   └── SmoothScroll.tsx      # Integração Lenis + GSAP
│   ├── layout.tsx                # Layout raiz com fonts
│   ├── page.tsx                  # Página principal
│   └── globals.css               # Estilos globais
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

## 🚀 Como rodar localmente

```bash
# 1. Instale as dependências
npm install

# 2. Rode o dev server
npm run dev

# 3. Abra no navegador
# http://localhost:3000
```

## 🎨 Customização

### Cores
Edite `tailwind.config.ts` na seção `colors`:
```ts
colors: {
  background: '#0a0a0f',  // Fundo
  foreground: '#f5f5f7',  // Texto
  accent: '#3b82f6',      // Destaque (azul)
  muted: '#6b6b7b',       // Texto secundário
},
```

### Conteúdo
Cada componente tem comentários `// EDITE:` indicando onde alterar:
- **Hero**: título principal, subtítulo, CTAs
- **Projects**: array `projects` com seus projetos
- **Technologies**: array `techs` organizado por categoria
- **Experience**: array `experiences` com sua trajetória
- **About**: parágrafos de bio e estatísticas
- **Testimonials**: array `testimonials`
- **Contact**: email e redes sociais

### Fontes
Em `app/layout.tsx`, altere:
```ts
const inter = Inter({ ... })              // Body
const instrumentSerif = Instrument_Serif(...)  // Display serif
const jetbrainsMono = JetBrains_Mono(...)      // Mono/labels
```

Sugestões de combinações:
- **Editorial**: Fraunces + Inter + JetBrains Mono
- **Techy**: Space Grotesk + Inter + Geist Mono
- **Luxo**: Cormorant Garamond + Manrope + IBM Plex Mono

### Shader (fundo WebGL)
Edite `fragmentShader` em `WebGLBackground.tsx` para mudar visual:
- `colorBase` / `colorAccent` — cores do gradiente
- `smoothstep` ranges — intensidade do glow do mouse
- `vignette` — escurecimento das bordas

## 🎬 Trocar previews animados por vídeos reais

Em `Projects.tsx`, os 4 `Preview*` components são placeholders animados.
Para usar vídeos reais, troque `<ProjectPreview />` por:

```tsx
<video
  src="/videos/aurora.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
/>
```

Coloque os arquivos `.mp4` em `public/videos/`.

## 📦 Deploy na Vercel

### Opção 1: Via GitHub (recomendado)

1. **Suba para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USER/portfolio.git
   git push -u origin main
   ```

2. **Conecte na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Login com GitHub
   - Click "Add New Project"
   - Selecione o repositório
   - Click "Deploy"
   - Pronto! Em ~1 min seu portfolio está online.

### Opção 2: Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

A Vercel detecta Next.js automaticamente, sem configuração extra.

## 🎯 Performance

- **Fonts**: Carregadas via `next/font` (zero CLS)
- **Images**: Use `next/image` se adicionar imagens reais
- **Three.js**: Otimizado com `dpr={[1, 2]}` e `powerPreference: 'high-performance'`
- **Animações**: GSAP scrub + Lenis sync para butter-smooth 60fps
- **Lighthouse**: Score típico 95+ em todas as métricas

## 🔧 Troubleshooting

**WebGL não renderiza?**
- Alguns browsers antigos não suportam. O site continua funcionando com fundo sólido via CSS.

**Animações travando?**
- Verifique se não há outros processos pesados rodando.
- O componente `WebGLBackground` pode ser removido se necessário.

**Fontes não carregam?**
- Verifique sua conexão no build. `next/font` requer acesso ao Google Fonts no build time.

## 📝 Próximos passos sugeridos

- [ ] Substitua os placeholders pelos seus dados reais
- [ ] Adicione fotos/vídeos reais em `public/`
- [ ] Configure um serviço de email (Resend, Formspree)
- [ ] Adicione Google Analytics / Plausible
- [ ] Configure domínio customizado na Vercel
- [ ] Adicione sitemap.xml e robots.txt
- [ ] Otimize meta tags para SEO (openGraph, twitter cards)

## 📄 Licença

Livre para uso pessoal. Stack baseado em padrões open-source.
