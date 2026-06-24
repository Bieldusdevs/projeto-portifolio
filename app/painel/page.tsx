'use client'

// ============================================
// DASHBOARD — Visão geral do painel
// Mostra resumo dos dados e ações rápidas
// ============================================
import AdminShell from './_components/AdminShell'
import { usePortfolioData } from '@/lib/use-portfolio-data'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DashboardPage() {
  const { data } = usePortfolioData()

  const stats = [
    { label: 'Projetos', value: data.projects.length, href: '/painel/projetos' },
    { label: 'Experiências', value: data.experience.length, href: '/painel/experiencia' },
    { label: 'Depoimentos', value: data.testimonials.length, href: '/painel/depoimentos' },
    { label: 'Tecnologias', value: data.technologies.length, href: '/painel/tecnologias' },
  ]

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Visão geral do seu portfólio"
    >
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10 p-8 bg-white border border-zinc-200 rounded-2xl"
      >
        <div className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
          Bem-vindo de volta
        </div>
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight">
          Olá, <span className="italic">{data.profile.name}</span>
        </h2>
        <p className="text-zinc-600 mt-2 max-w-xl">
          Edite seus projetos, depoimentos e configurações. As alterações ficam salvas
          no navegador e aparecem instantaneamente no site público.
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
          >
            <Link
              href={stat.href}
              className="block p-6 bg-white border border-zinc-200 rounded-2xl hover:border-black transition-colors duration-200"
            >
              <div className="font-serif text-4xl mb-1">{stat.value}</div>
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                {stat.label}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="grid md:grid-cols-2 gap-4"
      >
        <Link
          href="/painel/projetos"
          className="group p-6 bg-white border border-zinc-200 rounded-2xl hover:border-black transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="font-serif text-xl">Editar Projetos</div>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              →
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            Adicione, edite ou remova os projetos em destaque do portfólio.
          </p>
        </Link>

        <Link
          href="/painel/configuracoes"
          className="group p-6 bg-white border border-zinc-200 rounded-2xl hover:border-black transition-all duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="font-serif text-xl">Redes Sociais</div>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              →
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            Atualize os links do GitHub, Twitter e outras configurações.
          </p>
        </Link>
      </motion.div>
    </AdminShell>
  )
}
