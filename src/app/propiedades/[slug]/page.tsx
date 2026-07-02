import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, company } from "@/lib/content";
import { getProperties, getPropertyBySlug } from "@/lib/data";
import LeadForm from "@/components/LeadForm";

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const allProperties = await getProperties();
  const related = allProperties.filter((p) => p.slug !== slug).slice(0, 2);
  const mapsQuery = encodeURIComponent(property.location);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {property.images.map((img, i) => (
          <div key={img} className={`relative aspect-[4/3] overflow-hidden bg-black/5 ${i === 0 ? "sm:col-span-2 sm:aspect-[16/9]" : ""}`}>
            <Image src={img} alt={`${property.title} - foto ${i + 1}`} fill className="object-cover" priority={i === 0} />
          </div>
        ))}
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="font-serif text-3xl sm:text-4xl mb-2">{property.title}</h1>
          <p className="text-black/60 mb-6">{property.location}</p>
          <p className="font-serif text-2xl mb-8">{formatPrice(property.price)}</p>

          <h2 className="text-sm tracking-widest text-black/50 mb-3">FICHA TÉCNICA</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 text-sm">
            {property.m2Terreno && <Spec label="Terreno" value={`${property.m2Terreno} m²`} />}
            {property.m2Construccion && <Spec label="Construcción" value={`${property.m2Construccion} m²`} />}
            {property.beds && <Spec label="Recámaras" value={property.beds} />}
            {property.baths && <Spec label="Baños" value={property.baths} />}
          </dl>

          <h2 className="text-sm tracking-widest text-black/50 mb-3">DESCRIPCIÓN</h2>
          <p className="text-black/80 mb-10">{property.description}</p>

          <h2 className="text-sm tracking-widest text-black/50 mb-3">AMENIDADES</h2>
          <ul className="grid grid-cols-2 gap-2 mb-10 text-sm">
            {property.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink" /> {a}
              </li>
            ))}
          </ul>

          <h2 className="text-sm tracking-widest text-black/50 mb-3">UBICACIÓN</h2>
          <div className="aspect-[16/9] bg-black/5 mb-10">
            <iframe
              title="Mapa de ubicación"
              className="w-full h-full border-0"
              loading="lazy"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`${company.whatsappUrl}?text=${encodeURIComponent(`Hola, me interesa la propiedad: ${property.title}`)}`} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white text-sm">
              WhatsApp
            </a>
            <a href={`tel:+${company.phoneE164}`} className="px-6 py-3 border border-black/20 text-sm">
              Llamar
            </a>
            <a href="/contacto" className="px-6 py-3 border border-black/20 text-sm">
              Agendar cita
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-3">
            <a href={`/api/ficha/${property.slug}?variant=corporate`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">
              Descargar ficha (con logo KAIVO)
            </a>
            <a href={`/api/ficha/${property.slug}?variant=plain`} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4 text-black/60 hover:text-black">
              Descargar ficha (para compartir, sin logo)
            </a>
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 border border-black/10 p-6">
            <h2 className="font-serif text-xl mb-4">Solicitar información</h2>
            <LeadForm defaultPropiedad={property.title} compact />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-serif text-2xl mb-6">Propiedades relacionadas</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {related.map((p) => (
              <Link key={p.slug} href={`/propiedades/${p.slug}`} className="group">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="mt-3 font-serif text-lg">{p.title}</p>
                <p className="text-xs text-black/50">{p.location} · {formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
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
