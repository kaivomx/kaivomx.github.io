-- KAIVO: esquema inicial (Fase 1 — sitio público)
-- Ejecutar en Supabase: SQL Editor → New query → pegar y correr

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  telefono text not null,
  email text not null,
  ciudad text not null,
  interes text not null,
  proyecto text,
  propiedad text,
  presupuesto text not null,
  forma_pago text not null,
  mensaje text,
  fuente text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- Permite que el sitio público inserte leads (vía anon key), pero no leer/editar/borrar.
create policy "public can insert leads"
  on leads for insert
  to anon
  with check (true);

-- Reservado para fases futuras (CRM): propiedades y proyectos administrables desde el panel admin.
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type text not null,
  price numeric not null,
  location text not null,
  m2_terreno numeric,
  m2_construccion numeric,
  beds numeric,
  baths numeric,
  amenities jsonb default '[]',
  description text,
  ai_description text,
  status text not null default 'disponible',
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  developer text not null,
  price_from numeric not null,
  delivery_date text,
  m2 text,
  units integer,
  description text,
  created_at timestamptz not null default now()
);
