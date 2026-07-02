import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { PropertyRow } from "@/lib/crm-types";
import PropertyManager from "@/components/crm/PropertyManager";

export default async function CrmPropiedadesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<PropertyRow[]>();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Propiedades</h1>
      <PropertyManager properties={properties ?? []} />
    </div>
  );
}
