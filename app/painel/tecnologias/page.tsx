'use client'

// ============================================
// TECNOLOGIAS — Editor de stack
// Cada categoria tem nome e lista de tecnologias
// ============================================
import AdminShell from '../_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import { TechCategory } from '@/lib/portfolio-data'
import {
  Field,
  TextInput,
  TagInput,
  SaveButton,
  Toast,
  useToast,
} from '../_components/FormFields'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function TecnologiasPage() {
  const { data, saveData } = usePortfolioData()
  const [draft, setDraft] = useState<TechCategory[] | null>(null)
  const { toast, show } = useToast()

  const current = draft ?? data.technologies

  const handleAdd = () => {
    setDraft([
      ...current,
      { id: `cat-${Date.now()}`, name: 'Nova Categoria', items: ['Tecnologia'] },
    ])
  }

  const handleDelete = (id: string) => {
    setDraft(current.filter((c) => c.id !== id))
  }

  const update = (id: string, changes: Partial<TechCategory>) => {
    setDraft(current.map((c) => (c.id === id ? { ...c, ...changes } : c)))
  }

  const handleSave = () => {
    saveData({ technologies: current })
    setDraft(null)
    show('Tecnologias salvas')
  }

  return (
    <AdminShell
      title="Tecnologias"
      subtitle="Edite seu stack e ferramentas"
    >
      <button
        onClick={handleAdd}
        className="w-full p-4 mb-4 bg-white border-2 border-dashed border-zinc-300 rounded-xl hover:border-black hover:bg-zinc-50 transition-all duration-200 text-sm font-medium text-zinc-600"
      >
        + Adicionar categoria
      </button>

      <div className="grid md:grid-cols-2 gap-4">
        <AnimatePresence>
          {current.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white border border-zinc-200 rounded-2xl"
            >
              <Field label="Nome da categoria">
                <TextInput
                  value={cat.name}
                  onChange={(v) => update(cat.id, { name: v })}
                />
              </Field>

              <Field label="Tecnologias" hint="Separe por vírgula">
                <TagInput
                  value={cat.items}
                  onChange={(v) => update(cat.id, { items: v })}
                  placeholder="React, Next.js, TypeScript"
                />
              </Field>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remover categoria
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
