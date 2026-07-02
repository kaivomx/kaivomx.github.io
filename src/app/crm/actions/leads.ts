"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function updateLeadStage(leadId: string, estado: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("leads").update({ estado }).eq("id", leadId);
  revalidatePath("/crm/leads");
  revalidatePath("/crm");
}

export async function addLeadNote(leadId: string, text: string) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("leads").select("notas").eq("id", leadId).single();
  const notas = Array.isArray(data?.notas) ? data.notas : [];
  notas.push({ text, created_at: new Date().toISOString() });
  await supabase.from("leads").update({ notas }).eq("id", leadId);
  revalidatePath("/crm/leads");
}
