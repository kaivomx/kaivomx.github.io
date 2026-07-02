import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import type { Property } from "@/lib/content";
import { formatPrice, company } from "@/lib/content";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica", color: "#17181c" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  logo: { fontSize: 18, letterSpacing: 3 },
  title: { fontSize: 20, marginBottom: 4 },
  location: { fontSize: 11, color: "#555", marginBottom: 10 },
  price: { fontSize: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 10, letterSpacing: 1, color: "#777", marginBottom: 6, marginTop: 16 },
  specsRow: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  specBox: { width: "22%", marginBottom: 10 },
  specLabel: { fontSize: 9, color: "#777" },
  specValue: { fontSize: 13 },
  description: { fontSize: 11, lineHeight: 1.5 },
  amenity: { fontSize: 10, marginBottom: 3 },
  images: { flexDirection: "row", gap: 8, marginTop: 10 },
  image: { width: "48%", height: 140, objectFit: "cover" },
  footer: { position: "absolute", bottom: 30, left: 40, right: 40, borderTop: "1 solid #ddd", paddingTop: 10, fontSize: 9, color: "#777" },
});

export default function PropertyPdfDocument({ property, variant }: { property: Property; variant: "corporate" | "plain" }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {variant === "corporate" && <Text style={styles.logo}>KAIVO</Text>}
        </View>

        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>{property.location}</Text>
        <Text style={styles.price}>{formatPrice(property.price)}</Text>

        <Text style={styles.sectionTitle}>FICHA TÉCNICA</Text>
        <View style={styles.specsRow}>
          {property.m2Terreno && (
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Terreno</Text>
              <Text style={styles.specValue}>{property.m2Terreno} m²</Text>
            </View>
          )}
          {property.m2Construccion && (
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Construcción</Text>
              <Text style={styles.specValue}>{property.m2Construccion} m²</Text>
            </View>
          )}
          {property.beds && (
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Recámaras</Text>
              <Text style={styles.specValue}>{property.beds}</Text>
            </View>
          )}
          {property.baths && (
            <View style={styles.specBox}>
              <Text style={styles.specLabel}>Baños</Text>
              <Text style={styles.specValue}>{property.baths}</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>DESCRIPCIÓN</Text>
        <Text style={styles.description}>{property.description}</Text>

        <Text style={styles.sectionTitle}>AMENIDADES</Text>
        {property.amenities.map((a) => (
          <Text key={a} style={styles.amenity}>• {a}</Text>
        ))}

        {property.images.length > 0 && (
          <View style={styles.images}>
            {property.images.slice(0, 2).map((img) => (
              <Image key={img} src={img.startsWith("http") ? img : `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}${img}`} style={styles.image} />
            ))}
          </View>
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
