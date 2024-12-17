import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import {
  formatDate,
  formatDateNumber,
  formatNumberToCurrency,
} from "@/utils/format-helpers";

// Variables de estilo
const colors = {
  erieBlack: "#1C2321",
  jungleGreen: "#49A078",
  jungleGreenHover: "#1b6b45",
  antiFlashWhite: "#EEEEEE",
  tropicalIndigo: "#8D85C1",
  tropicalIndigoHover: "#7a68f1",
  periwinkle: "#D4CDF4",
  vistaBlue: "#72A1E5",
  poppyRed: "#DF2935",
  safetyOrange: "#EC7505",
  grisClaro: "#dcddf3",
};

// Estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: colors.periwinkle,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    color: colors.erieBlack,
    fontWeight: "bold",
  },
  headerNombre: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 20,
    color: colors.tropicalIndigo,
  },
  institutionInfo: {
    marginBottom: 20,
    textAlign: "center",
    color: colors.erieBlack,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  personalInfo: {
    marginBottom: 20,
    backgroundColor: colors.antiFlashWhite,
    padding: 10,
    borderRadius: 8,
    border: `1 solid ${colors.tropicalIndigo}`,
  },
  infoTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.erieBlack,
  },
  table: {
    display: "table",
    width: "auto",
    border: `1 solid ${colors.tropicalIndigo}`,
    borderRadius: 8,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: colors.tropicalIndigo,
    color: colors.antiFlashWhite,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: colors.grisClaro,
  },
  tableCol: {
    width: "33.33%",
    border: `1 solid ${colors.tropicalIndigo}`,
    padding: 5,
  },
  tableCellT: {
    margin: "auto",
    fontSize: 14,
    fontWeight: "bold",
  },
  tableCell: {
    margin: "auto",
    fontSize: 12,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: colors.jungleGreen,
  },
  signature: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBox: {
    width: "45%",
    textAlign: "center",
    borderTop: 1,
    borderColor: colors.erieBlack,
    paddingTop: 5,
  },
});

const PdfRecibo = ({ alumno, pago }) => {
  if (!alumno || !pago) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <Image style={styles.logo} src="/logo-isp.png" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.header}>
              Cooperadora Instituto Superior de Profesorado N°20
            </Text>
            <Text style={styles.headerNombre}>Senador Néstor Juan Zamaro</Text>
          </View>
        </View>
        <View style={styles.institutionInfo}>
          <Text>Bv. Patria, Bv. Libertad y calle las Magnolias</Text>
          <Text>Teléfono: (54)9 3498 4526026</Text>
          <Text>Email: secretariaisp20@gmail.com</Text>
        </View>
        <View style={styles.personalInfo}>
          <Text style={styles.infoTexto}>
            Se ha recibido el importe según detalle, del alumno{" "}
            {alumno.apellido} {alumno.nombre} con DNI: {alumno.dni}.
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Fecha</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Detalle del Pago</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCellT}>Monto</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {pago.cobro_id ? formatDateNumber(pago.fechaCreacion) : "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {pago.cobro_id ? pago.cobro_id.titulo : "N/A"}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {pago.cobro_id
                  ? formatNumberToCurrency(pago.cobro_id.monto)
                  : "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.total}>
          Total:{" "}
          {pago.cobro_id
            ? formatNumberToCurrency(pago.cobro_id.monto)
            : "N/A"}
        </Text>
        <View style={styles.signature}>
          <View style={styles.signatureBox}>
            <Text>Firma del Alumno</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text>Firma y Sello directivo</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfRecibo;
