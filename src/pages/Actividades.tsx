import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ActividadCard } from '../components/actividades/ActividadCard'
import { useActividades } from '../hooks/useCatalog'
import { usePerfil } from '../hooks/usePerfil'
import { ordenarPorAfinidad } from '../lib/affinity'
import type { Categoria } from '../types'

const FILTROS: Array<Categoria | 'Todas'> = [
  'Todas',
  'Deporte',
  'Arte',
  'Idiomas',
  'Ciencia',
  'Música',
  'Tecnología',
  'Danza',
]

export function Actividades() {
  const { items, loading, error } = useActividades()
  const { perfil } = usePerfil()
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<Categoria | 'Todas'>('Todas')

  const list = useMemo(() => {
    const filtered = items.filter((a) => {
      if (filtro !== 'Todas' && a.categoria !== filtro) return false
      const text = `${a.nombre} ${a.descripcion} ${a.tags.join(' ')} ${a.subcategoria}`.toLowerCase()
      if (q && !text.includes(q.toLowerCase())) return false
      return true
    })
    return ordenarPorAfinidad(filtered, perfil)
  }, [items, filtro, q, perfil])

  return (
    <div className="pb-6">
      <div className="bg-violet-50 px-5 pb-2 pt-3">
        <div className="flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-stone-400">
          <Search size={16} />
          <input
            className="w-full bg-transparent text-stone-800 outline-none placeholder:text-stone-400"
            placeholder="Buscar actividad en Salta"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {FILTROS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFiltro(f)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                filtro === f
                  ? 'bg-violet-700 text-white'
                  : 'border border-violet-200 bg-white text-violet-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 px-4 pt-4 pb-5">
        {loading && <p className="text-sm text-stone-500">Cargando...</p>}
        {error && <p className="text-sm text-rose-500">{error}</p>}

        {!loading &&
          list.map((a) => (
            <ActividadCard key={a.id} actividad={a} afinidad={a.afinidad} />
          ))}

        {!loading && (
          <p className="pt-1 text-center text-[11px] text-stone-400">
            {perfil
              ? `Afinidad calculada según el perfil de ${perfil.nombre}`
              : 'Armá el perfil para ver % de afinidad'}
          </p>
        )}
      </div>
    </div>
  )
}
