import type { Categoria } from '../types'

const MAP: Record<Categoria, string> = {
  Deporte: '⚽',
  Arte: '🎨',
  Idiomas: '🗣️',
  Ciencia: '🔬',
  Música: '🎸',
  Tecnología: '🤖',
  Danza: '🩰',
}

const BY_SUB: Record<string, string> = {
  Fútbol: '⚽',
  Natación: '🏊',
  Básquet: '🏀',
  Hockey: '🏑',
  Vóley: '🏐',
  Inglés: '🗣️',
  Francés: '🇫🇷',
  Piano: '🎹',
  Guitarra: '🎸',
  Pintura: '🎨',
  Teatro: '🎭',
  Cerámica: '🏺',
  Robótica: '🤖',
  Programación: '💻',
  Ajedrez: '♟️',
  Experimentos: '🔬',
  Ballet: '🩰',
  Folklore: '💃',
}

export function emojiForActividad(categoria: Categoria, subcategoria?: string) {
  if (subcategoria && BY_SUB[subcategoria]) return BY_SUB[subcategoria]
  return MAP[categoria] ?? '✨'
}
