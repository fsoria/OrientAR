import { useEffect, useState } from 'react'
import { SEED_ACTIVIDADES, SEED_COLEGIOS } from '../data/seed'
import { useActividades, useColegios } from '../hooks/useCatalog'
import {
  createActividad,
  createColegio,
  removeActividad,
  removeColegio,
  resetLocalSeed,
  upsertActividad,
} from '../lib/data'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Actividad, Colegio } from '../types'

const LOCAL_ADMIN_KEY = 'orientar:admin-local'

export function Admin() {
  const { items: actividades, reload: reloadActs } = useActividades()
  const { items: colegios, reload: reloadCols } = useColegios()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [localOk, setLocalOk] = useState(() => localStorage.getItem(LOCAL_ADMIN_KEY) === '1')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<'actividades' | 'colegios'>('actividades')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!supabase) return
    void supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user.email ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const loggedIn = Boolean(userEmail) || (!isSupabaseConfigured && localOk)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!isSupabaseConfigured || !supabase) {
      if (password === 'orientar-admin') {
        localStorage.setItem(LOCAL_ADMIN_KEY, '1')
        setLocalOk(true)
      } else {
        setError('Modo local: usá la clave orientar-admin')
      }
      return
    }
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) setError('No se pudo iniciar sesión. Revisá email/clave.')
  }

  const logout = async () => {
    if (supabase && userEmail) await supabase.auth.signOut()
    localStorage.removeItem(LOCAL_ADMIN_KEY)
    setLocalOk(false)
    setUserEmail(null)
  }

  const toggleDestacado = async (a: Actividad) => {
    setBusy(true)
    await upsertActividad({ ...a, destacado: !a.destacado })
    await reloadActs()
    setBusy(false)
  }

  const addDemoActividad = async () => {
    setBusy(true)
    const base = SEED_ACTIVIDADES[0]
    await createActividad({
      ...base,
      nombre: `Nueva actividad ${new Date().toLocaleTimeString('es-AR')}`,
      slug: `nueva-actividad-${Date.now()}`,
      destacado: false,
      creadoEn: new Date().toISOString(),
    })
    await reloadActs()
    setBusy(false)
  }

  const addDemoColegio = async () => {
    setBusy(true)
    const base = SEED_COLEGIOS[0]
    await createColegio({
      ...base,
      nombre: `Nuevo colegio ${new Date().toLocaleTimeString('es-AR')}`,
      slug: `nuevo-colegio-${Date.now()}`,
      creadoEn: new Date().toISOString(),
    })
    await reloadCols()
    setBusy(false)
  }

  const delAct = async (id: string) => {
    if (!confirm('¿Eliminar actividad?')) return
    setBusy(true)
    await removeActividad(id)
    await reloadActs()
    setBusy(false)
  }

  const delCol = async (id: string) => {
    if (!confirm('¿Eliminar colegio?')) return
    setBusy(true)
    await removeColegio(id)
    await reloadCols()
    setBusy(false)
  }

  if (!loggedIn) {
    return (
      <div className="px-5 py-8 text-left">
        <h1 className="text-xl font-bold text-stone-900">Admin OrientAR</h1>
        <p className="mt-2 text-xs text-stone-500">
          {isSupabaseConfigured
            ? 'Ingresá con tu usuario de Supabase Auth (email allowlisted como admin).'
            : 'Supabase no configurado: modo local de desarrollo.'}
        </p>
        <form onSubmit={login} className="mt-4 space-y-3 rounded-2xl border border-violet-100 bg-white p-4">
          {isSupabaseConfigured && (
            <label className="block text-xs font-semibold text-stone-600">
              Email
              <input
                className="mt-1 w-full rounded-xl border border-violet-200 px-3 py-2 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </label>
          )}
          <label className="block text-xs font-semibold text-stone-600">
            Contraseña
            <input
              className="mt-1 w-full rounded-xl border border-violet-200 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>
          {error && <p className="text-sm text-rose-500">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-4 px-5 py-4 pb-8 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-stone-900">ABM OrientAR</h1>
          <p className="text-xs text-stone-500">
            {userEmail ? `Sesión: ${userEmail}` : 'Modo local (sin Supabase)'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isSupabaseConfigured && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                resetLocalSeed()
                void reloadActs()
                void reloadCols()
              }}
            >
              Reset seed local
            </button>
          )}
          <button type="button" className="btn btn-secondary" onClick={() => void logout()}>
            Salir
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className={`btn ${tab === 'actividades' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('actividades')}
        >
          Actividades ({actividades.length})
        </button>
        <button
          type="button"
          className={`btn ${tab === 'colegios' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setTab('colegios')}
        >
          Colegios ({colegios.length})
        </button>
      </div>

      {tab === 'actividades' ? (
        <section className="space-y-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={busy}
            onClick={() => void addDemoActividad()}
          >
            + Nueva actividad
          </button>
          <div className="overflow-x-auto rounded-2xl border border-violet-100 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-violet-50 text-left">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Zona</th>
                  <th className="p-3">Dest.</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actividades.map((a) => (
                  <tr key={a.id} className="border-t border-violet-100">
                    <td className="p-3 font-medium">{a.nombre}</td>
                    <td className="p-3">{a.zona}</td>
                    <td className="p-3">{a.destacado ? 'Sí' : 'No'}</td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="text-left text-violet-700 underline"
                          disabled={busy}
                          onClick={() => void toggleDestacado(a)}
                        >
                          Toggle destacado
                        </button>
                        <button
                          type="button"
                          className="text-left text-rose-500 underline"
                          disabled={busy}
                          onClick={() => void delAct(a.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={busy}
            onClick={() => void addDemoColegio()}
          >
            + Nuevo colegio
          </button>
          <div className="overflow-x-auto rounded-2xl border border-violet-100 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-violet-50 text-left">
                <tr>
                  <th className="p-3">Nombre</th>
                  <th className="p-3">Gestión</th>
                  <th className="p-3">Zona</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {colegios.map((c: Colegio) => (
                  <tr key={c.id} className="border-t border-violet-100">
                    <td className="p-3 font-medium">{c.nombre}</td>
                    <td className="p-3 capitalize">{c.gestion}</td>
                    <td className="p-3">{c.zona}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        className="text-rose-500 underline"
                        disabled={busy}
                        onClick={() => void delCol(c.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}
