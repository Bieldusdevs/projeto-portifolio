'use client'

// ============================================
// HOOK — usePortfolioData
// Hook para acessar dados do portfólio
// - No SSR/primeira render: usa defaults
// - Após mount: lê localStorage e atualiza
// ============================================
import { useEffect, useState, useCallback } from 'react'
import { defaultData, PortfolioData } from './portfolio-data'

const STORAGE_KEY = 'portfolio-admin-data'

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultData)
  const [loaded, setLoaded] = useState(false)

  // Carregar do localStorage no mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // Merge com defaults para garantir estrutura completa
        setData({
          profile: { ...defaultData.profile, ...parsed.profile },
          stats: parsed.stats || defaultData.stats,
          projects: parsed.projects || defaultData.projects,
          experience: parsed.experience || defaultData.experience,
          technologies: parsed.technologies || defaultData.technologies,
          testimonials: parsed.testimonials || defaultData.testimonials,
          socials: { ...defaultData.socials, ...parsed.socials },
        })
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e)
    }
    setLoaded(true)
  }, [])

  // Salvar no localStorage
  const saveData = useCallback((newData: Partial<PortfolioData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        console.error('Erro ao salvar dados:', e)
      }
      return updated
    })
  }, [])

  // Resetar para defaults
  const resetData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setData(defaultData)
    } catch (e) {
      console.error('Erro ao resetar dados:', e)
    }
  }, [])

  return { data, saveData, resetData, loaded }
}
