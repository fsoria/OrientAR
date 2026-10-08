import { Sparkles } from 'lucide-react'
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
          <div className="bg-gradient-to-br from-violet-600 to-rose-500 px-5 pb-5 pt-4 text-white">
            <div className="mb-2 flex items-center gap-1.5 text-xs text-violet-100">
              <Sparkles size={13} /> Recomendado para
            </div>
            <Link
              to="/#test"
              className="flex w-full items-center gap-3 rounded-2xl bg-white/15 px-3 py-2.5 transition hover:bg-white/25"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-violet-700">
                {perfil.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 text-left">
                <p className="leading-tight font-bold">
                  {perfil.nombre} · {perfil.edad} años
                </p>
                <p className="truncate text-xs text-violet-100">
                  {perfil.intereses.slice(0, 3).join(' · ')}
                </p>
              </div>
              <span className="ml-auto whitespace-nowrap rounded-full bg-white/20 px-2 py-1 text-xs">
                Editar
              </span>
            </Link>
          </div>

          <div className="space-y-3 px-5 py-4 pb-8">
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
              Afinidad calculada según el perfil de {perfil.nombre}
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
