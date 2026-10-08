import { Check, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePerfil } from '../../hooks/usePerfil'
import type { Energia, Modalidad } from '../../types'

const INTERESES = [
  'Deporte',
  'Arte',
  'Música',
  'Idiomas',
  'Ciencia',
  'Tecnología',
  'Danza',
]

const empty = {
  nombre: '',
  edad: 9,
  intereses: [] as string[],
  modalidad: 'ambas' as Modalidad,
  energia: 'activa' as Energia,
}

export function TestHijo({ embedded = false }: { embedded?: boolean }) {
  const { perfil, save } = usePerfil()
  const navigate = useNavigate()
  const [form, setForm] = useState(() => perfil ?? empty)

  const toggle = (interes: string) => {
    setForm((f) => ({
      ...f,
      intereses: f.intereses.includes(interes)
        ? f.intereses.filter((i) => i !== interes)
        : [...f.intereses, interes],
    }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nombre.trim() || form.intereses.length === 0) return
    save({
      ...form,
      nombre: form.nombre.trim(),
      edad: Number(form.edad),
    })
    navigate('/actividades')
  }

  const modalidadLabel =
    form.modalidad === 'solo' ? 'Solo' : form.modalidad === 'equipo' ? 'En equipo' : 'Las dos'
  const energiaLabel = form.energia === 'activa' ? 'Activa' : 'Tranquila'

  return (
    <section id="test" className={embedded ? '' : 'scroll-mt-24'}>
      <div className="bg-gradient-to-br from-violet-600 to-rose-500 px-5 pb-6 pt-4 text-white">
        <p className="text-xs text-violet-100">Configurá una vez</p>
        <h1 className="text-2xl font-extrabold leading-tight">
          Contanos sobre
          <br />
          tu hijo
        </h1>
        <p className="mt-1 text-sm text-violet-100">
          Con esto le recomendamos actividades que de verdad le van.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 px-5 py-4">
        <Campo l="Nombre y edad">
          <div className="flex gap-2">
            <input
              required
              className="flex-1 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-stone-700"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <input
              required
              type="number"
              min={1}
              max={18}
              className="w-24 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-stone-700"
              value={form.edad}
              onChange={(e) => setForm({ ...form, edad: Number(e.target.value) })}
            />
          </div>
        </Campo>

        <Campo l="¿Qué le gusta?">
          <div className="flex flex-wrap gap-2">
            {INTERESES.map((i) => {
              const on = form.intereses.includes(i)
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    on
                      ? 'border-violet-700 bg-violet-700 text-white'
                      : 'border-violet-200 bg-white text-stone-600'
                  }`}
                >
                  {on && <Check size={12} />}
                  {i}
                </button>
              )
            })}
          </div>
        </Campo>

        <Campo l="¿Cómo le gusta jugar?">
          <Segment
            ops={['Solo', 'En equipo', 'Las dos']}
            val={modalidadLabel}
            set={(v) =>
              setForm({
                ...form,
                modalidad: v === 'Solo' ? 'solo' : v === 'En equipo' ? 'equipo' : 'ambas',
              })
            }
          />
        </Campo>

        <Campo l="Energía">
          <Segment
            ops={['Tranquila', 'Activa']}
            val={energiaLabel}
            set={(v) =>
              setForm({
                ...form,
                energia: v === 'Activa' ? 'activa' : 'tranquila',
              })
            }
          />
        </Campo>

        <button type="submit" className="btn-gradient flex w-full items-center justify-center gap-2">
          <Sparkles size={17} /> Ver recomendaciones
        </button>
      </form>
    </section>
  )
}

function Campo({ l, children }: { l: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="section-label mb-2">{l}</p>
      {children}
    </div>
  )
}

function Segment({
  ops,
  val,
  set,
}: {
  ops: string[]
  val: string
  set: (v: string) => void
}) {
  return (
    <div
      className="grid gap-1 rounded-xl bg-violet-100 p-1"
      style={{ gridTemplateColumns: `repeat(${ops.length}, minmax(0, 1fr))` }}
    >
      {ops.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => set(o)}
          className={`rounded-lg py-2 text-xs font-semibold transition ${
            val === o ? 'bg-white text-violet-700 shadow-sm' : 'text-violet-500'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
