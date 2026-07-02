-- KAIVO: CRM — pipeline de leads y permisos para usuarios autenticados
-- Ejecutar en Supabase: SQL Editor → New query → pegar y correr

alter table leads add column if not exists estado text not null default 'nuevo';
alter table leads add column if not exists notas jsonb not null default '[]';
alter table leads add column if not exists proxima_actividad text;

-- Usuarios autenticados (el equipo KAIVO) pueden ver y actualizar leads.
create policy "authenticated can select leads"
  on leads for select
  to authenticated
  using (true);

create policy "authenticated can update leads"
  on leads for update
  to authenticated
  using (true)
  with check (true);

-- Propiedades y proyectos: lectura pública (para el sitio), escritura solo para el equipo.
create policy "public can select properties"
  on properties for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage properties"
  on properties for all
  to authenticated
  using (true)
  with check (true);

create policy "public can select projects"
  on projects for select
  to anon, authenticated
  using (true);

create policy "authenticated can manage projects"
  on projects for all
  to authenticated
  using (true)
  with check (true);

alter table properties add column if not exists images jsonb not null default '[]';
alter table projects add column if not exists image text;
