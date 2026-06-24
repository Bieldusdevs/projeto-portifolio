'use client'

// ============================================
// FORM FIELDS — Inputs estilizados para admin
// Visual: minimalista preto/branco
// ============================================
import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="mb-6">
      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-zinc-400 mt-1.5">{hint}</p>}
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200"
    />
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  hint,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  hint?: string
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200 resize-y"
    />
  )
}

export function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value.join(', ')}
      onChange={(e) =>
        onChange(
          e.target.value
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        )
      }
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200"
    />
  )
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-[#0a0a0a] focus:border-black focus:bg-white transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_16px_center] bg-no-repeat pr-10"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

export function SaveButton({
  onClick,
  loading,
  label = 'Salvar alterações',
}: {
  onClick: () => void
  loading?: boolean
  label?: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.01 }}
      whileTap={{ scale: loading ? 1 : 0.99 }}
      transition={{ duration: 0.15 }}
      className="px-6 py-3 bg-black text-white rounded-lg font-mono text-sm uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-50"
    >
      {loading ? 'Salvando...' : label}
    </motion.button>
  )
}

export function Toast({ message, type = 'success' }: { message: string; type?: 'success' | 'error' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg font-mono text-sm shadow-lg z-50 ${
        type === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white'
      }`}
    >
      {message}
    </motion.div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const show = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }
  return { toast, show }
}
