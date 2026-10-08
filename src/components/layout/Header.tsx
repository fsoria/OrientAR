import { Heart, MapPinned, School, Sparkles } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { usePerfil } from '../../hooks/usePerfil'

const links = [
  { to: '/actividades', label: 'Actividades', icon: Sparkles },
  { to: '/colegios', label: 'Colegios', icon: School },
  { to: '/mapa', label: 'Mapa', icon: MapPinned },
  { to: '/favoritos', label: 'Favoritos', icon: Heart },
]

export function Header() {
  const { perfil } = usePerfil()
  const { pathname } = useLocation()
  const hideProfileCard = pathname.startsWith('/admin') || pathname === '/'

  const initial = perfil?.nombre?.trim()?.charAt(0)?.toUpperCase() || '?'
  const intereses = perfil?.intereses?.slice(0, 3).join(' · ') || 'Sin intereses aún'

  return (
    <header className="sticky top-0 z-40">
      <div className="flex items-center justify-between bg-violet-950 px-5 py-1.5 text-xs text-violet-200">
        <span className="font-mono">OrientAR</span>
        <span className="tracking-widest font-semibold">salta</span>
        <span className="font-mono">{perfil ? 'OK' : '—'}</span>
      </div>

      {!hideProfileCard && (
        <div className="bg-gradient-to-br from-violet-600 to-rose-500 px-5 pb-4 pt-4 text-white">
          <div className="mb-2 flex items-center gap-1.5 text-xs text-violet-100">
            <Sparkles size={13} />
            {perfil ? 'Recomendado para' : 'Empezá por el perfil'}
          </div>

          <NavLink
            to="/"
            className="flex w-full items-center gap-3 rounded-2xl bg-white/15 px-3 py-2.5 transition hover:bg-white/25"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-violet-700">
              {initial}
            </div>
            <div className="min-w-0 text-left">
              {perfil ? (
                <>
                  <p className="leading-tight font-bold">
                    {perfil.nombre} · {perfil.edad} años
                  </p>
                  <p className="truncate text-xs text-violet-100">{intereses}</p>
                </>
              ) : (
                <>
                  <p className="leading-tight font-bold">Armá el perfil del hijo</p>
                  <p className="truncate text-xs text-violet-100">
                    Para ver % de afinidad real
                  </p>
                </>
              )}
            </div>
            <span className="ml-auto whitespace-nowrap rounded-full bg-white/20 px-2 py-1 text-xs">
              {perfil ? 'Editar' : 'Crear'}
            </span>
          </NavLink>
        </div>
      )}

      <nav className="grid grid-cols-4 gap-1 bg-violet-50 px-3 py-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-semibold transition ${
                isActive
                  ? 'bg-violet-700 text-white'
                  : 'bg-white text-violet-700 border border-violet-200'
              }`
            }
          >
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
