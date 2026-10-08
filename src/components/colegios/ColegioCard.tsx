import { Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavoritos } from '../../hooks/useFavoritos'
import type { Colegio } from '../../types'

export function ColegioCard({ colegio }: { colegio: Colegio }) {
  const { has, toggle } = useFavoritos()
  const fav = has(colegio.id, 'colegio')

  return (
    <article className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm">
      <div className="flex">
        <div className="flex w-16 shrink-0 items-center justify-center bg-violet-100 text-3xl">
          🏫
        </div>
        <div className="min-w-0 flex-1 p-3">
          <div className="flex items-start gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-stone-900">
                {colegio.nombre}
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                  colegio.gestion === 'estatal'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-violet-100 text-violet-700'
                }`}
              >
                {colegio.gestion}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {colegio.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {colegio.zona}
            </span>
          </div>
        </div>
      </div>
      <div className="-mt-1 px-3 pb-3">
        <p className="mb-2 text-xs text-stone-500">{colegio.niveles.join(' · ')}</p>
        <div className="flex gap-2">
          <Link
            to={`/colegios/${colegio.slug}`}
            className="flex-1 rounded-lg bg-violet-700 py-2 text-center text-xs font-semibold text-white"
          >
            Ver ficha
          </Link>
          <button
            type="button"
            onClick={() => toggle(colegio.id, 'colegio')}
            className={`flex w-9 items-center justify-center rounded-lg border border-violet-200 ${
              fav ? 'bg-rose-50 text-rose-500' : 'text-rose-400'
            }`}
          >
            <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  )
}
