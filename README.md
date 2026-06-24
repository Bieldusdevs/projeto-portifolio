# Portfólio — Nível Awwwards

Portfólio pessoal com **painel administrativo (login por senha)** e design premium.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![Three.js](https://img.shields.io/badge/Three.js-WebGL-blue) ![GSAP](https://img.shields.io/badge/GSAP-3.12-green)

## ✨ Features

**Site público:**
- Fundo WebGL animado (shader GLSL custom)
- Smooth scrolling com Lenis
- Animações GSAP + ScrollTrigger
- Cursor personalizado
- Tema escuro elegante com noise overlay
- 7 seções: Hero, Projetos, Tecnologias, Experiência, Sobre, Depoimentos, Contato

**Painel administrativo:**
- 🔐 Login por senha (SHA-256 + cookie httpOnly)
- 🛡️ URL secreta via middleware (esconde /painel)
- ⏱️ Delay anti brute-force
- ✏️ Edição completa: perfil, projetos, experiência, tecnologias, depoimentos, redes sociais
- 🎨 Visual preto/branco com Framer Motion (fades suaves)
- 💾 Dados salvos no navegador (localStorage)
- 🚀 **Funciona IMEDIATAMENTE sem configurar nada** (tem defaults)

## 🚀 Quick Start (30 segundos)

```bash
npm install
npm run dev
```

Acesse:

```
http://localhost:3000/painel?chave=painel-admin
```

Senha: **`admin123`**

✅ Pronto! O painel funciona sem `.env` configurado.

---

## 🔐 Configuração para produção

Antes de colocar online, configure suas próprias credenciais:

### 1. Gere sua senha (em hash)

```bash
# Troque "minha-senha-segura" pela senha que você quer
node -e "console.log(require('crypto').createHash('sha256').update('minha-senha-segura').digest('hex'))"
```

Vai retornar algo como:
```
a1b2c3d4e5f6... (64 caracteres)
```

### 2. Gere sua chave de URL

```bash
node -e "console.log(Math.random().toString(36).slice(2))"
```

Retorna algo como:
```
x7y9z2k9
```

### 3. Crie `.env.local`

```bash
cp .env.example .env.local
```

Edite e cole seus valores:

```env
ADMIN_PASSWORD_HASH=a1b2c3d4e5f6...
ADMIN_PATH_SECRET=x7y9z2k9
```

### 4. Na Vercel

**Settings → Environment Variables**, adicione:
- `ADMIN_PASSWORD_HASH` = seu hash
- `ADMIN_PATH_SECRET` = sua chave

Faça **Redeploy**.

### 5. Acesse com seus dados

```
https://seu-site.vercel.app/painel?chave=x7y9z2k9
```

Senha: a que você escolheu.

---

## 🛠 Stack

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **3D / WebGL** | Three.js, React Three Fiber, GLSL Shaders |
| **Animação** | GSAP + ScrollTrigger, Framer Motion |
| **Auth** | Senha SHA-256 + cookie httpOnly |
| **Scroll** | Lenis |
| **Estilo** | Tailwind CSS + TypeScript |

## 📁 Estrutura

```
portfolio/
├── app/
│   ├── api/admin/             ← API do painel (login/logout/config)
│   ├── components/            ← Site público
│   ├── painel/                ← Painel admin (8 páginas)
│   │   ├── _components/       ← Sidebar, Shell, Forms
│   │   ├── login/             ← Login
│   │   ├── perfil/            ← Editor de perfil
│   │   ├── projetos/          ← Editor de projetos (CRUD)
│   │   ├── experiencia/       ← Editor de experiência
│   │   ├── tecnologias/       ← Editor de stack
│   │   ├── depoimentos/       ← Editor de depoimentos
│   │   ├── configuracoes/     ← GitHub + Twitter
│   │   └── page.tsx           ← Dashboard
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── lib/                       ← Helpers
│   ├── portfolio-data.ts      ← Tipos + dados padrão
│   ├── use-portfolio-data.ts  ← Hook client-side
│   └── admin-auth.ts          ← Auth helpers
├── middleware.ts              ← Proteção de rotas
└── .env.example
```

## 🎨 Customização

### Editar dados pelo painel
Acesse `/painel` (com a chave), edite tudo visualmente. Salva no navegador e aparece no site.

### Editar dados padrão no código
Edite `lib/portfolio-data.ts` — são as descrições técnicas com resultados.

### Cores
`tailwind.config.ts`:
```ts
colors: {
  background: '#0a0a0f',
  foreground: '#f5f5f7',
  accent: '#3b82f6',
  muted: '#6b6b7b',
}
```

### Fontes
`app/layout.tsx` — `Inter`, `Instrument_Serif`, `JetBrains_Mono`.

### Shader WebGL
`app/components/WebGLBackground.tsx` — edite `fragmentShader`.

---

## 🔒 Segurança do painel

| Camada | Implementação |
|--------|---------------|
| **URL oculta** | `/painel?chave=SEGREDO` — middleware retorna 404 sem chave |
| **Senha SHA-256** | Hash em env var (nunca plaintext) |
| **Cookie httpOnly** | JS do browser não consegue ler |
| **SameSite strict** | Proteção CSRF |
| **Secure flag** | HTTPS-only em produção |
| **Delay fixo 500ms** | Dificulta brute-force |

**Para produção, lembre-se:**
1. ✅ Defina `ADMIN_PASSWORD_HASH` (não use `admin123`)
2. ✅ Defina `ADMIN_PATH_SECRET` (não use `painel-admin`)
3. ✅ Use HTTPS (Vercel faz automaticamente)
4. ✅ Senha forte (12+ caracteres)

---

## 🌐 Deploy na Vercel

```bash
# 1. Subir pro GitHub
git init
git add .
git commit -m "feat: portfólio"
git push

# 2. Vercel → Add New Project → selecione repo
# 3. Configure env vars em Settings (opcional - tem defaults)
# 4. Deploy
```

Site público: `https://seu-site.vercel.app/`
Painel: `https://seu-site.vercel.app/painel?chave=painel-admin` (ou sua chave custom)

---

## 📝 Como escrever descrições melhores

**❌ Vago:**
> "Projeto de loja de carros"

**✅ Técnico + resultados:**
> "E-commerce de veículos com Next.js e Algolia. Implementei busca facetada, lazy loading de imagens e filtros em URL. Stack: Next.js, Algolia, Stripe, Vercel. Resultados: +38% conversão de busca, LCP 0.9s, suporta 100k SKUs."

**Fórmula:**
1. **O que é** (1 linha)
2. **Stack** (tecnologias)
3. **Métodos** (o que você fez)
4. **Resultados** (métricas: +X%, <Xs, etc)

---

## 🎬 Trocar previews por vídeos reais

Em `app/components/Projects.tsx`, troque `<ProjectPreview />` por:
```tsx
<video src="/videos/aurora.mp4" autoPlay muted loop playsInline />
```

Coloque os vídeos em `public/videos/`.

## 🆘 Troubleshooting

**Painel retorna 404?**
- Verifique se a chave está certa na URL
- Default: `chave=painel-admin`

**Login não aceita senha?**
- Sem `.env.local` configurado: use `admin123`
- Com `.env.local`: use a senha original (não o hash)

**Como gerar nova senha?**
```bash
node -e "console.log(require('crypto').createHash('sha256').update('NOVA_SENHA').digest('hex'))"
# Cole no .env.local: ADMIN_PASSWORD_HASH=hash_gerado
```

**Esqueci minha senha?**
- Apague a linha `ADMIN_PASSWORD_HASH` do `.env.local`
- Vai voltar para o padrão `admin123`

## 📄 Licença
Livre para uso pessoal.
