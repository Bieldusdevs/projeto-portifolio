'use client'

// ============================================
// ADMIN SHELL — Header + Sidebar wrapper
// Mostra usuário logado no canto superior
// ============================================
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
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
  const [user, setUser] = useState<{ username: string; name: string; avatar: string } | null>(null)

  useEffect(() => {
    fetch('/api/admin/auth/status')
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) setUser(data.user)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <AdminSidebar user={user} />

      <main className="flex-1 p-8 md:p-12 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between mb-10 gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl tracking-tight mb-1">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-zinc-500">{subtitle}</p>
              )}
            </div>

            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 px-4 py-2 bg-white border border-zinc-200 rounded-full"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full"
                />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium leading-tight">
                    {user.name}
                  </div>
                  <div className="text-xs text-zinc-500 leading-tight">
                    @{user.username}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          {children}
        </motion.div>
      </main>
    </div>
  )
}
