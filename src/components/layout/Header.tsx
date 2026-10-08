import { Sparkles } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { usePerfil } from '../../hooks/usePerfil'

export function Header() {
  const { perfil } = usePerfil()
  const { pathname } = useLocation()
  const hideProfileCard = pathname.startsWith('/admin') || pathname === '/'

  const initial = perfil?.nombre?.trim()?.charAt(0)?.toUpperCase() || '?'
  const intereses = perfil?.intereses?.slice(0, 3).join(' · ') || 'Sin intereses aun'

  return (
    <header className="sticky top-0 z-40">
      <div className="flex items-center justify-between bg-violet-950 px-4 py-2 text-xs text-violet-200">
        <NavLink to="/" className="text-sm font-bold tracking-tight text-white">
          Orient<span className="text-rose-400">AR</span>
        </NavLink>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-violet-400">
          Salta
        </span>
      </div>

      {!hideProfileCard && perfil && (
        <NavLink
          to="/"
          className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-rose-500 px-4 py-3 text-white transition hover:brightness-110"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-violet-700">
            {initial}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm leading-tight font-semibold">
              {perfil.nombre}, {perfil.edad} anos
            </p>
            <p className="truncate text-[11px] text-violet-100">{intereses}</p>
          </div>
          <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
            Editar
          </span>
        </NavLink>
      )}

      {!hideProfileCard && !perfil && (
        <NavLink
          to="/"
          className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-rose-500 px-4 py-3 text-white"
        >
          <Sparkles size={14} />
          <span className="text-sm font-semibold">Arma el perfil de tu hijo</span>
          <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
            Crear
          </span>
        </NavLink>
      )}
    </header>
  )
}
