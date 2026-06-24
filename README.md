# Portfólio — Nível Awwwards

Portfólio pessoal com painel administrativo via **GitHub OAuth** e design premium.

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
- 🔐 **Login via GitHub OAuth** (sem senha pra lembrar)
- 🛡️ URL secreta via middleware (esconde /painel)
- 🚫 Sessão assinada HMAC em cookie httpOnly
- ✏️ Edição completa: perfil, projetos, experiência, tecnologias, depoimentos, redes sociais
- 🎨 Visual preto/branco com Framer Motion
- 💾 Dados salvos no navegador (localStorage)

## 🛠 Stack

| Categoria | Tecnologias |
|-----------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **3D / WebGL** | Three.js, React Three Fiber, GLSL Shaders |
| **Animação** | GSAP + ScrollTrigger, Framer Motion |
| **Auth** | GitHub OAuth + HMAC signed cookies |
| **Scroll** | Lenis |
| **Estilo** | Tailwind CSS + TypeScript |

---

## 🚀 Setup rápido

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar GitHub OAuth (5 minutos)

Você vai precisar criar um OAuth App no GitHub. Veja o guia detalhado abaixo.

### 3. Criar `.env.local`

```bash
cp .env.example .env.local
```

Edite `.env.local` com as credenciais obtidas:

```env
GITHUB_CLIENT_ID=seu_client_id
GITHUB_CLIENT_SECRET=seu_client_secret
ADMIN_GITHUB_USERNAME=seu_usuario_github
SESSION_SECRET=gere_com_comando_abaixo
ADMIN_PATH_SECRET=gere_com_comando_abaixo
```

Gere os segredos:

```bash
# SESSION_SECRET (32 bytes em hex)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# ADMIN_PATH_SECRET (string aleatória)
node -e "console.log(Math.random().toString(36).slice(2))"
```

### 4. Rodar

```bash
npm run dev
# http://localhost:3000
```

### 5. Acessar painel

```
http://localhost:3000/painel?chave=SEU_ADMIN_PATH_SECRET
```

Clique em **"Entrar com GitHub"** → autorize → pronto!

---

## 🔐 Como criar o GitHub OAuth App (passo a passo)

### Passo 1: Acessar Developer Settings

1. Faça login no GitHub
2. Vá em **https://github.com/settings/developers**
3. Click em **"OAuth apps"** no menu lateral
4. Click em **"New OAuth App"** (botão no canto superior direito)

### Passo 2: Preencher o formulário

```
┌─────────────────────────────────────────────────────────────┐
│  Application name:    Portfolio Admin                       │
│                                                               │
│  Homepage URL:                                               │
│    • Dev:  http://localhost:3000                             │
│    • Prod: https://seu-site.vercel.app                       │
│                                                               │
│  Application description: (opcional)                        │
│    "Painel administrativo do meu portfólio"                  │
│                                                               │
│  Authorization callback URL:                                 │
│    • Dev:  http://localhost:3000/api/admin/auth/github/callback │
│    • Prod: https://seu-site.vercel.app/api/admin/auth/github/callback │
│                                                               │
│  ☑ Enable Device Flow (deixe desmarcado)                    │
└─────────────────────────────────────────────────────────────┘
```

**⚠️ ATENÇÃO na Callback URL:**
- Tem que ser **EXATAMENTE** igual ao que você colocar
- Tem que terminar em `/api/admin/auth/github/callback`
- Sem barra no final
- HTTPS em produção (não http)

Click **"Register application"**

### Passo 3: Obter Client ID

Você será redirecionado para a página do app. No topo você vê:

```
Client ID
IvxAMPLE1234567890ABCDEF  ← COPIE ESTE
```

### Passo 4: Gerar Client Secret

1. Na mesma página, click **"Generate a new client secret"**
2. **COPIE O SECRET IMEDIATAMENTE** — você não vai conseguir ver de novo!
3. Se perder, só pode gerar um novo (revoga o antigo)

Você verá algo assim:

```
Client secrets
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  ← COPIE ESTE
```

### Passo 5: Adicionar ao `.env.local`

```env
GITHUB_CLIENT_ID=IvxAMPLE1234567890ABCDEF
GITHUB_CLIENT_SECRET=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Passo 6: Definir quem pode acessar

O `ADMIN_GITHUB_USERNAME` controla quais contas GitHub podem entrar.

```env
# Apenas você
ADMIN_GITHUB_USERNAME=seu-usuario-github

# Múltiplos admins (separados por vírgula, sem espaço)
ADMIN_GITHUB_USERNAME=seu-usuario,colega-dev,namorada
```

⚠️ É o **username**, não o nome de exibição. Você encontra em `github.com/SEU-USUARIO` (parte da URL).

### Passo 7: Testar

```bash
# Reinicie o servidor
npm run dev

# Acesse
http://localhost:3000/painel?chave=SEU_ADMIN_PATH_SECRET
```

Click em "Entrar com GitHub" → autorize → se seu username está no env, entra!

---

## 🌐 Deploy na Vercel

### Passo 1: Subir pro GitHub

```bash
git init
git add .
git commit -m "feat: portfólio com GitHub OAuth"
git branch -M main
git remote add origin https://github.com/SEU-USER/portfolio.git
git push -u origin main
```

### Passo 2: Importar na Vercel

1. [vercel.com](https://vercel.com) → **"Add New Project"**
2. Selecione o repositório
3. **ANTES de fazer Deploy**, click **"Environment Variables"** e adicione:

| Nome | Valor |
|------|-------|
| `GITHUB_CLIENT_ID` | seu Client ID |
| `GITHUB_CLIENT_SECRET` | seu Client Secret |
| `ADMIN_GITHUB_USERNAME` | seu username GitHub |
| `SESSION_SECRET` | (string aleatória de 64 chars) |
| `ADMIN_PATH_SECRET` | (string aleatória curta) |

4. Click **Deploy**

### Passo 3: Atualizar a Callback URL no GitHub

Depois do deploy, edite seu OAuth App no GitHub e atualize a **Authorization callback URL** para:
```
https://seu-site.vercel.app/api/admin/auth/github/callback
```

### Passo 4: Acessar

```
https://seu-site.vercel.app/painel?chave=SEU_ADMIN_PATH_SECRET
```

---

## 🎨 Customização

### Editar dados pelo painel (recomendado)
Acesse `/painel`, faça login com GitHub, edite tudo visualmente. As alterações ficam salvas no navegador e aparecem instantaneamente.

### Editar dados padrão no código
Edite `lib/portfolio-data.ts` — são as descrições melhoradas (técnicas + resultados).

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
`app/layout.tsx` — altere `Inter`, `Instrument_Serif`, `JetBrains_Mono`.

### Shader WebGL
`app/components/WebGLBackground.tsx` — edite `fragmentShader`.

---

## 🔒 Segurança do painel

| Camada | Implementação |
|--------|---------------|
| **URL oculta** | `/painel?chave=SEGREDO` — middleware retorna 404 sem chave |
| **GitHub OAuth** | Delega autenticação ao GitHub (2FA funciona) |
| **Lista de admins** | Só usernames no env var podem entrar |
| **CSRF** | State aleatório em cookie httpOnly |
| **Sessão HMAC** | Cookie assinado com SHA-256 |
| **httpOnly + Secure** | JS do browser não lê; HTTPS em prod |
| **SameSite strict** | Proteção CSRF adicional |
| **Expiração 24h** | Cookie expira automaticamente |

**Por que GitHub OAuth > senha:**
- ✅ Sem senha pra vazar/lembrar
- ✅ Funciona com 2FA do GitHub
- ✅ GitHub já protege contra brute-force
- ✅ Você vê qual conta entrou (auditável)
- ✅ Fácil adicionar/remover admins (env var)

---

## 📝 Como escrever descrições melhores

**❌ Vago:**
> "Projeto de loja de carros"

**✅ Técnico + resultados:**
> "E-commerce de veículos com Next.js e Algolia. Implementei busca facetada, lazy loading de imagens e filtros em URL. Stack: Next.js, Algolia, Stripe, Vercel. Resultados: +38% conversão de busca, LCP 0.9s, suporta 100k SKUs."

**Fórmula:**
1. **O que é** (1 linha objetiva)
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

**GitHub retorna erro "redirect_uri_mismatch"?**
- A callback URL no GitHub deve ser **EXATAMENTE** igual à do seu site (incluindo http/https)

**"Sua conta do GitHub não tem permissão"?**
- Verifique se `ADMIN_GITHUB_USERNAME` tem exatamente o seu username (lowercase, sem @)

**Painel retorna 500 ao tentar login?**
- Verifique se as 3 env vars do GitHub estão no `.env.local`: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `ADMIN_GITHUB_USERNAME`

**Cookie de sessão não persiste?**
- Em produção, garanta que o site está em HTTPS (Vercel já faz isso)

**Quero adicionar mais admins?**
- Edite `ADMIN_GITHUB_USERNAME`: `user1,user2,user3` (vírgula, sem espaço)
- Não precisa deployar de novo (mas se quiser, faça)

## 📄 Licença
Livre para uso pessoal.
