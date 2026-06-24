'use client'

// ============================================
// DEPOIMENTOS — Editor de testimonials
// ============================================
import AdminShell from '../_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import { Testimonial } from '@/lib/portfolio-data'
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

export default function DepoimentosPage() {
  const { data, saveData } = usePortfolioData()
  const [draft, setDraft] = useState<Testimonial[] | null>(null)
  const { toast, show } = useToast()

  const current = draft ?? data.testimonials

  const handleAdd = () => {
    setDraft([
      ...current,
      {
        id: `test-${Date.now()}`,
        name: 'Nome',
        role: 'Cargo, Empresa',
        text: 'Texto do depoimento...',
      },
    ])
  }

  const handleDelete = (id: string) => {
    setDraft(current.filter((t) => t.id !== id))
  }

  const update = (id: string, changes: Partial<Testimonial>) => {
    setDraft(current.map((t) => (t.id === id ? { ...t, ...changes } : t)))
  }

  const handleSave = () => {
    saveData({ testimonials: current })
    setDraft(null)
    show('Depoimentos salvos')
  }

  return (
    <AdminShell
      title="Depoimentos"
      subtitle="Edite os depoimentos de clientes"
    >
      <button
        onClick={handleAdd}
        className="w-full p-4 mb-4 bg-white border-2 border-dashed border-zinc-300 rounded-xl hover:border-black hover:bg-zinc-50 transition-all duration-200 text-sm font-medium text-zinc-600"
      >
        + Adicionar depoimento
      </button>

      <div className="space-y-4">
        <AnimatePresence>
          {current.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white border border-zinc-200 rounded-2xl"
            >
              <div className="grid md:grid-cols-2 gap-x-6">
                <Field label="Nome">
                  <TextInput
                    value={test.name}
                    onChange={(v) => update(test.id, { name: v })}
                  />
                </Field>
                <Field label="Cargo / Empresa">
                  <TextInput
                    value={test.role}
                    onChange={(v) => update(test.id, { role: v })}
                    placeholder="CEO, Empresa"
                  />
                </Field>
              </div>

              <Field label="Depoimento">
                <TextArea
                  value={test.text}
                  onChange={(v) => update(test.id, { text: v })}
                  rows={4}
                />
              </Field>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(test.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remover depoimento
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
