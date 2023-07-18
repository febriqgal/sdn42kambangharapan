import { Document, PDFViewer, Page, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
export default function Pdf() {
  const nama = "febriqgal";
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page
          size="A4"
          style={{ marginVertical: 32, marginLeft: 32, paddingRight: 64 }}
        >
          <View>
            <Text style={{ textAlign: "center" }}>
              Bukti Lulus Selekti Masuk SDN 42 Kambang Harapan
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 64,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingRight: 16,
                }}
              >
                <Text style={{ marginTop: 8, fontSize: 10 }}>{`Nama`}</Text>
                <Text
                  style={{ marginTop: 8, fontSize: 10 }}
                >{`Jenis Kelamin`}</Text>
                <Text
                  style={{ marginTop: 8, fontSize: 10 }}
                >{`Tempat, Tanggal Lahir`}</Text>
                <Text style={{ marginTop: 8, fontSize: 10 }}>{`Agama`}</Text>
                <Text style={{ marginTop: 8, fontSize: 10 }}>{`Alamat`}</Text>
              </View>
              <View>
                <Text
                  style={{ marginTop: 8, fontSize: 10 }}
                >{`: Febriqgal Purnama`}</Text>
                <Text
                  style={{ marginTop: 8, fontSize: 10 }}
                >{`: Laki - Laki`}</Text>
                <Text
                  style={{ marginTop: 8, fontSize: 10 }}
                >{`: Pasar Surantih`}</Text>
                <Text style={{ marginTop: 8, fontSize: 10 }}>{`: Islam`}</Text>
                <Text
                  style={{ marginTop: 8, fontSize: 10 }}
                >{`: Ps. Surantih`}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 10, marginTop: 32 }}>
              Berdasarkan hasil seleksi berkas administrasi dan test yang telah
              dilakukannya, maka dihasilan keputusan
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>LULUS</Text>
            <Text style={{ fontSize: 10, marginTop: 32 }}>
              Dengan ini menyatakan bahwa Febriqgal purnama telah lulus melewati
              segala seleksi tes yang telah di laksanakan dengan baik.
            </Text>
            <View style={{ marginTop: 60 }}>
              <Text
                style={{ textAlign: "right", fontSize: 10 }}
              >{`Padang, ${dayjs().format("DD/MM/YYYY")}`}</Text>
              <Text style={{ textAlign: "right", fontSize: 10, marginTop: 30 }}>
                Kepala Sekolah
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
