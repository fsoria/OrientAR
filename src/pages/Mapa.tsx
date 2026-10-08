import { useMemo, useState } from 'react'
import { MapaView } from '../components/map/MapaView'
import { useActividades, useColegios } from '../hooks/useCatalog'
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

export function Mapa() {
  const { items: actividades } = useActividades()
  const { items: colegios } = useColegios()
  const [filtro, setFiltro] = useState<Categoria | 'Todas'>('Todas')
  const [showColegios, setShowColegios] = useState(true)

  const acts = useMemo(
    () => (filtro === 'Todas' ? actividades : actividades.filter((a) => a.categoria === filtro)),
    [actividades, filtro],
  )

  return (
    <div className="space-y-3 px-5 py-4 pb-6">
      <div>
        <h1 className="text-lg font-bold text-stone-900">Mapa de Salta</h1>
        <p className="text-xs text-stone-500">Pines de actividades y colegios · Cerca mío</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTROS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
              filtro === f
                ? 'bg-violet-700 text-white'
                : 'border border-violet-200 bg-white text-violet-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-xs text-stone-600">
        <input
          type="checkbox"
          checked={showColegios}
          onChange={(e) => setShowColegios(e.target.checked)}
        />
        Mostrar colegios
      </label>

      <MapaView
        actividades={acts}
        colegios={showColegios ? colegios : []}
        height="55vh"
        showNearMe
      />
    </div>
  )
}
