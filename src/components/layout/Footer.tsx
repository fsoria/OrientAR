import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-violet-100 bg-violet-50 px-5 py-3 text-center">
      <p className="text-xs font-semibold text-violet-800">
        Orient<span className="text-rose-500">AR</span> · Salta
      </p>
      <div className="mt-1 flex justify-center gap-3 text-[11px] text-stone-400">
        <Link to="/admin">Admin</Link>
        <span>·</span>
        <span>Datos de ejemplo</span>
      </div>
    </footer>
  )
}
