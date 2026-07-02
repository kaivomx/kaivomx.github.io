"use client";

import { useActionState, useState } from "react";
import { saveProject } from "@/app/crm/actions/projects";
import type { ProjectRow } from "@/lib/crm-types";
import ImageUploader from "./ImageUploader";

export default function ProjectForm({ project, onDone }: { project?: ProjectRow; onDone: () => void }) {
  const [state, formAction, pending] = useActionState(saveProject, {});
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      action={(fd) => {
        setSubmitted(true);
        formAction(fd);
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {project && <input type="hidden" name="id" value={project.id} />}

      <Field label="Nombre" name="name" defaultValue={project?.name} required />
      <Field label="Desarrolladora" name="developer" defaultValue={project?.developer} required />
      <Field label="Precio desde (MXN)" name="price_from" type="number" defaultValue={project?.price_from} required />
      <Field label="Entrega" name="delivery_date" defaultValue={project?.delivery_date ?? ""} />
      <Field label="Metraje (ej. 45 - 95 m²)" name="m2" defaultValue={project?.m2 ?? ""} />
      <Field label="Unidades" name="units" type="number" defaultValue={project?.units ?? ""} />
      <ImageUploader
        name="image"
        label="Imagen"
        defaultImages={project?.image ? [project.image] : []}
        multiple={false}
      />

      <div className="sm:col-span-2">
        <label className="block text-xs text-black/60 mb-1">Descripción</label>
        <textarea name="description" rows={4} defaultValue={project?.description ?? ""} className={inputClass} />
      </div>

      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" disabled={pending} className="px-6 py-2 bg-ink text-white text-sm disabled:opacity-50">
          {pending ? "Guardando..." : "Guardar proyecto"}
        </button>
        <button type="button" onClick={onDone} className="px-6 py-2 border border-black/20 text-sm">Cancelar</button>
      </div>

      {submitted && !pending && !state.error && <p className="sm:col-span-2 text-sm text-green-700">Guardado.</p>}
    </form>
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
