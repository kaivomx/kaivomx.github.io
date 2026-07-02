"use client";

import { useActionState, useState } from "react";
import { saveProperty } from "@/app/crm/actions/properties";
import type { PropertyRow } from "@/lib/crm-types";
import ImageUploader from "./ImageUploader";

export default function PropertyForm({ property, onDone }: { property?: PropertyRow; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(saveProperty, {});
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      action={(fd) => {
        setSubmitted(true);
        formAction(fd);
      }}
      className="max-w-2xl"
    >
      {property && <input type="hidden" name="id" value={property.id} />}

      <FormSection title="Datos generales">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Título" name="title" defaultValue={property?.title} required />
          <div>
            <label className="block text-xs text-black/60 mb-1">Tipo</label>
            <select name="type" defaultValue={property?.type ?? "casa"} className={inputClass}>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
            </select>
          </div>
          <Field label="Precio (MXN)" name="price" type="number" defaultValue={property?.price} required />
          <Field label="Ubicación" name="location" defaultValue={property?.location} required />
          <div>
            <label className="block text-xs text-black/60 mb-1">Estatus</label>
            <select name="status" defaultValue={property?.status ?? "disponible"} className={inputClass}>
              <option value="disponible">Disponible</option>
              <option value="apartado">Apartado</option>
              <option value="vendida">Vendida</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-black/60 mb-1">Título de propiedad</label>
            <select name="titulo" defaultValue={property?.titulo ?? "escriturada"} className={inputClass}>
              <option value="escriturada">Escriturada</option>
              <option value="en_tramite">En trámite</option>
              <option value="cesion_derechos">Cesión de derechos</option>
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title="Medidas">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="m² terreno" name="m2_terreno" type="number" defaultValue={property?.m2_terreno ?? ""} />
          <Field label="m² construcción" name="m2_construccion" type="number" defaultValue={property?.m2_construccion ?? ""} />
          <Field label="Recámaras" name="beds" type="number" defaultValue={property?.beds ?? ""} />
          <Field label="Baños" name="baths" type="number" defaultValue={property?.baths ?? ""} />
        </div>
      </FormSection>

      <FormSection title="Amenidades">
        <input name="amenities" defaultValue={property?.amenities?.join(", ")} placeholder="Alberca, jardín, cochera..." className={inputClass} />
        <p className="text-xs text-black/40 mt-1">Sepáralas con comas.</p>
      </FormSection>

      <FormSection title="Fotos">
        <div className="grid gap-4">
          <ImageUploader name="images" label="" defaultImages={property?.images} />
        </div>
      </FormSection>

      <FormSection title="Descripción">
        <textarea name="description" rows={4} defaultValue={property?.description ?? ""} className={inputClass} />
      </FormSection>

      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={pending} className="px-6 py-2 bg-ink text-white text-sm disabled:opacity-50">
          {pending ? "Guardando..." : "Guardar propiedad"}
        </button>
        <button type="button" onClick={onDone} className="px-6 py-2 border border-black/20 text-sm">Cancelar</button>
      </div>

      {submitted && !pending && !state.error && <p className="text-sm text-green-700 mt-3">Guardado.</p>}
    </form>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs tracking-widest text-black/40 mb-3">{title.toUpperCase()}</h3>
      {children}
    </div>
  );
}

const inputClass = "w-full border border-black/15 px-3 py-2 text-sm";

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs text-black/60 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        className={inputClass}
      />
    </div>
  );
}
