"use server";

import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const leadSchema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  telefono: z.string().min(10, "Ingresa un teléfono válido"),
  email: z.string().email("Ingresa un correo válido"),
  ciudad: z.string().min(2, "Ingresa tu ciudad"),
  interes: z.string().min(1, "Selecciona qué te interesa"),
  proyecto: z.string().optional(),
  propiedad: z.string().optional(),
  presupuesto: z.string().min(1, "Selecciona tu presupuesto"),
  formaPago: z.string().min(1, "Selecciona tu forma de pago"),
  mensaje: z.string().optional(),
  fuente: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
});

export type LeadFormState = {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
};

const LOCAL_LEADS_FILE = path.join(process.cwd(), ".data", "leads.json");

async function appendLocalLead(lead: Record<string, unknown>) {
  await fs.mkdir(path.dirname(LOCAL_LEADS_FILE), { recursive: true });
  let existing: unknown[] = [];
  try {
    existing = JSON.parse(await fs.readFile(LOCAL_LEADS_FILE, "utf-8"));
  } catch {
    existing = [];
  }
  existing.push(lead);
  await fs.writeFile(LOCAL_LEADS_FILE, JSON.stringify(existing, null, 2));
}

export async function submitLead(_prev: LeadFormState, formData: FormData): Promise<LeadFormState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = leadSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return { success: false, errors };
  }

  const { formaPago, utmSource, utmMedium, utmCampaign, ...rest } = parsed.data;
  const lead = {
    ...rest,
    forma_pago: formaPago,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("leads").insert([lead]);
    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, message: "No pudimos enviar tu información. Intenta de nuevo o escríbenos por WhatsApp." };
    }
  } else {
    await appendLocalLead(lead);
  }

  return { success: true, message: "¡Gracias! Un asesor de KAIVO te contactará muy pronto." };
}
