-- KAIVO: permisos de Storage para el bucket 'property-images'
-- Ejecutar en Supabase: SQL Editor → New query → pegar y correr
-- Requiere haber creado antes el bucket "property-images" (público) en Storage.

create policy "authenticated can upload property images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'property-images');

create policy "authenticated can update property images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'property-images');

create policy "authenticated can delete property images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'property-images');

create policy "public can view property images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'property-images');
