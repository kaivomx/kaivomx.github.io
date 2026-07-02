import Link from "next/link";
import { signOut } from "@/app/crm/actions/auth";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/crm", label: "Dashboard" },
  { href: "/crm/leads", label: "Leads" },
  { href: "/crm/propiedades", label: "Propiedades" },
  { href: "/crm/proyectos", label: "Proyectos" },
];

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-cream">
      <aside className="sm:w-56 sm:min-h-screen bg-ink text-white flex sm:flex-col justify-between p-6">
        <div>
          <Logo dark className="items-start mb-10" />
          <nav className="flex sm:flex-col gap-1 text-sm">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="px-3 py-2 hover:bg-white/10 rounded">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <form action={signOut} className="hidden sm:block">
          <button type="submit" className="text-xs text-white/50 hover:text-white px-3">Cerrar sesión</button>
        </form>
      </aside>

      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
