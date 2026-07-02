import { supabase } from "@/lib/supabase";
import {
  properties as staticProperties,
  projects as staticProjects,
  type Property,
  type Project,
} from "@/lib/content";
import type { PropertyRow, ProjectRow } from "@/lib/crm-types";

function mapProperty(row: PropertyRow): Property {
  return {
    slug: row.slug,
    title: row.title,
    type: row.type as Property["type"],
    price: row.price,
    location: row.location,
    m2Terreno: row.m2_terreno ?? undefined,
    m2Construccion: row.m2_construccion ?? undefined,
    beds: row.beds ?? undefined,
    baths: row.baths ?? undefined,
    amenities: row.amenities ?? [],
    description: row.description ?? "",
    images: row.images?.length ? row.images : ["/legacy/building.jpeg"],
    status: row.status as Property["status"],
  };
}

function mapProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    name: row.name,
    developer: row.developer,
    priceFrom: row.price_from,
    delivery: row.delivery_date ?? "",
    m2: row.m2 ?? "",
    units: row.units ?? 0,
    description: row.description ?? "",
    image: row.image || "/legacy/building.jpeg",
  };
}

export async function getProperties(): Promise<Property[]> {
  if (!supabase) return staticProperties;
  const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
  if (!data || data.length === 0) return staticProperties;
  return (data as PropertyRow[]).map(mapProperty);
}

export async function getPropertyBySlug(slug: string): Promise<Property | undefined> {
  const all = await getProperties();
  return all.find((p) => p.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) return staticProjects;
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (!data || data.length === 0) return staticProjects;
  return (data as ProjectRow[]).map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}
