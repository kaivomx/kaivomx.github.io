import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import type { Project } from "@/lib/content";
import { formatPrice, company } from "@/lib/content";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#17181c" },
  logo: { fontSize: 18, letterSpacing: 3, marginBottom: 20 },
  title: { fontSize: 20, marginBottom: 4 },
  developer: { fontSize: 11, color: "#555", marginBottom: 16 },
  sectionTitle: { fontSize: 10, letterSpacing: 1, color: "#777", marginBottom: 6, marginTop: 16 },
  specsRow: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  specBox: { width: "22%", marginBottom: 10 },
  specLabel: { fontSize: 9, color: "#777" },
  specValue: { fontSize: 13 },
  description: { fontSize: 11, lineHeight: 1.5 },
  image: { width: "100%", height: 220, objectFit: "cover", marginTop: 10 },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, borderTop: "1 solid #ddd", paddingTop: 10, fontSize: 9, color: "#777" },
});

export default function ProjectPdfDocument({
  project,
  variant,
  baseUrl,
}: {
  project: Project;
  variant: "corporate" | "plain";
  baseUrl: string;
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {variant === "corporate" && <Text style={styles.logo}>KAIVO</Text>}

        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.developer}>Desarrollado por {project.developer}</Text>

        <View style={styles.specsRow}>
          <View style={styles.specBox}>
            <Text style={styles.specLabel}>Desde</Text>
            <Text style={styles.specValue}>{formatPrice(project.priceFrom)}</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specLabel}>Entrega</Text>
            <Text style={styles.specValue}>{project.delivery}</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specLabel}>Metraje</Text>
            <Text style={styles.specValue}>{project.m2}</Text>
          </View>
          <View style={styles.specBox}>
            <Text style={styles.specLabel}>Unidades</Text>
            <Text style={styles.specValue}>{project.units}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>SOBRE EL PROYECTO</Text>
        <Text style={styles.description}>{project.description}</Text>

        {project.image && (
          <Image
            src={project.image.startsWith("http") ? project.image : `${baseUrl}${project.image}`}
            style={styles.image}
          />
        )}

        {variant === "corporate" && (
          <View style={styles.footer} fixed>
            <Text>KAIVO Real Estate · {company.phoneDisplay} · {company.email}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
}
