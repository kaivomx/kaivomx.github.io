"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TYPES = [
  { value: "", label: "Todos los tipos" },
  { value: "casa", label: "Casas" },
  { value: "departamento", label: "Departamentos" },
  { value: "terreno", label: "Terrenos" },
];

export default function PropertyFilters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/propiedades?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <select
        defaultValue={searchParams.get("tipo") ?? ""}
        onChange={(e) => updateParam("tipo", e.target.value)}
        className="border border-black/15 px-3 py-2 text-sm"
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("ciudad") ?? ""}
        onChange={(e) => updateParam("ciudad", e.target.value)}
        className="border border-black/15 px-3 py-2 text-sm"
      >
        <option value="">Todas las ubicaciones</option>
        {cities.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("precio") ?? ""}
        onChange={(e) => updateParam("precio", e.target.value)}
        className="border border-black/15 px-3 py-2 text-sm"
      >
        <option value="">Cualquier precio</option>
        <option value="lt3m">Menos de $3M</option>
        <option value="3-6m">$3M - $6M</option>
        <option value="gt6m">Más de $6M</option>
      </select>
    </div>
  );
}
