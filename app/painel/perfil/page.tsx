'use client'

// ============================================
// PERFIL — Editor de informações pessoais
// EDITE: dados do perfil no painel (salvos em localStorage)
// ============================================
import AdminShell from '../_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import {
  Field,
  TextInput,
  TextArea,
  TagInput,
  SaveButton,
  Toast,
  useToast,
} from '../_components/FormFields'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function PerfilPage() {
  const { data, saveData } = usePortfolioData()
  const [form, setForm] = useState(data.profile)
  const [bioText, setBioText] = useState(data.profile.bioParagraphs.join('\n\n'))
  const [stats, setStats] = useState(data.stats)
  const { toast, show } = useToast()

  const handleSave = () => {
    const bioParagraphs = bioText.split('\n\n').filter((p) => p.trim())
    saveData({
      profile: { ...form, bioParagraphs },
      stats,
    })
    show('Perfil salvo com sucesso')
  }

  return (
    <AdminShell title="Perfil" subtitle="Edite suas informações pessoais e bio">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Dados básicos */}
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
          <Field label="Nome">
            <TextInput
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Seu Nome"
            />
          </Field>

          <Field label="Badge (status)" hint="Aparece acima do título no hero">
            <TextInput
              value={form.badge}
              onChange={(v) => setForm({ ...form, badge: v })}
              placeholder="Disponível para novos projetos"
            />
          </Field>

          <Field label="Email" hint="Usado na seção de contato">
            <TextInput
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="seu@email.com"
            />
          </Field>

          <Field
            label="Título do Hero"
            hint="Cada palavra anima separadamente. Separe por vírgula."
          >
            <TagInput
              value={form.heroTitle}
              onChange={(v) => setForm({ ...form, heroTitle: v })}
              placeholder="Criando, experiências, digitais, que, importam."
            />
          </Field>

          <Field label="Subtítulo do Hero">
            <TextArea
              value={form.heroSubtitle}
              onChange={(v) => setForm({ ...form, heroSubtitle: v })}
              rows={3}
              placeholder="Desenvolvedor full stack..."
            />
          </Field>
        </div>

        {/* Bio */}
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
          <Field
            label="Bio (Sobre Mim)"
            hint="Separe cada parágrafo com uma linha em branco"
          >
            <TextArea
              value={bioText}
              onChange={setBioText}
              rows={10}
              placeholder="Com mais de 6 anos de experiência..."
            />
          </Field>

          <Field label="Estatísticas" hint="3 números em destaque">
            {stats.map((stat, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <input
                  value={stat.value}
                  onChange={(e) =>
                    setStats(
                      stats.map((s, j) =>
                        j === i ? { ...s, value: e.target.value } : s
                      )
                    )
                  }
                  placeholder="6+"
                  className="w-20 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200"
                />
                <input
                  value={stat.label}
                  onChange={(e) =>
                    setStats(
                      stats.map((s, j) =>
                        j === i ? { ...s, label: e.target.value } : s
                      )
                    )
                  }
                  placeholder="Anos de experiência"
                  className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200"
                />
              </div>
            ))}
          </Field>
        </div>
      </div>

      <div className="mt-8">
        <SaveButton onClick={handleSave} />
      </div>

      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>
    </AdminShell>
  )
}
