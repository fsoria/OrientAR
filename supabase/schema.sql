-- OrientAR · schema + RLS (correr en SQL Editor de Supabase)

create extension if not exists "pgcrypto";

create table if not exists public.actividades (
  id text primary key,
  nombre text not null,
  slug text not null unique,
  categoria text not null,
  subcategoria text not null default '',
  descripcion text not null default '',
  lat double precision not null,
  lng double precision not null,
  zona text not null,
  direccion text not null default '',
  rango_edad jsonb not null default '{"min":1,"max":18}',
  precio_nivel text not null default '$$',
  modalidad text not null default 'ambas',
  energia text not null default 'activa',
  rating numeric not null default 0,
  cant_resenas integer not null default 0,
  contacto jsonb not null default '{}',
  imagenes jsonb not null default '[]',
  tags jsonb not null default '[]',
  destacado boolean not null default false,
  estado text not null default 'activo',
  creado_en timestamptz not null default now()
);

create table if not exists public.colegios (
  id text primary key,
  nombre text not null,
  slug text not null unique,
  gestion text not null,
  niveles jsonb not null default '[]',
  orientacion jsonb not null default '[]',
  turnos jsonb not null default '[]',
  lat double precision not null,
  lng double precision not null,
  zona text not null,
  direccion text not null default '',
  contacto jsonb not null default '{}',
  cuota_rango jsonb,
  servicios jsonb not null default '[]',
  rating numeric not null default 0,
  imagenes jsonb not null default '[]',
  estado text not null default 'activo',
  destacado boolean not null default false,
  creado_en timestamptz not null default now()
);

create index if not exists actividades_estado_idx on public.actividades (estado);
create index if not exists actividades_slug_idx on public.actividades (slug);
create index if not exists colegios_estado_idx on public.colegios (estado);
create index if not exists colegios_slug_idx on public.colegios (slug);

-- Admin = usuario autenticado con email en la allowlist
-- Cambiá el email por el tuyo antes de usar en producción.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(
    (auth.jwt() ->> 'email') = 'fersoria02@gmail.com',
    false
  );
$$;

alter table public.actividades enable row level security;
alter table public.colegios enable row level security;

drop policy if exists "actividades_public_read" on public.actividades;
create policy "actividades_public_read"
  on public.actividades for select
  using (estado = 'activo' or public.is_admin());

drop policy if exists "actividades_admin_write" on public.actividades;
create policy "actividades_admin_write"
  on public.actividades for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "colegios_public_read" on public.colegios;
create policy "colegios_public_read"
  on public.colegios for select
  using (estado = 'activo' or public.is_admin());

drop policy if exists "colegios_admin_write" on public.colegios;
create policy "colegios_admin_write"
  on public.colegios for all
  using (public.is_admin())
  with check (public.is_admin());
