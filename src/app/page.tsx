import Link from "next/link";
import Image from "next/image";
import { company, testimonials, formatPrice } from "@/lib/content";
import { getProperties, getProjects } from "@/lib/data";
import ProfilerQuizLauncher from "@/components/ProfilerQuizLauncher";

export default async function HomePage() {
  const [properties, projects] = await Promise.all([getProperties(), getProjects()]);

  return (
    <>
      <section className="relative min-h-[92vh] flex items-center justify-center bg-ink text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.35em] text-white/50 mb-8">KAIVO REAL ESTATE · AGUASCALIENTES</p>
          <h1 className="font-serif text-4xl sm:text-6xl leading-tight mb-6">
            {company.heroHeadline}
          </h1>
          <p className="text-white/70 max-w-xl mx-auto mb-10">{company.tagline}</p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/propiedades?interes=comprar" className="px-8 py-3 border border-white/30 text-sm tracking-wide hover:bg-white hover:text-ink transition-colors">
              Comprar
            </Link>
            <Link href="/propiedades?interes=rentar" className="px-8 py-3 border border-white/30 text-sm tracking-wide hover:bg-white hover:text-ink transition-colors">
              Rentar
            </Link>
            <Link href="/proyectos?interes=invertir" className="px-8 py-3 border border-white/30 text-sm tracking-wide hover:bg-white hover:text-ink transition-colors">
              Invertir
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {company.stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl">{s.value}</p>
                <p className="text-xs text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative aspect-[4/3] overflow-hidden bg-black/5 order-2 lg:order-1">
          <Image src={company.story.image} alt="KAIVO Real Estate" fill className="object-cover" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs tracking-widest text-black/40 mb-4">NUESTRA HISTORIA</p>
          <h2 className="font-serif text-3xl mb-6">{company.story.heading}</h2>
          {company.story.paragraphs.map((p) => (
            <p key={p} className="text-black/70 mb-4">{p}</p>
          ))}
          <Link href="/nosotros" className="text-sm underline underline-offset-4">Conoce más sobre nosotros</Link>
        </div>
      </section>

      <section className="bg-cream py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl">Proyectos en preventa</h2>
            <Link href="/proyectos" className="text-sm underline underline-offset-4">Ver todos</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/proyectos/${p.slug}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                  <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-serif text-lg">{p.name}</p>
                    <p className="text-white/70 text-xs">Desde {formatPrice(p.priceFrom)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-3xl">Propiedades destacadas</h2>
          <Link href="/propiedades" className="text-sm underline underline-offset-4">Ver todas</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {properties.slice(0, 2).map((p) => (
            <Link key={p.slug} href={`/propiedades/${p.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                <Image src={p.images[0]} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-serif text-lg">{p.title}</p>
                  <p className="text-white/70 text-xs">{p.location} · {formatPrice(p.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-black/10 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs tracking-widest text-black/40 mb-4 text-center">ZONAS POPULARES</p>
          <div className="flex flex-wrap justify-center gap-3">
            {company.zones.map((zone) => (
              <Link
                key={zone}
                href={`/propiedades?ciudad=${encodeURIComponent(zone)}`}
                className="px-5 py-2 border border-black/15 text-sm hover:border-ink transition-colors"
              >
                {zone}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="font-serif text-3xl mb-4">¿No sabes por dónde empezar?</h2>
          <p className="text-white/70 mb-8">
            Responde unas preguntas rápidas y te ayudamos a encontrar la propiedad o el proyecto ideal para ti.
          </p>
          <ProfilerQuizLauncher className="px-8 py-3 bg-white text-ink text-sm tracking-wide hover:bg-white/90">
            Encuentra tu propiedad ideal
          </ProfilerQuizLauncher>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-24">
        <h2 className="font-serif text-3xl mb-10">Lo que dicen nuestros clientes</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name}>
              <p className="text-sm text-black/70">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-xs text-black/40 mt-4">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
