"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/content";
import type { ProjectRow } from "@/lib/crm-types";
import ProjectForm from "./ProjectForm";
import { deleteProject } from "@/app/crm/actions/projects";

export default function ProjectManager({ projects }: { projects: ProjectRow[] }) {
  const [editing, setEditing] = useState<ProjectRow | "new" | null>(null);

  if (editing) {
    return (
      <ProjectForm
        project={editing === "new" ? undefined : editing}
        onDone={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <button onClick={() => setEditing("new")} className="mb-6 px-6 py-2 bg-ink text-white text-sm">
        + Agregar proyecto
      </button>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-white border border-black/10 p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-black/50">{p.developer} · Desde {formatPrice(p.price_from)}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(p)} className="text-sm underline">Editar</button>
              <button
                onClick={() => {
                  if (confirm(`¿Eliminar "${p.name}"?`)) deleteProject(p.id);
                }}
                className="text-sm text-red-600 underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-black/40">Aún no hay proyectos.</p>}
      </div>
    </div>
  );
}
