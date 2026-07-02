"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase-server";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function saveProject(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "");

  const payload = {
    name,
    slug: id ? undefined : slugify(name) + "-" + Date.now().toString(36),
    developer: String(formData.get("developer") ?? ""),
    price_from: Number(formData.get("price_from") ?? 0),
    delivery_date: String(formData.get("delivery_date") ?? ""),
    m2: String(formData.get("m2") ?? ""),
    units: Number(formData.get("units") ?? 0) || null,
    description: String(formData.get("description") ?? ""),
    image: String(formData.get("image") ?? ""),
  };

  if (id) {
    await supabase.from("projects").update(payload).eq("id", id);
  } else {
    await supabase.from("projects").insert([payload]);
  }

  revalidatePath("/crm/proyectos");
  revalidatePath("/proyectos");
  revalidatePath("/");
  return {};
}

export async function deleteProject(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/crm/proyectos");
  revalidatePath("/proyectos");
  revalidatePath("/");
}
