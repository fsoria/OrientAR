# OrientAR

Web app para padres y madres de **Salta**: encontrar actividades extracurriculares y colegios segun el perfil del hijo.

**Stack:** Vite + React 19 + TypeScript + Tailwind CSS 4 + Supabase + Leaflet (OSM).

## Arranque rapido (local)

Sin Supabase, la app usa datos seed locales de Salta (18 actividades + 15 colegios).

```bash
npm install
cp .env.example .env
npm run dev
```

## Supabase

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En **SQL Editor**, corre el contenido de `supabase/schema.sql`.
3. En Auth > Users, crea un usuario admin (email).
4. Copia `.env.example` a `.env` con URL + anon key (+ service role para seed).
5. Seed:

```bash
npm run seed
```

## Variables de entorno

| Variable | Descripcion |
|----------|-------------|
| `VITE_SUPABASE_URL` | URL del proyecto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave publica (anon) de Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo para script de seed (nunca en frontend) |

## Deploy

Desplegado en **Vercel**. Cada push a `main` dispara un deploy automatico.

Variables de entorno en Vercel: `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.

## Admin

- Con Supabase: login en `/admin` con el usuario Auth allowlisted.
- Sin Supabase: clave local `orientar-admin`.

## Rutas

- `/` — test del hijo + recomendaciones
- `/actividades` / `/actividades/:slug`
- `/colegios` / `/colegios/:slug`
- `/mapa` — pines + "cerca mio"
- `/favoritos` — localStorage
- `/admin` — ABM

## Scripts

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de produccion |
| `npm run preview` | Preview del build |
| `npm run seed` | Carga datos seed en Supabase |
| `npm run lint` | Lint con oxlint |

## Notas

- Perfil del hijo y favoritos viven en `localStorage` (sin cuenta).
- El motor de afinidad es por reglas (explicable), no ML.
