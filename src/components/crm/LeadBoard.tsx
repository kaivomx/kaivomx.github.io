"use client";

import { useState, useTransition } from "react";
import { PIPELINE_STAGES, STAGE_LABELS, type LeadRow } from "@/lib/crm-types";
import { updateLeadStage, addLeadNote } from "@/app/crm/actions/leads";
import { budgetRanges } from "@/lib/content";

const BUDGET_LABELS = Object.fromEntries(budgetRanges.map((b) => [b.value, b.label]));

export default function LeadBoard({ leads }: { leads: LeadRow[] }) {
  const [selected, setSelected] = useState<LeadRow | null>(null);
  const [query, setQuery] = useState("");

  const filtered = leads.filter((l) =>
    `${l.nombre} ${l.telefono} ${l.email}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por nombre, teléfono o correo..."
        className="w-full sm:w-80 border border-black/15 px-3 py-2 text-sm mb-6"
      />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const items = filtered.filter((l) => l.estado === stage);
          return (
            <div key={stage} className="min-w-[260px] w-[260px] flex-shrink-0">
              <p className="text-xs tracking-wide text-black/50 mb-2">
                {STAGE_LABELS[stage]} · {items.length}
              </p>
              <div className="space-y-2">
                {items.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className="w-full text-left bg-white border border-black/10 p-3 text-sm hover:border-black/30 transition-colors"
                  >
                    <p className="font-medium">{lead.nombre}</p>
                    <p className="text-xs text-black/50">
                      {new Date(lead.created_at).toLocaleDateString("es-MX")}
                    </p>
                    {(lead.proyecto || lead.propiedad) && (
                      <p className="text-xs text-black/60 mt-1">{lead.proyecto || lead.propiedad}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <LeadDetail lead={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function LeadDetail({ lead, onClose }: { lead: LeadRow; onClose: () => void }) {
  const [pending, startTransition] = useTransition();
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-serif text-2xl">{lead.nombre}</h2>
          <button onClick={onClose} className="text-black/40 hover:text-black">✕</button>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm mb-6">
          <Info label="Teléfono" value={lead.telefono} />
          <Info label="Correo" value={lead.email} />
          <Info label="Ciudad" value={lead.ciudad} />
          <Info label="Interés" value={lead.interes} />
          <Info label="Presupuesto" value={BUDGET_LABELS[lead.presupuesto] ?? lead.presupuesto} />
          <Info label="Forma de pago" value={lead.forma_pago} />
          {lead.proyecto && <Info label="Proyecto" value={lead.proyecto} />}
          {lead.propiedad && <Info label="Propiedad" value={lead.propiedad} />}
          <Info label="Fuente" value={lead.fuente ?? "—"} />
          <Info label="Fecha" value={new Date(lead.created_at).toLocaleString("es-MX")} />
        </dl>

        {lead.mensaje && (
          <div className="mb-6">
            <p className="text-xs text-black/50 mb-1">MENSAJE</p>
            <p className="text-sm">{lead.mensaje}</p>
          </div>
        )}

        <div className="mb-6">
          <p className="text-xs text-black/50 mb-2">ETAPA</p>
          <select
            defaultValue={lead.estado}
            disabled={pending}
            onChange={(e) => startTransition(() => updateLeadStage(lead.id, e.target.value))}
            className="w-full border border-black/15 px-3 py-2 text-sm"
          >
            {PIPELINE_STAGES.map((s) => (
              <option key={s} value={s}>{STAGE_LABELS[s]}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <p className="text-xs text-black/50 mb-2">NOTAS</p>
          <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
            {(lead.notas ?? []).map((n, i) => (
              <div key={i} className="text-sm border-b border-black/5 pb-2">
                <p>{n.text}</p>
                <p className="text-xs text-black/40">{new Date(n.created_at).toLocaleString("es-MX")}</p>
              </div>
            ))}
            {(!lead.notas || lead.notas.length === 0) && <p className="text-sm text-black/40">Sin notas.</p>}
          </div>
          <div className="flex gap-2">
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 border border-black/15 px-3 py-2 text-sm"
              placeholder="Agregar nota..."
            />
            <button
              disabled={!note.trim() || pending}
              onClick={() => {
                startTransition(async () => {
                  await addLeadNote(lead.id, note);
                  setNote("");
                });
              }}
              className="px-4 py-2 bg-ink text-white text-sm disabled:opacity-50"
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <a href={`https://wa.me/52${lead.telefono.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#25D366] text-white text-sm">
            WhatsApp
          </a>
          <a href={`tel:${lead.telefono}`} className="px-4 py-2 border border-black/20 text-sm">Llamar</a>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-black/50 text-xs">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
