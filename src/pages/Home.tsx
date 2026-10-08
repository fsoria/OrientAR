import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ActividadCard } from '../components/actividades/ActividadCard'
import { TestHijo } from '../components/perfil/TestHijo'
import { useActividades } from '../hooks/useCatalog'
import { usePerfil } from '../hooks/usePerfil'
import { ordenarPorAfinidad } from '../lib/affinity'

export function Home() {
  const { items, loading } = useActividades()
  const { perfil } = usePerfil()

  const top = useMemo(() => ordenarPorAfinidad(items, perfil).slice(0, 4), [items, perfil])

  return (
    <div>
      {!perfil ? (
        <TestHijo />
      ) : (
        <>
          <div className="space-y-3 px-4 py-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="section-label">Top afinidad</p>
                <h2 className="text-lg font-bold text-stone-900">Para {perfil.nombre}</h2>
              </div>
              <Link to="/actividades" className="text-xs font-semibold text-violet-700">
                Ver todas
              </Link>
            </div>

            {loading ? (
              <p className="text-sm text-stone-500">Cargando...</p>
            ) : (
              top.map((a) => (
                <ActividadCard key={a.id} actividad={a} afinidad={a.afinidad} />
              ))
            )}

            <p className="pt-1 text-center text-[11px] text-stone-400">
              Afinidad calculada segun el perfil de {perfil.nombre}
            </p>
          </div>

          <div className="border-t border-violet-100">
            <TestHijo />
          </div>
        </>
      )}
    </div>
  )
}
