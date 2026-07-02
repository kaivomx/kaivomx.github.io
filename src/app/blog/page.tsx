export const metadata = { title: "Blog | KAIVO Real Estate" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl mb-4">Blog</h1>
      <p className="max-w-2xl text-black/70 mb-16">
        Muy pronto encontrarás aquí artículos sobre el mercado inmobiliario, guías de inversión y
        actualizaciones de nuestros proyectos en preventa.
      </p>
      <div className="border border-dashed border-black/15 rounded-lg p-12 text-center text-black/40 text-sm">
        Aún no hay artículos publicados.
      </div>
    </div>
  );
}
