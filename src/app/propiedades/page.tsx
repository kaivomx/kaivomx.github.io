import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/content";
import { getProperties } from "@/lib/data";
import PropertyFilters from "@/components/PropertyFilters";

export const metadata = { title: "Propiedades | KAIVO Real Estate" };

function matchesPriceRange(price: number, range: string) {
  if (range === "lt3m") return price < 3_000_000;
  if (range === "3-6m") return price >= 3_000_000 && price <= 6_000_000;
  if (range === "gt6m") return price > 6_000_000;
  return true;
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; ciudad?: string; precio?: string; interes?: string }>;
}) {
  const { tipo, ciudad, precio } = await searchParams;
  const allProperties = await getProperties();

  const properties = allProperties.filter((p) => {
    if (tipo && p.type !== tipo) return false;
    if (ciudad && !p.location.toLowerCase().includes(ciudad.toLowerCase())) return false;
    if (precio && !matchesPriceRange(p.price, precio)) return false;
    return true;
  });

  const cities = Array.from(new Set(allProperties.map((p) => p.location.split(",").pop()?.trim() ?? p.location)));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl mb-2">Propiedades</h1>
      <p className="text-black/60 mb-8">Casas, departamentos y terrenos verificados por KAIVO.</p>

      <PropertyFilters cities={cities} />

      {properties.length === 0 && (
        <p className="text-sm text-black/40 mb-10">No encontramos propiedades con esos filtros.</p>
      )}

      <div className="grid gap-10 sm:grid-cols-2">
        {properties.map((p) => (
          <Link key={p.slug} href={`/propiedades/${p.slug}`} className="group">
            <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
              <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
            </div>
            <p className="mt-3 font-serif text-lg">{p.title}</p>
            <p className="text-xs text-black/50">
              {p.location} · {formatPrice(p.price)} · {p.beds} rec · {p.baths} baños
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
