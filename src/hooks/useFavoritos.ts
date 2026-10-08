import { useEffect, useState } from 'react'
import { getFavoritos, isFavorito, toggleFavorito } from '../lib/storage'
import type { FavoritoItem } from '../types'

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<FavoritoItem[]>(() => getFavoritos())

  useEffect(() => {
    const sync = () => setFavoritos(getFavoritos())
    window.addEventListener('orientar:favoritos', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('orientar:favoritos', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  return {
    favoritos,
    toggle: (id: string, tipo: 'actividad' | 'colegio') => setFavoritos(toggleFavorito(id, tipo)),
    has: (id: string, tipo: 'actividad' | 'colegio') => isFavorito(id, tipo),
  }
}
