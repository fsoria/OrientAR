/**
 * Carga seed ficticio de Salta en Supabase.
 *
 * 1. Creá un proyecto en https://supabase.com
 * 2. Corré supabase/schema.sql en el SQL Editor
 * 3. Copiá .env.example → .env con URL + anon key
 * 4. npm run seed
 *
 * Sin Supabase, la app ya usa src/data/seed.ts en local.
 */
import { createClient } from '@supabase/supabase-js'
import { SEED_ACTIVIDADES, SEED_COLEGIOS } from '../src/data/seed'
import { actividadToRow, colegioToRow } from '../src/lib/mappers'

const url = process.env.VITE_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

async function main() {
  if (!url || !key) {
    console.log('Supabase no configurado.')
    console.log(
      `Seed local disponible: ${SEED_ACTIVIDADES.length} actividades, ${SEED_COLEGIOS.length} colegios.`,
    )
    console.log('Completá .env y volvé a correr, o usá la app en modo local.')
    return
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn(
      'Aviso: sin SUPABASE_SERVICE_ROLE_KEY el seed puede fallar por RLS. Preferí service role solo en scripts.',
    )
  }

  const supabase = createClient(url, key)

  const { error: actErr } = await supabase
    .from('actividades')
    .upsert(SEED_ACTIVIDADES.map(actividadToRow))
  if (actErr) throw actErr
  console.log(`actividades: ${SEED_ACTIVIDADES.length}`)

  const { error: colErr } = await supabase
    .from('colegios')
    .upsert(SEED_COLEGIOS.map(colegioToRow))
  if (colErr) throw colErr
  console.log(`colegios: ${SEED_COLEGIOS.length}`)

  console.log('Seed completo en Supabase.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
