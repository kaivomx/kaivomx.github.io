import { createSupabaseServerClient } from "@/lib/supabase-server";
import { STAGE_LABELS, type LeadRow } from "@/lib/crm-types";

export default async function CrmDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<LeadRow[]>();

  const all = leads ?? [];
  const total = all.length;
  const nuevos = all.filter((l) => l.estado === "nuevo").length;
  const citas = all.filter((l) => l.estado === "cita_agendada" || l.estado === "cita_realizada").length;
  const ventas = all.filter((l) => l.estado === "venta_cerrada").length;
  const conversion = total > 0 ? ((ventas / total) * 100).toFixed(1) : "0.0";

  const porFuente = all.reduce<Record<string, number>>((acc, l) => {
    const key = l.fuente || "sin especificar";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const porEstado = all.reduce<Record<string, number>>((acc, l) => {
    acc[l.estado] = (acc[l.estado] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12">
        <Stat label="Leads recibidos" value={total} />
        <Stat label="Leads nuevos" value={nuevos} />
        <Stat label="Citas" value={citas} />
        <Stat label="Ventas cerradas" value={ventas} />
        <Stat label="Conversión" value={`${conversion}%`} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="bg-white border border-black/10 p-6">
          <h2 className="text-sm tracking-widest text-black/50 mb-4">EMBUDO COMERCIAL</h2>
          <div className="space-y-2">
            {Object.entries(porEstado).map(([estado, count]) => (
              <Bar key={estado} label={STAGE_LABELS[estado] ?? estado} value={count} max={total || 1} />
            ))}
            {total === 0 && <p className="text-sm text-black/40">Aún no hay leads.</p>}
          </div>
        </div>

        <div className="bg-white border border-black/10 p-6">
          <h2 className="text-sm tracking-widest text-black/50 mb-4">LEADS POR FUENTE</h2>
          <div className="space-y-2">
            {Object.entries(porFuente).map(([fuente, count]) => (
              <Bar key={fuente} label={fuente} value={count} max={total || 1} />
            ))}
            {total === 0 && <p className="text-sm text-black/40">Aún no hay leads.</p>}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white border border-black/10 p-6">
        <h2 className="text-sm tracking-widest text-black/50 mb-4">ACTIVIDAD RECIENTE</h2>
        <div className="divide-y divide-black/5">
          {all.slice(0, 5).map((l) => (
            <div key={l.id} className="py-3 flex justify-between text-sm">
              <span>{l.nombre}</span>
              <span className="text-black/50">{new Date(l.created_at).toLocaleDateString("es-MX")}</span>
            </div>
          ))}
          {all.length === 0 && <p className="text-sm text-black/40 py-2">Aún no hay actividad.</p>}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white border border-black/10 p-4">
      <p className="font-serif text-2xl">{value}</p>
      <p className="text-xs text-black/50 mt-1">{label}</p>
    </div>
  );
}

function Bar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="text-black/50">{value}</span>
      </div>
      <div className="h-1.5 bg-black/5">
        <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
