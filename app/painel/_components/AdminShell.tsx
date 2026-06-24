'use client'

// ============================================
// ADMIN SHELL — Header + Sidebar wrapper
// (sem info de usuário — login é por senha)
// ============================================
import { motion } from 'framer-motion'
import AdminSidebar from './AdminSidebar'

export default function AdminShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <AdminSidebar />

      <main className="flex-1 p-8 md:p-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-10">
            <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-1">
              {title}
            </h1>
            {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
          </div>
          {children}
        </motion.div>
      </main>
    </div>
  )
}
