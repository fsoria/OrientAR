import { useCallback, useEffect, useState } from 'react'
import { getActividades, getColegios } from '../lib/data'
import type { Actividad, Colegio } from '../types'

export function useActividades() {
  const [items, setItems] = useState<Actividad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setItems(await getActividades())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar las actividades')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return { items, loading, error, reload }
}

export function useColegios() {
  const [items, setItems] = useState<Colegio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setItems(await getColegios())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudieron cargar los colegios')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return { items, loading, error, reload }
}
