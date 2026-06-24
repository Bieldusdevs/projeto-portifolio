'use client'

// ============================================
// CONFIGURAÇÕES — Redes sociais e utilitários
// EDITE: links de GitHub e Twitter aqui
// ============================================
import AdminShell from '../_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import {
  Field,
  TextInput,
  SaveButton,
  Toast,
  useToast,
} from '../_components/FormFields'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ConfiguracoesPage() {
  const { data, saveData, resetData } = usePortfolioData()
  const [form, setForm] = useState(data.socials)
  const { toast, show } = useToast()

  const handleSave = () => {
    saveData({ socials: form })
    show('Configurações salvas')
  }

  const handleReset = () => {
    if (
      !confirm(
        'Tem certeza? Isso restaura todos os dados para os valores padrão do código.'
      )
    )
      return
    resetData()
    show('Dados restaurados para o padrão', 'success')
  }

  return (
    <AdminShell
      title="Configurações"
      subtitle="Redes sociais e utilitários"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Redes Sociais */}
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
          <h3 className="font-serif text-xl mb-1">Redes Sociais</h3>
          <p className="text-sm text-zinc-500 mb-6">
            Links exibidos no rodapé e na seção de contato
          </p>

          <Field label="GitHub">
            <TextInput
              value={form.github}
              onChange={(v) => setForm({ ...form, github: v })}
              placeholder="https://github.com/seu-user"
            />
          </Field>

          <Field label="Twitter / X">
            <TextInput
              value={form.twitter}
              onChange={(v) => setForm({ ...form, twitter: v })}
              placeholder="https://twitter.com/seu-user"
            />
          </Field>
        </div>

        {/* Zona de perigo */}
        <div className="p-6 bg-white border border-zinc-200 rounded-2xl">
          <h3 className="font-serif text-xl mb-1">Dados</h3>
          <p className="text-sm text-zinc-500 mb-6">
            Os dados ficam salvos no navegador (localStorage)
          </p>

          <div className="space-y-3">
            <div className="p-4 bg-zinc-50 rounded-lg">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">
                Armazenamento
              </div>
              <div className="text-sm">
                Os dados são salvos no navegador. Para sincronizar entre
                dispositivos, edite o arquivo{' '}
                <code className="px-1.5 py-0.5 bg-zinc-200 rounded text-xs">
                  lib/portfolio-data.ts
                </code>
                .
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full px-4 py-3 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
            >
              Restaurar dados padrão
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <a
          href="/"
          target="_blank"
          className="text-sm text-zinc-500 hover:text-black underline underline-offset-4"
        >
          Ver site público →
        </a>
        <SaveButton onClick={handleSave} />
      </div>

      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>
    </AdminShell>
  )
}
