import { company } from "@/lib/content";
import LeadForm from "@/components/LeadForm";

export const metadata = { title: "Contacto | KAIVO Real Estate" };

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <div className="grid gap-16 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h1 className="font-serif text-4xl mb-4">Contacto</h1>
          <p className="text-black/70 mb-10">
            Cuéntanos qué buscas y un asesor de KAIVO te contactará en menos de 24 horas.
          </p>

          <ul className="space-y-4 text-sm">
            <li>
              <p className="text-black/50 text-xs mb-1">TELÉFONO Y WHATSAPP</p>
              <a href={`tel:+${company.phoneE164}`} className="hover:text-black/60">{company.phoneDisplay}</a>
            </li>
            <li>
              <p className="text-black/50 text-xs mb-1">CORREO</p>
              <a href={`mailto:${company.email}`} className="hover:text-black/60">{company.email}</a>
            </li>
            <li>
              <p className="text-black/50 text-xs mb-1">UBICACIÓN</p>
              <p>{company.location}</p>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2 border border-black/10 p-6 sm:p-10">
          <LeadForm />
        </div>
      </div>
    </div>
  );
}
