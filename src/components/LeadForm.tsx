"use client";

import { useActionState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";
import { budgetRanges, paymentMethods } from "@/lib/content";

const initialState: LeadFormState = { success: false };

export default function LeadForm({
  defaultProyecto,
  defaultPropiedad,
  compact = false,
}: {
  defaultProyecto?: string;
  defaultPropiedad?: string;
  compact?: boolean;
}) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  if (state.success) {
    return (
      <div className="rounded-lg border border-black/10 bg-cream p-6 text-sm">
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      <Field label="Nombre completo" name="nombre" error={state.errors?.nombre}>
        <input name="nombre" type="text" required className={inputClass} />
      </Field>

      <Field label="Teléfono" name="telefono" error={state.errors?.telefono}>
        <input name="telefono" type="tel" required className={inputClass} />
      </Field>

      <Field label="Correo" name="email" error={state.errors?.email}>
        <input name="email" type="email" required className={inputClass} />
      </Field>

      <Field label="Ciudad" name="ciudad" error={state.errors?.ciudad}>
        <input name="ciudad" type="text" required className={inputClass} />
      </Field>

      <Field label="¿Qué te interesa?" name="interes" error={state.errors?.interes}>
        <select name="interes" required defaultValue="" className={inputClass}>
          <option value="" disabled>Selecciona una opción</option>
          <option value="comprar">Comprar</option>
          <option value="invertir">Invertir</option>
          <option value="rentar">Rentar</option>
        </select>
      </Field>

      <Field label="Presupuesto" name="presupuesto" error={state.errors?.presupuesto}>
        <select name="presupuesto" required defaultValue="" className={inputClass}>
          <option value="" disabled>Selecciona un rango</option>
          {budgetRanges.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </Field>

      <Field label="Forma de pago" name="formaPago" error={state.errors?.formaPago}>
        <select name="formaPago" required defaultValue="" className={inputClass}>
          <option value="" disabled>Selecciona una opción</option>
          {paymentMethods.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </Field>

      <input type="hidden" name="proyecto" value={defaultProyecto ?? ""} />
      <input type="hidden" name="propiedad" value={defaultPropiedad ?? ""} />
      <input type="hidden" name="fuente" value="sitio-web" />

      <div className={compact ? "" : "sm:col-span-2"}>
        <label className="block text-xs tracking-wide text-black/60 mb-1">Mensaje</label>
        <textarea name="mensaje" rows={3} className={inputClass} />
      </div>

      {state.message && !state.success && (
        <p className={`text-sm text-red-600 ${compact ? "" : "sm:col-span-2"}`}>{state.message}</p>
      )}

      <div className={compact ? "" : "sm:col-span-2"}>
        <button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto px-8 py-3 bg-ink text-white text-sm tracking-wide hover:bg-ink/90 transition-colors disabled:opacity-50"
        >
          {pending ? "Enviando..." : "Solicitar información"}
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full border border-black/15 bg-white px-3 py-2 text-sm focus:outline-none focus:border-black/40";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs tracking-wide text-black/60 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
