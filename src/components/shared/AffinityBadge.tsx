import type { ResultadoAfinidad } from '../../types'

export function AffinityBadge({
  afinidad,
  compact = false,
}: {
  afinidad?: ResultadoAfinidad
  compact?: boolean
}) {
  if (!afinidad || (!afinidad.score && !afinidad.excluido)) return null

  if (afinidad.excluido) {
    return (
      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-semibold text-stone-500">
        No aplica por edad
      </span>
    )
  }

  const tone =
    afinidad.score >= 75
      ? 'bg-green-100 text-green-800'
      : afinidad.score >= 50
        ? 'bg-amber-100 text-amber-800'
        : 'bg-stone-100 text-stone-700'

  return (
    <div className="space-y-1">
      <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>
        {afinidad.score}% afinidad
      </span>
      {!compact && afinidad.motivos.length > 0 && (
        <ul className="space-y-0.5 text-left text-[11px] text-stone-500">
          {afinidad.motivos.slice(0, 3).map((m) => (
            <li key={m.label}>· {m.label}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
