import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { ProjectRow } from "@/lib/crm-types";
import ProjectManager from "@/components/crm/ProjectManager";

export default async function CrmProyectosPage() {
  const supabase = await createSupabaseServerClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<ProjectRow[]>();

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Proyectos</h1>
      <ProjectManager projects={projects ?? []} />
    </div>
  );
}
