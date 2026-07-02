import { company, faqs } from "@/lib/content";

export const metadata = { title: "Nosotros | KAIVO Real Estate" };

export default function NosotrosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl mb-4">Nosotros</h1>
      <p className="max-w-2xl text-black/70 mb-16">
        En KAIVO llevamos más de 8 años acompañando a familias e inversionistas en el mercado inmobiliario
        de Aguascalientes. Nuestro trabajo es ser el filtro entre tu capital y los riesgos del mercado:
        verificamos, asesoramos y te acompañamos en todo el proceso, sin costo para ti.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-20">
        {company.stats.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-3xl">{s.value}</p>
            <p className="text-xs text-black/50 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-2xl mb-8">Nuestro proceso</h2>
      <ol className="grid gap-8 sm:grid-cols-5 mb-20">
        {company.process.map((s) => (
          <li key={s.step}>
            <p className="font-serif text-2xl text-black/30">{String(s.step).padStart(2, "0")}</p>
            <p className="font-medium mt-2">{s.title}</p>
            <p className="text-sm text-black/60 mt-1">{s.body}</p>
          </li>
        ))}
      </ol>

      <h2 className="font-serif text-2xl mb-8">Preguntas frecuentes</h2>
      <div className="max-w-3xl divide-y divide-black/10">
        {faqs.map((f) => (
          <details key={f.q} className="py-4 group">
            <summary className="cursor-pointer font-medium list-none flex justify-between items-center">
              {f.q}
              <span className="text-black/40 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-sm text-black/60 mt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
