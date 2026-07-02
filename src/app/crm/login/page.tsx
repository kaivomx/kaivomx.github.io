"use client";

import { useActionState } from "react";
import { signIn, type AuthState } from "@/app/crm/actions/auth";
import Logo from "@/components/Logo";

const initialState: AuthState = {};

export default function CrmLoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Logo dark />
        </div>
        <form action={formAction} className="bg-white p-8 flex flex-col gap-4">
          <h1 className="font-serif text-2xl mb-2">Acceso CRM</h1>

          <div>
            <label className="block text-xs tracking-wide text-black/60 mb-1">Correo</label>
            <input name="email" type="email" required className="w-full border border-black/15 px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="block text-xs tracking-wide text-black/60 mb-1">Contraseña</label>
            <input name="password" type="password" required className="w-full border border-black/15 px-3 py-2 text-sm" />
          </div>

          {state.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 bg-ink text-white py-3 text-sm tracking-wide hover:bg-ink/90 disabled:opacity-50"
          >
            {pending ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
