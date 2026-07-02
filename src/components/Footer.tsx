import Link from "next/link";
import Logo from "./Logo";
import { company } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-white mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 grid gap-10 sm:grid-cols-3">
        <div>
          <Logo dark className="items-start" />
          <p className="mt-4 text-sm text-white/60 max-w-xs">{company.tagline}</p>
        </div>

        <div className="text-sm">
          <h3 className="tracking-widest text-white/50 text-xs mb-4">NAVEGACIÓN</h3>
          <ul className="space-y-2">
            <li><Link href="/propiedades" className="hover:text-white/70">Propiedades</Link></li>
            <li><Link href="/proyectos" className="hover:text-white/70">Proyectos</Link></li>
            <li><Link href="/nosotros" className="hover:text-white/70">Nosotros</Link></li>
            <li><Link href="/blog" className="hover:text-white/70">Blog</Link></li>
            <li><Link href="/contacto" className="hover:text-white/70">Contacto</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="tracking-widest text-white/50 text-xs mb-4">CONTACTO</h3>
          <ul className="space-y-2 text-white/80">
            <li>{company.location}</li>
            <li>
              <a href={`tel:+${company.phoneE164}`} className="hover:text-white">{company.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} KAIVO Real Estate. Todos los derechos reservados.
      </div>
    </footer>
  );
}
