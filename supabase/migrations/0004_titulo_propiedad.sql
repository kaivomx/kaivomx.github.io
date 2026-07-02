-- KAIVO: estatus legal de la propiedad (escriturada / en trámite / cesión de derechos)
-- Ejecutar en Supabase: SQL Editor → New query → pegar y correr

alter table properties add column if not exists titulo text not null default 'escriturada';
