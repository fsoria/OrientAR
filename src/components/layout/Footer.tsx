import { Heart, Home, MapPinned, School, Sparkles } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/actividades', label: 'Actividades', icon: Sparkles },
  { to: '/colegios', label: 'Colegios', icon: School },
  { to: '/mapa', label: 'Mapa', icon: MapPinned },
  { to: '/favoritos', label: 'Favoritos', icon: Heart },
]

export function Footer() {
  return (
    <nav className="sticky bottom-0 z-40 border-t border-violet-200 bg-white/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                isActive ? 'text-violet-700' : 'text-stone-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
