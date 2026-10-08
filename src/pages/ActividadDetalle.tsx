import { ChevronLeft, MapPin, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapaView } from '../components/map/MapaView'
import { WhatsAppButton } from '../components/shared/WhatsAppButton'
import { useFavoritos } from '../hooks/useFavoritos'
import { usePerfil } from '../hooks/usePerfil'
import { calcularAfinidad } from '../lib/affinity'
import { getActividadBySlug } from '../lib/data'
import { emojiForActividad } from '../lib/emojis'
import type { Actividad } from '../types'

export function ActividadDetalle() {
  const { slug = '' } = useParams()
  const { perfil } = usePerfil()
  const { has, toggle } = useFavoritos()
  const [item, setItem] = useState<Actividad | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = item ? `${item.nombre} · OrientAR` : 'OrientAR'
  }, [item])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      const data = await getActividadBySlug(slug)
      if (alive) {
        setItem(data)
        setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [slug])

  if (loading) return <p className="px-5 py-8 text-sm text-stone-500">Cargando...</p>
  if (!item) {
    return (
      <div className="px-5 py-8">
        <p className="font-bold text-stone-900">No encontramos esta actividad</p>
        <Link to="/actividades" className="mt-3 inline-block text-sm text-violet-700">
          Volver
        </Link>
      </div>
    )
  }

  const afinidad = calcularAfinidad(item, perfil)
  const fav = has(item.id, 'actividad')

  return (
    <div className="pb-8">
      <div className="bg-gradient-to-br from-violet-600 to-rose-500 px-5 pb-6 pt-4 text-white">
        <Link to="/actividades" className="mb-3 flex items-center gap-1 text-xs text-violet-100">
          <ChevronLeft size={14} /> Volver
        </Link>
        <div className="flex items-start gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            {emojiForActividad(item.categoria, item.subcategoria)}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold leading-tight">{item.nombre}</h1>
            <p className="mt-1 text-xs text-violet-100">{item.categoria}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-5 py-4">
        {afinidad.score > 0 && !afinidad.excluido && (
          <div className="rounded-2xl border border-violet-100 bg-white p-3">
            <p className="text-sm font-bold text-stone-900">{afinidad.score}% de afinidad</p>
            <ul className="mt-1 space-y-0.5 text-xs text-stone-500">
              {afinidad.motivos.slice(0, 3).map((m) => (
                <li key={m.label}>· {m.label}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-sm leading-relaxed text-stone-600">{item.descripcion}</p>

        <div className="flex flex-wrap gap-3 text-xs text-stone-500">
          <span className="flex items-center gap-1">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            {item.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {item.zona}
          </span>
          <span className="font-semibold text-stone-700">{item.precioNivel}</span>
          <span>
            {item.rangoEdad.min}–{item.rangoEdad.max} años
          </span>
        </div>

        <div className="flex gap-2">
          <WhatsAppButton
            phone={item.contacto.whatsapp || item.contacto.tel}
            itemName={item.nombre}
            childName={perfil?.nombre}
            className="flex-1 !rounded-xl !py-3"
          />
          <button
            type="button"
            onClick={() => toggle(item.id, 'actividad')}
            className={`flex w-12 items-center justify-center rounded-xl border border-violet-200 text-lg transition-colors ${
              fav ? 'bg-rose-50 text-rose-500' : 'text-stone-400'
            }`}
          >
            {fav ? '♥' : '♡'}
          </button>
        </div>

        <MapaView actividades={[item]} height="240px" showNearMe={false} />
      </div>
    </div>
  )
}
