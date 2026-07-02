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

export async function saveProperty(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  const supabase = await createSupabaseServerClient();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "");
  const amenities = String(formData.get("amenities") ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const images = String(formData.get("images") ?? "")
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);

  const payload = {
    title,
    slug: id ? undefined : slugify(title) + "-" + Date.now().toString(36),
    type: String(formData.get("type") ?? ""),
    price: Number(formData.get("price") ?? 0),
    location: String(formData.get("location") ?? ""),
    m2_terreno: Number(formData.get("m2_terreno") ?? 0) || null,
    m2_construccion: Number(formData.get("m2_construccion") ?? 0) || null,
    beds: Number(formData.get("beds") ?? 0) || null,
    baths: Number(formData.get("baths") ?? 0) || null,
    amenities,
    description: String(formData.get("description") ?? ""),
    status: String(formData.get("status") ?? "disponible"),
    titulo: String(formData.get("titulo") ?? "escriturada"),
    images,
  };

  if (id) {
    await supabase.from("properties").update(payload).eq("id", id);
  } else {
    await supabase.from("properties").insert([payload]);
  }

  revalidatePath("/crm/propiedades");
  revalidatePath("/propiedades");
  revalidatePath("/");
  return {};
}

export async function deleteProperty(id: string) {
  const supabase = await createSupabaseServerClient();
  await supabase.from("properties").delete().eq("id", id);
  revalidatePath("/crm/propiedades");
  revalidatePath("/propiedades");
  revalidatePath("/");
}
