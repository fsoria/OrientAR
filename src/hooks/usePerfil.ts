import { useEffect, useState } from 'react'
import { clearPerfil, getPerfil, savePerfil } from '../lib/storage'
import type { PerfilHijo } from '../types'

export function usePerfil() {
  const [perfil, setPerfil] = useState<PerfilHijo | null>(() => getPerfil())

  useEffect(() => {
    const sync = () => setPerfil(getPerfil())
    window.addEventListener('orientar:perfil', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('orientar:perfil', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return {
    perfil,
    save: (p: PerfilHijo) => {
      savePerfil(p)
      setPerfil(p)
    },
    clear: () => {
      clearPerfil()
      setPerfil(null)
    },
  }
}
