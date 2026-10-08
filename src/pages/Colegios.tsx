import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ColegioCard } from '../components/colegios/ColegioCard'
import { useColegios } from '../hooks/useCatalog'
import type { Gestion } from '../types'

const FILTROS: Array<Gestion | 'Todos'> = ['Todos', 'estatal', 'privada']

export function Colegios() {
  const { items, loading, error } = useColegios()
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState<Gestion | 'Todos'>('Todos')

  const list = useMemo(() => {
    return items
      .filter((c) => {
        if (filtro !== 'Todos' && c.gestion !== filtro) return false
        const text = `${c.nombre} ${c.orientacion.join(' ')} ${c.servicios.join(' ')} ${c.zona}`.toLowerCase()
        if (q && !text.includes(q.toLowerCase())) return false
        return true
      })
      .sort((a, b) => Number(b.destacado) - Number(a.destacado) || b.rating - a.rating)
  }, [items, filtro, q])

  return (
    <div className="pb-6">
      <div className="bg-violet-50 px-5 pb-2 pt-3">
        <div className="flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-stone-400">
          <Search size={16} />
          <input
            className="w-full bg-transparent text-stone-800 outline-none placeholder:text-stone-400"
            placeholder="Buscar colegio en Salta"
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
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
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
        {!loading && list.map((c) => <ColegioCard key={c.id} colegio={c} />)}
      </div>
    </div>
  )
}
