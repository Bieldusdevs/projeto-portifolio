'use client'

// ============================================
// PROJETOS — Editor de projetos (master-detail)
// Lista à esquerda, editor à direita
// ============================================
import AdminShell from '../_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import { Project, colorPresets, PreviewType } from '@/lib/portfolio-data'
import {
  Field,
  TextInput,
  TextArea,
  TagInput,
  Select,
  SaveButton,
  Toast,
  useToast,
} from '../_components/FormFields'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const colorOptions = Object.keys(colorPresets).map((c) => ({
  value: c,
  label: c,
}))
const previewOptions: { value: PreviewType; label: string }[] = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'web3', label: 'Web3' },
]

export default function ProjetosPage() {
  const { data, saveData } = usePortfolioData()
  const [selectedId, setSelectedId] = useState<string | null>(
    data.projects[0]?.id ?? null
  )
  const [draft, setDraft] = useState<Project | null>(null)
  const { toast, show } = useToast()

  const selected = data.projects.find((p) => p.id === selectedId) ?? null
  const current = draft ?? selected

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setDraft(null)
  }

  const handleAdd = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: 'Novo Projeto',
      category: 'Categoria',
      description: 'Descrição técnica do projeto...',
      tags: ['Next.js'],
      year: new Date().getFullYear().toString(),
      url: '#',
      color: 'blue-purple',
      previewType: 'ecommerce',
    }
    saveData({ projects: [...data.projects, newProject] })
    setSelectedId(newProject.id)
    setDraft(newProject)
    show('Projeto adicionado')
  }

  const handleDelete = (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return
    const filtered = data.projects.filter((p) => p.id !== id)
    saveData({ projects: filtered })
    setSelectedId(filtered[0]?.id ?? null)
    setDraft(null)
    show('Projeto excluído')
  }

  const updateDraft = (changes: Partial<Project>) => {
    if (!current) return
    setDraft({ ...current, ...changes })
  }

  const handleSave = () => {
    if (!current) return
    const updated = data.projects.map((p) => (p.id === current.id ? current : p))
    saveData({ projects: updated })
    setDraft(null)
    show('Projeto salvo')
  }

  return (
    <AdminShell
      title="Projetos"
      subtitle="Edite os projetos em destaque do portfólio"
    >
      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Lista */}
        <div className="space-y-2">
          <button
            onClick={handleAdd}
            className="w-full p-4 bg-white border-2 border-dashed border-zinc-300 rounded-xl hover:border-black hover:bg-zinc-50 transition-all duration-200 text-sm font-medium text-zinc-600"
          >
            + Adicionar projeto
          </button>

          {data.projects.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => handleSelect(project.id)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                selectedId === project.id
                  ? 'bg-black text-white'
                  : 'bg-white border border-zinc-200 hover:border-black'
              }`}
            >
              <div className={`font-serif text-lg ${selectedId === project.id ? '' : 'text-[#0a0a0a]'}`}>
                {project.title}
              </div>
              <div
                className={`font-mono text-xs uppercase tracking-wider mt-1 ${
                  selectedId === project.id ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                {project.year} · {project.category}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Editor */}
        <div>
          <AnimatePresence mode="wait">
            {current ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-white border border-zinc-200 rounded-2xl"
              >
                <div className="grid md:grid-cols-2 gap-x-6">
                  <Field label="Título">
                    <TextInput
                      value={current.title}
                      onChange={(v) => updateDraft({ title: v })}
                    />
                  </Field>

                  <Field label="Categoria">
                    <TextInput
                      value={current.category}
                      onChange={(v) => updateDraft({ category: v })}
                      placeholder="E-commerce Headless"
                    />
                  </Field>

                  <Field label="Ano">
                    <TextInput
                      value={current.year}
                      onChange={(v) => updateDraft({ year: v })}
                      placeholder="2025"
                    />
                  </Field>

                  <Field label="URL do projeto">
                    <TextInput
                      value={current.url}
                      onChange={(v) => updateDraft({ url: v })}
                      placeholder="https://..."
                    />
                  </Field>

                  <Field label="Cor (gradiente)">
                    <Select
                      value={current.color}
                      onChange={(v) => updateDraft({ color: v as Project['color'] })}
                      options={colorOptions}
                    />
                  </Field>

                  <Field label="Tipo de preview animado">
                    <Select
                      value={current.previewType}
                      onChange={(v) => updateDraft({ previewType: v as PreviewType })}
                      options={previewOptions}
                    />
                  </Field>
                </div>

                <Field
                  label="Descrição"
                  hint="Inclua stack, métodos e resultados (ex: '+47% conversões'). Separe tags por vírgula."
                >
                  <TextArea
                    value={current.description}
                    onChange={(v) => updateDraft({ description: v })}
                    rows={5}
                  />
                </Field>

                <Field label="Tags (tecnologias)" hint="Separe por vírgula">
                  <TagInput
                    value={current.tags}
                    onChange={(v) => updateDraft({ tags: v })}
                    placeholder="Next.js, Three.js, Stripe"
                  />
                </Field>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-200">
                  <button
                    onClick={() => handleDelete(current.id)}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Excluir projeto
                  </button>

                  <SaveButton onClick={handleSave} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-12 bg-white border border-zinc-200 rounded-2xl text-center"
              >
                <p className="text-zinc-500">Selecione um projeto para editar</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>{toast && <Toast {...toast} />}</AnimatePresence>
    </AdminShell>
  )
}
