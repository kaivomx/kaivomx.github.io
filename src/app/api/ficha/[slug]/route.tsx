import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { getPropertyBySlug } from "@/lib/data";
import PropertyPdfDocument from "@/lib/pdf/PropertyPdfDocument";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  }

  const variant = request.nextUrl.searchParams.get("variant") === "plain" ? "plain" : "corporate";
  const buffer = await renderToBuffer(
    <PropertyPdfDocument property={property} variant={variant} baseUrl={request.nextUrl.origin} />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="kaivo-${property.slug}-${variant}.pdf"`,
    },
  });
}
