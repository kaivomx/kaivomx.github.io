export type LeadRow = {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  ciudad: string;
  interes: string;
  proyecto: string | null;
  propiedad: string | null;
  presupuesto: string;
  forma_pago: string;
  mensaje: string | null;
  fuente: string | null;
  estado: string;
  notas: { text: string; created_at: string }[];
  proxima_actividad: string | null;
  created_at: string;
};

export const PIPELINE_STAGES = [
  "nuevo",
  "contactado",
  "interesado",
  "cita_agendada",
  "cita_realizada",
  "seguimiento",
  "negociacion",
  "apartado",
  "venta_cerrada",
  "no_interesado",
] as const;

export const STAGE_LABELS: Record<string, string> = {
  nuevo: "Lead nuevo",
  contactado: "Contactado",
  interesado: "Interesado",
  cita_agendada: "Cita agendada",
  cita_realizada: "Cita realizada",
  seguimiento: "Seguimiento",
  negociacion: "Negociación",
  apartado: "Apartado",
  venta_cerrada: "Venta cerrada",
  no_interesado: "No interesado",
};

export type PropertyRow = {
  id: string;
  slug: string;
  title: string;
  type: string;
  price: number;
  location: string;
  m2_terreno: number | null;
  m2_construccion: number | null;
  beds: number | null;
  baths: number | null;
  amenities: string[];
  description: string | null;
  ai_description: string | null;
  status: string;
  images: string[];
  titulo: string;
  created_at: string;
};

export type ProjectRow = {
  id: string;
  slug: string;
  name: string;
  developer: string;
  price_from: number;
  delivery_date: string | null;
  m2: string | null;
  units: number | null;
  description: string | null;
  image: string | null;
  created_at: string;
};
