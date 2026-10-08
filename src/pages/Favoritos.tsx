import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActividadCard } from '../components/actividades/ActividadCard'
import { ColegioCard } from '../components/colegios/ColegioCard'
import { useFavoritos } from '../hooks/useFavoritos'
import { usePerfil } from '../hooks/usePerfil'
import { calcularAfinidad } from '../lib/affinity'
import { getActividades, getColegios } from '../lib/data'
import type { Actividad, Colegio } from '../types'

export function Favoritos() {
  const { favoritos } = useFavoritos()
  const { perfil } = usePerfil()
  const [actividades, setActividades] = useState<Actividad[]>([])
  const [colegios, setColegios] = useState<Colegio[]>([])

  useEffect(() => {
    void (async () => {
      setActividades(await getActividades())
      setColegios(await getColegios())
    })()
  }, [])

  const favActs = actividades.filter((a) =>
    favoritos.some((f) => f.tipo === 'actividad' && f.id === a.id),
  )
  const favCols = colegios.filter((c) =>
    favoritos.some((f) => f.tipo === 'colegio' && f.id === c.id),
  )

  return (
    <div className="space-y-4 px-5 py-4 pb-8">
      <div>
        <h1 className="text-lg font-bold text-stone-900">Favoritos</h1>
        <p className="text-xs text-stone-500">Guardados en este dispositivo</p>
      </div>

      {favoritos.length === 0 && (
        <div className="rounded-2xl border border-violet-100 bg-white p-5 text-center">
          <p className="text-sm text-stone-600">Todavía no guardaste nada</p>
          <Link to="/actividades" className="mt-3 inline-block text-xs font-semibold text-violet-700">
            Explorar actividades →
          </Link>
        </div>
      )}

      {favActs.map((a) => (
        <ActividadCard key={a.id} actividad={a} afinidad={calcularAfinidad(a, perfil)} />
      ))}
      {favCols.map((c) => (
        <ColegioCard key={c.id} colegio={c} />
      ))}
    </div>
  )
}
