import { Heart } from 'lucide-react'
import { useFavoritos } from '../../hooks/useFavoritos'

export function FavoriteButton({
  id,
  tipo,
}: {
  id: string
  tipo: 'actividad' | 'colegio'
}) {
  const { has, toggle } = useFavoritos()
  const active = has(id, tipo)

  return (
    <button
      type="button"
      onClick={() => toggle(id, tipo)}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold transition ${
        active
          ? 'bg-amber-100 text-amber-800'
          : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
      }`}
      aria-pressed={active}
    >
      <Heart size={12} fill={active ? 'currentColor' : 'none'} />
      {active ? 'Guardado' : 'Guardar'}
    </button>
  )
}
