import { ZONAS } from '../../data/seed'
import type { Gestion, NivelEducativo, ZonaSalta } from '../../types'

export interface FiltrosColegioState {
  q: string
  gestion: Gestion | ''
  nivel: NivelEducativo | ''
  zona: ZonaSalta | ''
  orientacion: string
}

const field =
  'mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-900'

export function FiltrosColegios({
  value,
  onChange,
}: {
  value: FiltrosColegioState
  onChange: (next: FiltrosColegioState) => void
}) {
  const set = <K extends keyof FiltrosColegioState>(key: K, v: FiltrosColegioState[K]) =>
    onChange({ ...value, [key]: v })

  return (
    <div className="card-soft grid gap-3 p-3.5 md:grid-cols-2">
      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500 md:col-span-2">
        Buscar
        <input
          className={field}
          placeholder="Nombre, orientación, servicio..."
          value={value.q}
          onChange={(e) => set('q', e.target.value)}
        />
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Gestión
        <select
          className={field}
          value={value.gestion}
          onChange={(e) => set('gestion', e.target.value as Gestion | '')}
        >
          <option value="">Todas</option>
          <option value="estatal">Estatal</option>
          <option value="privada">Privada</option>
        </select>
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500">
        Nivel
        <select
          className={field}
          value={value.nivel}
          onChange={(e) => set('nivel', e.target.value as NivelEducativo | '')}
        >
          <option value="">Todos</option>
          <option value="inicial">Inicial</option>
          <option value="primario">Primario</option>
          <option value="secundario">Secundario</option>
        </select>
      </label>

      <label className="block text-left text-[11px] font-semibold uppercase tracking-wide text-stone-500 md:col-span-2">
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
    </div>
  )
}
