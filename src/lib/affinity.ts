import type { Actividad, MotivoAfinidad, PerfilHijo, ResultadoAfinidad } from '../types'

const PESOS = {
  interes: 45,
  modalidad: 20,
  energia: 20,
  cercania: 15,
} as const

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function calcularAfinidad(
  actividad: Actividad,
  perfil: PerfilHijo | null,
  userLocation?: { lat: number; lng: number } | null,
): ResultadoAfinidad {
  if (!perfil) {
    return { score: 0, motivos: [] }
  }

  if (perfil.edad < actividad.rangoEdad.min || perfil.edad > actividad.rangoEdad.max) {
    return {
      score: 0,
      motivos: [],
      excluido: true,
      razonExclusion: `Edad fuera de rango (${actividad.rangoEdad.min}–${actividad.rangoEdad.max} años)`,
    }
  }

  const motivos: MotivoAfinidad[] = []
  let puntos = 0
  let max = PESOS.interes + PESOS.modalidad + PESOS.energia

  const matchInteres = perfil.intereses.some(
    (i) =>
      i.toLowerCase() === actividad.categoria.toLowerCase() ||
      actividad.tags.some((t) => t.toLowerCase().includes(i.toLowerCase())) ||
      actividad.subcategoria.toLowerCase().includes(i.toLowerCase()),
  )

  if (matchInteres) {
    puntos += PESOS.interes
    motivos.push({ label: `Coincide con su interés en ${actividad.categoria}`, peso: PESOS.interes })
  }

  const modalidadOk =
    perfil.modalidad === 'ambas' ||
    actividad.modalidad === 'ambas' ||
    perfil.modalidad === actividad.modalidad

  if (modalidadOk) {
    puntos += PESOS.modalidad
    motivos.push({
      label:
        actividad.modalidad === 'equipo'
          ? 'Se trabaja en equipo'
          : actividad.modalidad === 'solo'
            ? 'Modalidad individual'
            : 'Admite ambas modalidades',
      peso: PESOS.modalidad,
    })
  }

  if (perfil.energia === actividad.energia) {
    puntos += PESOS.energia
    motivos.push({
      label: actividad.energia === 'activa' ? 'Energía activa' : 'Ritmo más tranquilo',
      peso: PESOS.energia,
    })
  }

  if (userLocation) {
    max += PESOS.cercania
    const km = haversineKm(userLocation, { lat: actividad.lat, lng: actividad.lng })
    if (km <= 3) {
      puntos += PESOS.cercania
      motivos.push({ label: `Muy cerca (${km.toFixed(1)} km)`, peso: PESOS.cercania })
    } else if (km <= 8) {
      const parcial = Math.round(PESOS.cercania * 0.6)
      puntos += parcial
      motivos.push({ label: `Cerca (${km.toFixed(1)} km)`, peso: parcial })
    }
  }

  motivos.push({
    label: `Edad ${perfil.edad} dentro del rango`,
    peso: 0,
  })

  const score = Math.round((puntos / max) * 100)
  return { score, motivos: motivos.sort((a, b) => b.peso - a.peso) }
}

export function ordenarPorAfinidad<T extends Actividad>(
  items: T[],
  perfil: PerfilHijo | null,
  userLocation?: { lat: number; lng: number } | null,
): Array<T & { afinidad: ResultadoAfinidad }> {
  const mapped = items.map((item) => ({
    ...item,
    afinidad: calcularAfinidad(item, perfil, userLocation),
  }))

  return mapped.sort((a, b) => {
    if (a.afinidad.excluido && !b.afinidad.excluido) return 1
    if (!a.afinidad.excluido && b.afinidad.excluido) return -1
    if (b.afinidad.score !== a.afinidad.score) return b.afinidad.score - a.afinidad.score
    if (a.destacado !== b.destacado) return a.destacado ? -1 : 1
    return b.rating - a.rating
  })
}
