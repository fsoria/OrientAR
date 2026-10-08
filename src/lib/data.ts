import { SEED_ACTIVIDADES, SEED_COLEGIOS } from '../data/seed'
import type { Actividad, Colegio } from '../types'
import { actividadToRow, colegioToRow, rowToActividad, rowToColegio } from './mappers'
import { isSupabaseConfigured, supabase } from './supabase'

const LOCAL_ACT_KEY = 'orientar:local-actividades'
const LOCAL_COL_KEY = 'orientar:local-colegios'

function readLocal<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T[]
  } catch {
    return fallback
  }
}

function writeLocal<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value))
}

export async function getActividades(): Promise<Actividad[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('actividades')
      .select('*')
      .eq('estado', 'activo')
    if (!error && data && data.length > 0) {
      return data.map((row) => rowToActividad(row as Record<string, unknown>))
    }
  }
  return readLocal(LOCAL_ACT_KEY, SEED_ACTIVIDADES).filter((a) => a.estado === 'activo')
}

export async function getColegios(): Promise<Colegio[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('colegios')
      .select('*')
      .eq('estado', 'activo')
    if (!error && data && data.length > 0) {
      return data.map((row) => rowToColegio(row as Record<string, unknown>))
    }
  }
  return readLocal(LOCAL_COL_KEY, SEED_COLEGIOS).filter((c) => c.estado === 'activo')
}

export async function getActividadBySlug(slug: string) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('actividades')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (!error && data) return rowToActividad(data as Record<string, unknown>)
  }
  const all = await getActividades()
  return all.find((a) => a.slug === slug) ?? null
}

export async function getColegioBySlug(slug: string) {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('colegios')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (!error && data) return rowToColegio(data as Record<string, unknown>)
  }
  const all = await getColegios()
  return all.find((c) => c.slug === slug) ?? null
}

export async function upsertActividad(actividad: Actividad) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('actividades').upsert(actividadToRow(actividad))
    if (error) throw error
    return
  }
  const list = readLocal(LOCAL_ACT_KEY, SEED_ACTIVIDADES)
  const idx = list.findIndex((a) => a.id === actividad.id)
  if (idx >= 0) list[idx] = actividad
  else list.push(actividad)
  writeLocal(LOCAL_ACT_KEY, list)
}

export async function upsertColegio(colegio: Colegio) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('colegios').upsert(colegioToRow(colegio))
    if (error) throw error
    return
  }
  const list = readLocal(LOCAL_COL_KEY, SEED_COLEGIOS)
  const idx = list.findIndex((c) => c.id === colegio.id)
  if (idx >= 0) list[idx] = colegio
  else list.push(colegio)
  writeLocal(LOCAL_COL_KEY, list)
}

export async function removeActividad(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('actividades').delete().eq('id', id)
    if (error) throw error
    return
  }
  writeLocal(
    LOCAL_ACT_KEY,
    readLocal(LOCAL_ACT_KEY, SEED_ACTIVIDADES).filter((a) => a.id !== id),
  )
}

export async function removeColegio(id: string) {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('colegios').delete().eq('id', id)
    if (error) throw error
    return
  }
  writeLocal(
    LOCAL_COL_KEY,
    readLocal(LOCAL_COL_KEY, SEED_COLEGIOS).filter((c) => c.id !== id),
  )
}

export async function createActividad(data: Omit<Actividad, 'id'>) {
  const id = `act-${crypto.randomUUID().slice(0, 8)}`
  await upsertActividad({ ...data, id })
  return id
}

export async function createColegio(data: Omit<Colegio, 'id'>) {
  const id = `col-${crypto.randomUUID().slice(0, 8)}`
  await upsertColegio({ ...data, id })
  return id
}

export function resetLocalSeed() {
  writeLocal(LOCAL_ACT_KEY, SEED_ACTIVIDADES)
  writeLocal(LOCAL_COL_KEY, SEED_COLEGIOS)
}
