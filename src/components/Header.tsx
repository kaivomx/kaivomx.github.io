"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import { company } from "@/lib/content";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-20">
        <Link href="/" aria-label="KAIVO Real Estate — inicio">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-black/60 transition-colors">
              {item.label}
            </Link>
          ))}
          <a href={`tel:+${company.phoneE164}`} className="text-black/60 hover:text-black">
            {company.phoneDisplay}
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="w-6 h-px bg-ink" />
          <span className="w-6 h-px bg-ink" />
          <span className="w-6 h-px bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-black/5 bg-white px-4 py-4 flex flex-col gap-4 text-sm">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
