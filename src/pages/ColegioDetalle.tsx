import { ChevronLeft, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapaView } from '../components/map/MapaView'
import { WhatsAppButton } from '../components/shared/WhatsAppButton'
import { getColegioBySlug } from '../lib/data'
import type { Colegio } from '../types'

export function ColegioDetalle() {
  const { slug = '' } = useParams()
  const [item, setItem] = useState<Colegio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = item ? `${item.nombre} · OrientAR` : 'OrientAR'
  }, [item])

  useEffect(() => {
    let alive = true
    ;(async () => {
      setLoading(true)
      const data = await getColegioBySlug(slug)
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
        <p className="font-bold">No encontramos este colegio</p>
        <Link to="/colegios" className="mt-3 inline-block text-sm text-violet-700">
          Volver
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <div className="bg-gradient-to-br from-violet-600 to-rose-500 px-5 pb-6 pt-4 text-white">
        <Link to="/colegios" className="mb-3 flex items-center gap-1 text-xs text-violet-100">
          <ChevronLeft size={14} /> Volver
        </Link>
        <div className="flex items-start gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            🏫
          </div>
          <div>
            <h1 className="text-xl font-extrabold leading-tight">{item.nombre}</h1>
            <p className="mt-1 text-xs capitalize text-violet-100">{item.gestion}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 px-5 py-4">
        <p className="flex items-center gap-1 text-sm text-stone-500">
          <MapPin size={14} /> {item.zona} · {item.direccion}
        </p>

        <Card title="Niveles" body={item.niveles.join(', ')} />
        <Card title="Orientaciones" body={item.orientacion.join(' · ')} />
        <Card title="Turnos" body={item.turnos.join(', ')} />
        <Card
          title="Cuota"
          body={
            item.cuotaRango
              ? `$${item.cuotaRango.min.toLocaleString('es-AR')} – $${item.cuotaRango.max.toLocaleString('es-AR')}`
              : 'Sin cuota publicada'
          }
        />

        <div className="rounded-2xl border border-violet-100 bg-white p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-stone-500">Servicios</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.servicios.map((s) => (
              <span
                key={s}
                className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <WhatsAppButton
          phone={item.contacto.whatsapp || item.contacto.tel}
          itemName={item.nombre}
        />

        <MapaView colegios={[item]} height="240px" showNearMe={false} />
      </div>
    </div>
  )
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-violet-100 bg-white p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{title}</p>
      <p className="mt-1 text-sm capitalize text-stone-700">{body}</p>
    </div>
  )
}
