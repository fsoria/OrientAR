import L from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'
import type { Actividad, Colegio } from '../../types'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const schoolIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

type Pin =
  | { tipo: 'actividad'; item: Actividad }
  | { tipo: 'colegio'; item: Colegio }

function FlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap()
  useEffect(() => {
    if (center) map.flyTo(center, 14, { duration: 0.8 })
  }, [center, map])
  return null
}

export function MapaView({
  actividades = [],
  colegios = [],
  height = '420px',
  showNearMe = true,
  categoriaFilter = '',
}: {
  actividades?: Actividad[]
  colegios?: Colegio[]
  height?: string
  showNearMe?: boolean
  categoriaFilter?: string
}) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null)
  const [geoError, setGeoError] = useState<string | null>(null)

  const pins: Pin[] = useMemo(() => {
    const acts = actividades
      .filter((a) => !categoriaFilter || a.categoria === categoriaFilter)
      .map((item) => ({ tipo: 'actividad' as const, item }))
    const cols = colegios.map((item) => ({ tipo: 'colegio' as const, item }))
    return [...acts, ...cols]
  }, [actividades, colegios, categoriaFilter])

  const nearMe = () => {
    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoError(null)
        setUserPos([pos.coords.latitude, pos.coords.longitude])
      },
      () => setGeoError('No pudimos obtener tu ubicación. Revisá los permisos.'),
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  return (
    <div className="space-y-3">
      {showNearMe && (
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-secondary text-sm" onClick={nearMe}>
            Cerca mío
          </button>
          {geoError && <p className="text-sm text-rose-500">{geoError}</p>}
        </div>
      )}

      <div style={{ height }} className="overflow-hidden rounded-2xl border border-violet-100">
        <MapContainer center={[-24.7859, -65.4117]} zoom={12} scrollWheelZoom className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyTo center={userPos} />
          {userPos && (
            <Marker position={userPos} icon={markerIcon}>
              <Popup>Estás acá</Popup>
            </Marker>
          )}
          {pins.map((pin) => (
            <Marker
              key={`${pin.tipo}-${pin.item.id}`}
              position={[pin.item.lat, pin.item.lng]}
              icon={pin.tipo === 'colegio' ? schoolIcon : markerIcon}
            >
              <Popup>
                <div className="min-w-[160px] text-sm">
                  <strong>{pin.item.nombre}</strong>
                  <div className="mt-1 text-xs opacity-80">{pin.item.zona}</div>
                  <Link
                    className="mt-2 inline-block font-semibold text-violet-700"
                    to={
                      pin.tipo === 'actividad'
                        ? `/actividades/${pin.item.slug}`
                        : `/colegios/${pin.item.slug}`
                    }
                  >
                    Ver ficha →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
