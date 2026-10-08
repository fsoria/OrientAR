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
        <div className="flex w-14 shrink-0 items-center justify-center bg-violet-50 text-2xl">
          🏫
        </div>
        <div className="min-w-0 flex-1 px-3 py-2.5">
          <div className="flex items-start gap-2">
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold leading-tight text-stone-900">
                {colegio.nombre}
              </p>
              <span
                className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                  colegio.gestion === 'estatal'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-violet-100 text-violet-700'
                }`}
              >
                {colegio.gestion}
              </span>
            </div>
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-[11px] text-stone-500">
            <span className="flex items-center gap-0.5">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              {colegio.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-0.5">
              <MapPin size={11} />
              {colegio.zona}
            </span>
          </div>
        </div>
      </div>
      <div className="px-3 pb-3">
        <p className="mb-2 text-xs text-stone-500">{colegio.niveles.join(' · ')}</p>
        <div className="flex gap-2">
          <Link
            to={`/colegios/${colegio.slug}`}
            className="flex-1 rounded-xl bg-violet-700 py-2.5 text-center text-xs font-semibold text-white active:scale-[0.98] transition-transform"
          >
            Ver ficha
          </Link>
          <button
            type="button"
            onClick={() => toggle(colegio.id, 'colegio')}
            className={`flex w-10 items-center justify-center rounded-xl border border-violet-200 transition-colors ${
              fav ? 'bg-rose-50 text-rose-500' : 'text-stone-400'
            }`}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  )
}
