import { renderToBuffer } from "@react-pdf/renderer";
import { NextRequest, NextResponse } from "next/server";
import { getProjectBySlug } from "@/lib/data";
import ProjectPdfDocument from "@/lib/pdf/ProjectPdfDocument";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  const variant = request.nextUrl.searchParams.get("variant") === "plain" ? "plain" : "corporate";
  const buffer = await renderToBuffer(
    <ProjectPdfDocument project={project} variant={variant} baseUrl={request.nextUrl.origin} />
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="kaivo-${project.slug}-${variant}.pdf"`,
    },
  });
}
