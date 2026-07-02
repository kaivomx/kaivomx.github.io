import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/content";
import { getProjects } from "@/lib/data";

export const metadata = { title: "Proyectos en preventa | KAIVO Real Estate" };

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl mb-2">Proyectos en preventa</h1>
      <p className="text-black/60 mb-12">Desarrollos verificados con precios preferenciales de preventa.</p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link key={p.slug} href={`/proyectos/${p.slug}`} className="group">
            <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
              <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform" />
            </div>
            <p className="mt-3 font-serif text-lg">{p.name}</p>
            <p className="text-xs text-black/50">{p.developer} · Desde {formatPrice(p.priceFrom)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
