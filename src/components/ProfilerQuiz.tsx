"use client";

import { useActionState, useState } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/leads";
import { budgetRanges, paymentMethods } from "@/lib/content";

const initialState: LeadFormState = { success: false };

const INTERES_OPTIONS = [
  { value: "comprar", label: "Comprar", body: "Busco una casa, depto o terreno para vivir." },
  { value: "invertir", label: "Invertir", body: "Busco rendimiento: preventa o renta." },
  { value: "rentar", label: "Rentar", body: "Busco una propiedad para rentar." },
];

const TIPO_OPTIONS = [
  { value: "casa", label: "Casa" },
  { value: "departamento", label: "Departamento" },
  { value: "terreno", label: "Terreno" },
  { value: "preventa", label: "Proyecto en preventa" },
];

const TOTAL_STEPS = 5;

export default function ProfilerQuiz({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [interes, setInteres] = useState("");
  const [tipo, setTipo] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [formaPago, setFormaPago] = useState("");
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  const progress = Math.round(((step - 1) / TOTAL_STEPS) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white max-w-lg w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-black/40 hover:text-black">✕</button>

        {!state.success && (
          <div className="h-1 bg-black/5 mb-8">
            <div className="h-full bg-ink transition-all" style={{ width: `${progress}%` }} />
          </div>
        )}

        {state.success ? (
          <div className="text-center py-8">
            <p className="font-serif text-2xl mb-3">¡Listo!</p>
            <p className="text-black/70">{state.message}</p>
          </div>
        ) : step === 1 ? (
          <QuizStep title="¿Qué estás buscando?">
            {INTERES_OPTIONS.map((o) => (
              <QuizOption key={o.value} label={o.label} body={o.body} onClick={() => { setInteres(o.value); setStep(2); }} />
            ))}
          </QuizStep>
        ) : step === 2 ? (
          <QuizStep title="¿Qué tipo de propiedad?" onBack={() => setStep(1)}>
            {TIPO_OPTIONS.map((o) => (
              <QuizOption key={o.value} label={o.label} onClick={() => { setTipo(o.value); setStep(3); }} />
            ))}
          </QuizStep>
        ) : step === 3 ? (
          <QuizStep title="¿Cuál es tu presupuesto?" onBack={() => setStep(2)}>
            {budgetRanges.map((o) => (
              <QuizOption key={o.value} label={o.label} onClick={() => { setPresupuesto(o.value); setStep(4); }} />
            ))}
          </QuizStep>
        ) : step === 4 ? (
          <QuizStep title="¿Cómo planeas pagar?" onBack={() => setStep(3)}>
            {paymentMethods.map((o) => (
              <QuizOption key={o.value} label={o.label} onClick={() => { setFormaPago(o.value); setStep(5); }} />
            ))}
          </QuizStep>
        ) : (
          <div>
            <button onClick={() => setStep(4)} className="text-xs text-black/40 mb-4">← Atrás</button>
            <h2 className="font-serif text-2xl mb-6">Ya casi. ¿Cómo te contactamos?</h2>
            <form action={formAction} className="grid gap-4">
              <input type="hidden" name="interes" value={interes} />
              <input type="hidden" name="presupuesto" value={presupuesto} />
              <input type="hidden" name="formaPago" value={formaPago} />
              <input type="hidden" name="fuente" value="quiz-perfilacion" />
              <input type="hidden" name="mensaje" value={`Interesado en: ${tipo}`} />

              <input name="nombre" placeholder="Nombre completo" required className={inputClass} />
              <input name="telefono" type="tel" placeholder="Teléfono" required className={inputClass} />
              <input name="email" type="email" placeholder="Correo" required className={inputClass} />
              <input name="ciudad" placeholder="Ciudad" required className={inputClass} />

              {state.message && !state.success && <p className="text-sm text-red-600">{state.message}</p>}

              <button type="submit" disabled={pending} className="mt-2 bg-ink text-white py-3 text-sm tracking-wide disabled:opacity-50">
                {pending ? "Enviando..." : "Ver mis opciones"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizStep({ title, onBack, children }: { title: string; onBack?: () => void; children: React.ReactNode }) {
  return (
    <div>
      {onBack && <button onClick={onBack} className="text-xs text-black/40 mb-4">← Atrás</button>}
      <h2 className="font-serif text-2xl mb-6">{title}</h2>
      <div className="grid gap-3">{children}</div>
    </div>
  );
}

function QuizOption({ label, body, onClick }: { label: string; body?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="text-left border border-black/15 px-5 py-4 hover:border-ink hover:bg-cream transition-colors"
    >
      <p className="font-medium">{label}</p>
      {body && <p className="text-xs text-black/50 mt-1">{body}</p>}
    </button>
  );
}

const inputClass = "w-full border border-black/15 px-3 py-2 text-sm";
