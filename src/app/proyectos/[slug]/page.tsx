import Image from "next/image";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/content";
import { getProjectBySlug } from "@/lib/data";
import LeadForm from "@/components/LeadForm";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="relative aspect-[21/9] overflow-hidden bg-black/5 mb-10">
        <Image src={project.image} alt={project.name} fill className="object-cover" priority />
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">{project.name}</h1>
          <p className="text-black/60 mb-6">Desarrollado por {project.developer}</p>

          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-sm">
            <Spec label="Desde" value={formatPrice(project.priceFrom)} />
            <Spec label="Entrega" value={project.delivery} />
            <Spec label="Metraje" value={project.m2} />
            <Spec label="Unidades" value={project.units} />
          </dl>

          <h2 className="text-sm tracking-widest text-black/50 mb-3">SOBRE EL PROYECTO</h2>
          <p className="text-black/80 mb-10">{project.description}</p>

          <h2 className="text-sm tracking-widest text-black/50 mb-3">RAZONES PARA INVERTIR</h2>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm mb-10">
            <li className="flex gap-2"><span className="h-1 w-1 rounded-full bg-ink mt-2" /> Precio preferencial de preventa</li>
            <li className="flex gap-2"><span className="h-1 w-1 rounded-full bg-ink mt-2" /> Desarrollador verificado legalmente</li>
            <li className="flex gap-2"><span className="h-1 w-1 rounded-full bg-ink mt-2" /> Plusvalía proyectada a la entrega</li>
            <li className="flex gap-2"><span className="h-1 w-1 rounded-full bg-ink mt-2" /> Acompañamiento KAIVO sin costo</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <a href={`/api/brochure/${project.slug}?variant=corporate`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">
              Descargar brochure (con logo KAIVO)
            </a>
            <a href={`/api/brochure/${project.slug}?variant=plain`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">
              Descargar brochure (para compartir, sin logo)
            </a>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 border border-black/10 p-6">
            <h2 className="font-serif text-xl mb-4">Solicitar información</h2>
            <LeadForm defaultProyecto={project.name} compact />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-black/50 text-xs">{label}</dt>
      <dd className="font-serif text-lg">{value}</dd>
    </div>
  );
}
