import { db } from "@/server/db";
import { Spinner } from "@nextui-org/react";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { doc, collection, query, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/context/user";

export default function Pdf() {
  const [isLoading, setIsloading] = useState(true);
  const route = useRouter();
  const { pdf } = route.query;
  const users = useUser();
  const { email } = users;
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const snapshot = useRef(null);
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const getDBFromFirestore = async () => {
    const querySnapshot = query(collection(db, "pendaftaran"));
    const gettt = await getDocs(querySnapshot);
    snapshot.current = gettt.docs;
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  useEffect(() => {
    getDBFromFirestore();
  }, []);
  if (isLoading) {
    return (
      <div className={"flex justify-center items-center min-h-screen"}>
        <Spinner color={"currentColor"} />
      </div>
    );
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    console.log(data);
    const styles = StyleSheet.create({
      table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      },
      tableRow: {
        margin: "auto",
        flexDirection: "row",
      },
      tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCell: {
        textAlign: "left",

        margin: 5,
        fontSize: 10,
      },
    });
    return (
      <PDFViewer className="w-full h-screen">
        <Document>
          <Page
            size="A4"
            style={{ marginVertical: 32, marginLeft: 32, paddingRight: 64 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Laporan Hasil Seleksi PPBD SDN 42 Kambang Harapan
            </Text>
            <Text
              style={{ textAlign: "center", marginBottom: 32, fontSize: 16 }}
            >
              Tahun Ajaran 2023 - 2024
            </Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View
                  style={{
                    width: 20,
                    textAlign: "center",
                    paddingTop: 5,
                    borderRight: 1,
                    marginBottom: 1,
                    borderBottom: 1,
                  }}
                >
                  <Text style={{ fontSize: 10 }}>No.</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>NIK</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Nama</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Alamat</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Keterangan</Text>
                </View>
              </View>
              {data.map((e, i) => {
                const res = e.data();
                return (
                  <View key={i} style={styles.tableRow}>
                    <View
                      style={{
                        width: 20,
                        borderRight: 1,
                        borderBottom: 1,
                        borderStyle: "solid",
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderTopWidth: 0,
                      }}
                    >
                      <Text
                        style={{ fontSize: 10, paddingTop: 5, paddingLeft: 2 }}
                      >
                        {i + 1}.
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{res.nik}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{res.nmlengkap}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{res.alamat}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{res.ket}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    );
  }
}
