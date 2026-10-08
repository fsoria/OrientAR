import { Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavoritos } from '../../hooks/useFavoritos'
import { emojiForActividad } from '../../lib/emojis'
import type { Actividad, ResultadoAfinidad } from '../../types'

function afinColor(score: number) {
  if (score >= 90) return 'bg-green-500'
  if (score >= 80) return 'bg-violet-500'
  return 'bg-rose-400'
}

export function ActividadCard({
  actividad,
  afinidad,
}: {
  actividad: Actividad
  afinidad?: ResultadoAfinidad
}) {
  const { has, toggle } = useFavoritos()
  const fav = has(actividad.id, 'actividad')
  const score = afinidad && !afinidad.excluido ? afinidad.score : null
  const emoji = emojiForActividad(actividad.categoria, actividad.subcategoria)

  return (
    <article className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
      <div className="flex">
        <div className="flex w-14 shrink-0 items-center justify-center bg-violet-50 text-2xl">
          {emoji}
        </div>
        <div className="min-w-0 flex-1 px-3 py-2.5">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold leading-tight text-stone-900">
                {actividad.nombre}
              </p>
              <span className="mt-0.5 inline-block rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                {actividad.categoria}
              </span>
            </div>
            {score !== null && (
              <div
                className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white ${afinColor(score)}`}
              >
                {score}%
              </div>
            )}
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-stone-500">
            <span className="flex items-center gap-0.5">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {actividad.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-0.5">
              <MapPin size={11} />
              {actividad.zona}
            </span>
            <span className="font-semibold text-stone-600">{actividad.precioNivel}</span>
          </div>
        </div>
      </div>

      <div className="px-3 pb-3">
        <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-stone-500">
          {actividad.descripcion}
        </p>
        {afinidad && !afinidad.excluido && afinidad.motivos.length > 0 && (
          <p className="mb-2 text-[11px] text-violet-600">
            · {afinidad.motivos[0]?.label}
          </p>
        )}
        <div className="flex gap-2">
          <Link
            to={`/actividades/${actividad.slug}`}
            className="flex-1 rounded-xl bg-violet-700 py-2.5 text-center text-xs font-semibold text-white active:scale-[0.98] transition-transform"
          >
            Ver y contactar
          </Link>
          <button
            type="button"
            onClick={() => toggle(actividad.id, 'actividad')}
            className={`flex w-10 items-center justify-center rounded-xl border border-violet-200 transition-colors ${
              fav ? 'bg-rose-50 text-rose-500' : 'text-stone-400'
            }`}
            aria-label={fav ? 'Quitar de favoritos' : 'Guardar'}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  )
}
