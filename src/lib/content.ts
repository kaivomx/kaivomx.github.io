export const company = {
  name: "KAIVO",
  tagline: "El mercado inmobiliario tiene trampas. Nosotros las conocemos todas.",
  heroHeadline: "Tu dinero merece trabajar más inteligente",
  phoneDisplay: "449 457 7041",
  phoneE164: "524494577041",
  whatsappUrl: "https://wa.me/524494577041",
  email: "kaivomx@gmail.com",
  location: "Aguascalientes, México",
  stats: [
    { label: "Inversores atendidos", value: "50+" },
    { label: "Años de experiencia", value: "8+" },
    { label: "Proyectos en preventa", value: "4" },
    { label: "Costo para el cliente", value: "$0" },
  ],
  pillars: [
    {
      title: "Riesgo cero de fraude",
      body: "Verificamos legalmente cada proyecto y propiedad antes de presentártelo.",
    },
    {
      title: "Ahorro desde el primer día",
      body: "Acceso a precios de preventa y condiciones que no encontrarás por tu cuenta.",
    },
    {
      title: "Cero conflicto de interés",
      body: "Te asesoramos pensando en tu inversión, no en cerrar la venta más rápida.",
    },
  ],
  story: {
    heading: "Más de 8 años impulsando inversiones inmobiliarias en Aguascalientes",
    paragraphs: [
      "KAIVO nació para ser el filtro entre tu capital y los riesgos de un mercado inmobiliario que no siempre juega limpio. Desde hace más de 8 años acompañamos a familias e inversionistas de Aguascalientes y México en la compra de propiedades residenciales y proyectos en preventa.",
      "No cobramos comisión al comprador: trabajamos para que tomes la mejor decisión, con verificación legal, acompañamiento personalizado y transparencia total en cada paso del proceso.",
    ],
    image: "/legacy/building.jpeg",
  },
  zones: ["Aguascalientes", "Jardines de la Asunción", "Belanta Campestre"],
  process: [
    { step: 1, title: "Llamada inicial", body: "Entendemos qué buscas y tu presupuesto." },
    { step: 2, title: "Propuesta", body: "Seleccionamos propiedades y proyectos que encajan contigo." },
    { step: 3, title: "Visita", body: "Recorremos juntos las opciones, en persona o virtual." },
    { step: 4, title: "Revisión legal", body: "Verificamos escrituras, permisos y estatus legal." },
    { step: 5, title: "Cierre", body: "Te acompañamos hasta la firma y entrega." },
  ],
};

export type Property = {
  slug: string;
  title: string;
  type: "casa" | "departamento" | "terreno";
  price: number;
  location: string;
  m2Terreno?: number;
  m2Construccion?: number;
  beds?: number;
  baths?: number;
  amenities: string[];
  description: string;
  images: string[];
  status: "disponible" | "apartado" | "vendida";
};

export const properties: Property[] = [
  {
    slug: "casa-residencial-jardines",
    title: "Casa residencial en Jardines de la Asunción",
    type: "casa",
    price: 4850000,
    location: "Jardines de la Asunción, Aguascalientes",
    m2Terreno: 220,
    m2Construccion: 280,
    beds: 3,
    baths: 3.5,
    amenities: ["Alberca", "Jardín privado", "Cochera para 2 autos", "Cocina integral", "Roof garden"],
    description:
      "Casa residencial de reciente construcción en una de las zonas más consolidadas de Aguascalientes. Acabados de lujo, amplios espacios y excelente iluminación natural.",
    images: ["/legacy/casa1.jpeg", "/legacy/casa2.jpeg"],
    status: "disponible",
  },
  {
    slug: "casa-campestre-belanta",
    title: "Casa campestre en Belanta",
    type: "casa",
    price: 6200000,
    location: "Belanta Campestre, Aguascalientes",
    m2Terreno: 350,
    m2Construccion: 310,
    beds: 4,
    baths: 4,
    amenities: ["Club house", "Áreas verdes", "Seguridad 24/7", "Estudio", "Terraza"],
    description:
      "Amplia casa dentro de fraccionamiento campestre con amenidades de club de golf. Ideal para familias que buscan tranquilidad sin alejarse de la ciudad.",
    images: ["/legacy/casa3.jpeg", "/legacy/casa4.jpeg"],
    status: "disponible",
  },
];

export type Project = {
  slug: string;
  name: string;
  developer: string;
  priceFrom: number;
  delivery: string;
  m2: string;
  units: number;
  description: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "beara-paraiso-vertical",
    name: "Beara Paraíso Vertical",
    developer: "Grupo Beara",
    priceFrom: 2100000,
    delivery: "2027",
    m2: "45 - 95 m²",
    units: 120,
    description:
      "Desarrollo vertical con amenidades resort: alberca, gimnasio, coworking y roof garden. Preventa con precios preferenciales por etapa.",
    image: "/legacy/building.jpeg",
  },
  {
    slug: "aunna",
    name: "AUNNA",
    developer: "Aunna Desarrollos",
    priceFrom: 1850000,
    delivery: "2026",
    m2: "38 - 72 m²",
    units: 96,
    description: "Torre de departamentos boutique en zona de alta plusvalía, pensada para inversión en renta.",
    image: "/legacy/building.jpeg",
  },
  {
    slug: "diana-tower",
    name: "Diana Tower",
    developer: "Diana Desarrollos",
    priceFrom: 2450000,
    delivery: "2027",
    m2: "50 - 110 m²",
    units: 140,
    description: "Torre mixta con locales comerciales en planta baja y departamentos con vista panorámica.",
    image: "/legacy/building.jpeg",
  },
  {
    slug: "belanta-campestre",
    name: "Belanta Campestre",
    developer: "Belanta Desarrollos",
    priceFrom: 3200000,
    delivery: "2026",
    m2: "180 - 400 m²",
    units: 60,
    description: "Lotes residenciales campestres con club house, alberca y áreas verdes dentro de fraccionamiento privado.",
    image: "/legacy/building.jpeg",
  },
];

export const testimonials = [
  {
    name: "Laura M.",
    quote:
      "KAIVO me acompañó en todo el proceso de compra de mi primer departamento en preventa. Transparencia total desde el día uno.",
    rating: 5,
  },
  {
    name: "Roberto S.",
    quote: "Encontré una inversión con mejor rendimiento del que esperaba, sin ningún costo por su asesoría.",
    rating: 5,
  },
  {
    name: "Daniela R.",
    quote: "Se notó que conocían el mercado a fondo. Nos evitaron un desarrollo con problemas legales que casi compramos por nuestra cuenta.",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "¿Cuánto cuesta trabajar con KAIVO?",
    a: "Nuestra asesoría no tiene costo para ti. Trabajamos con los desarrolladores y vendedores, no cobramos comisión al comprador.",
  },
  {
    q: "¿Solo manejan preventas?",
    a: "Manejamos proyectos en preventa y propiedades residenciales (casas, departamentos y terrenos) ya construidas.",
  },
  {
    q: "¿Verifican la situación legal de las propiedades?",
    a: "Sí, cada propiedad y proyecto pasa por una revisión legal antes de presentártelo.",
  },
  {
    q: "¿Puedo comprar con crédito hipotecario o Infonavit?",
    a: "Sí, te asesoramos sin importar tu forma de pago: contado, crédito hipotecario, Infonavit, Fovissste o esquemas mixtos.",
  },
];

export const budgetRanges = [
  { value: "lt2m", label: "Menos de $2 millones" },
  { value: "2-3m", label: "$2 a $3 millones" },
  { value: "3-5m", label: "$3 a $5 millones" },
  { value: "5-7m", label: "$5 a $7 millones" },
  { value: "7-10m", label: "$7 a $10 millones" },
  { value: "gt10m", label: "Más de $10 millones" },
] as const;

export const paymentMethods = [
  { value: "contado", label: "Contado" },
  { value: "credito_hipotecario", label: "Crédito hipotecario" },
  { value: "infonavit", label: "Infonavit" },
  { value: "fovissste", label: "Fovissste" },
  { value: "mixto", label: "Mixto" },
] as const;

export function formatPrice(value: number) {
  return value.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}
