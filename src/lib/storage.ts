import type { FavoritoItem, PerfilHijo } from '../types'

const PERFIL_KEY = 'orientar:perfil-hijo'
const FAVORITOS_KEY = 'orientar:favoritos'

export function getPerfil(): PerfilHijo | null {
  try {
    const raw = localStorage.getItem(PERFIL_KEY)
    return raw ? (JSON.parse(raw) as PerfilHijo) : null
  } catch {
    return null
  }
}

export function savePerfil(perfil: PerfilHijo) {
  localStorage.setItem(PERFIL_KEY, JSON.stringify(perfil))
  window.dispatchEvent(new Event('orientar:perfil'))
}

export function clearPerfil() {
  localStorage.removeItem(PERFIL_KEY)
  window.dispatchEvent(new Event('orientar:perfil'))
}

export function getFavoritos(): FavoritoItem[] {
  try {
    const raw = localStorage.getItem(FAVORITOS_KEY)
    return raw ? (JSON.parse(raw) as FavoritoItem[]) : []
  } catch {
    return []
  }
}

export function toggleFavorito(id: string, tipo: 'actividad' | 'colegio'): FavoritoItem[] {
  const actual = getFavoritos()
  const exists = actual.find((f) => f.id === id && f.tipo === tipo)
  const next = exists
    ? actual.filter((f) => !(f.id === id && f.tipo === tipo))
    : [...actual, { id, tipo, agregadoEn: new Date().toISOString() }]
  localStorage.setItem(FAVORITOS_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('orientar:favoritos'))
  return next
}

export function isFavorito(id: string, tipo: 'actividad' | 'colegio') {
  return getFavoritos().some((f) => f.id === id && f.tipo === tipo)
}
