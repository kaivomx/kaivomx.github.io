"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/content";
import type { PropertyRow } from "@/lib/crm-types";
import PropertyForm from "./PropertyForm";
import { deleteProperty } from "@/app/crm/actions/properties";

export default function PropertyManager({ properties }: { properties: PropertyRow[] }) {
  const [editing, setEditing] = useState<PropertyRow | "new" | null>(null);

  if (editing) {
    return (
      <PropertyForm
        property={editing === "new" ? undefined : editing}
        onDone={() => setEditing(null)}
      />
    );
  }

  return (
    <div>
      <button onClick={() => setEditing("new")} className="mb-6 px-6 py-2 bg-ink text-white text-sm">
        + Agregar propiedad
      </button>

      <div className="grid gap-4">
        {properties.map((p) => (
          <div key={p.id} className="bg-white border border-black/10 p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.title}</p>
              <p className="text-xs text-black/50">{p.location} · {formatPrice(p.price)} · {p.status}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(p)} className="text-sm underline">Editar</button>
              <button
                onClick={() => {
                  if (confirm(`¿Eliminar "${p.title}"?`)) deleteProperty(p.id);
                }}
                className="text-sm text-red-600 underline"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {properties.length === 0 && <p className="text-sm text-black/40">Aún no hay propiedades.</p>}
      </div>
    </div>
  );
}
