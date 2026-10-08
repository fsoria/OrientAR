import { ZONAS } from '../../data/seed'
import type { Categoria, Modalidad, PrecioNivel, ZonaSalta } from '../../types'

export interface FiltrosActividadState {
  q: string
  categoria: Categoria | ''
  zona: ZonaSalta | ''
  edad: string
  precio: PrecioNivel | ''
  modalidad: Modalidad | ''
}

const categorias: Categoria[] = [
  'Deporte',
  'Arte',
  'Idiomas',
  'Ciencia',
  'Música',
  'Tecnología',
  'Danza',
]

const field =
  'mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900'

export function FiltrosActividades({
  value,
  onChange,
}: {
  value: FiltrosActividadState
  onChange: (next: FiltrosActividadState) => void
}) {
  const set = <K extends keyof FiltrosActividadState>(key: K, v: FiltrosActividadState[K]) =>
    onChange({ ...value, [key]: v })

  return (
    <div className="card-soft grid gap-3 p-3.5 md:grid-cols-3">
      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500 md:col-span-3">
        Buscar
        <input
          className={field}
          placeholder="Ej: inglés, fútbol, robótica..."
          value={value.q}
          onChange={(e) => set('q', e.target.value)}
        />
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Categoría
        <select
          className={field}
          value={value.categoria}
          onChange={(e) => set('categoria', e.target.value as Categoria | '')}
        >
          <option value="">Todas</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Zona
        <select
          className={field}
          value={value.zona}
          onChange={(e) => set('zona', e.target.value as ZonaSalta | '')}
        >
          <option value="">Todas</option>
          {ZONAS.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Edad
        <input
          type="number"
          min={1}
          max={18}
          className={field}
          placeholder="Años"
          value={value.edad}
          onChange={(e) => set('edad', e.target.value)}
        />
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Precio
        <select
          className={field}
          value={value.precio}
          onChange={(e) => set('precio', e.target.value as PrecioNivel | '')}
        >
          <option value="">Todos</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Modalidad
        <select
          className={field}
          value={value.modalidad}
          onChange={(e) => set('modalidad', e.target.value as Modalidad | '')}
        >
          <option value="">Todas</option>
          <option value="solo">Individual</option>
          <option value="equipo">Equipo</option>
          <option value="ambas">Ambas</option>
        </select>
      </label>
    </div>
  )
}
