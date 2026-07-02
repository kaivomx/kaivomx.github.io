import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { LeadRow } from "@/lib/crm-types";
import LeadBoard from "@/components/crm/LeadBoard";

export default async function CrmLeadsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Leads</h1>
      <LeadBoard leads={leads ?? []} />
    </div>
  );
}
