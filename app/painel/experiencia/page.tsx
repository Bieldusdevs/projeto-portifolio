'use client'

// ============================================
// EXPERIÊNCIA — Editor de timeline profissional
// ============================================
import AdminShell from '../_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import { Experience } from '@/lib/portfolio-data'
import {
  Field,
  TextInput,
  TextArea,
  SaveButton,
  Toast,
  useToast,
} from '../_components/FormFields'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ExperienciaPage() {
  const { data, saveData } = usePortfolioData()
  const [draft, setDraft] = useState<Experience[] | null>(null)
  const { toast, show } = useToast()

  const current = draft ?? data.experience

  const handleAdd = () => {
    setDraft([
      ...current,
      {
        id: `exp-${Date.now()}`,
        role: 'Novo cargo',
        company: 'Empresa',
        period: '2024 — Presente',
        description: 'Descrição da posição...',
      },
    ])
  }

  const handleDelete = (id: string) => {
    setDraft(current.filter((e) => e.id !== id))
  }

  const update = (id: string, changes: Partial<Experience>) => {
    setDraft(current.map((e) => (e.id === id ? { ...e, ...changes } : e)))
  }

  const handleSave = () => {
    saveData({ experience: current })
    setDraft(null)
    show('Experiências salvas')
  }

  return (
    <AdminShell
      title="Experiência"
      subtitle="Edite sua trajetória profissional"
    >
      <button
        onClick={handleAdd}
        className="w-full p-4 mb-4 bg-white border-2 border-dashed border-zinc-300 rounded-xl hover:border-black hover:bg-zinc-50 transition-all duration-200 text-sm font-medium text-zinc-600"
      >
        + Adicionar experiência
      </button>

      <div className="space-y-4">
        <AnimatePresence>
          {current.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white border border-zinc-200 rounded-2xl"
            >
              <div className="grid md:grid-cols-3 gap-x-6">
                <Field label="Cargo">
                  <TextInput
                    value={exp.role}
                    onChange={(v) => update(exp.id, { role: v })}
                  />
                </Field>
                <Field label="Empresa">
                  <TextInput
                    value={exp.company}
                    onChange={(v) => update(exp.id, { company: v })}
                  />
                </Field>
                <Field label="Período">
                  <TextInput
                    value={exp.period}
                    onChange={(v) => update(exp.id, { period: v })}
                    placeholder="2024 — Presente"
                  />
                </Field>
              </div>

              <Field label="Descrição">
                <TextArea
                  value={exp.description}
                  onChange={(v) => update(exp.id, { description: v })}
                  rows={3}
                />
              </Field>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remover
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <SaveButton onClick={handleSave} />
      </div>

      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>
    </AdminShell>
  )
}
