import Layout from "@/components/layout";
import { StyleSheet } from "@react-pdf/renderer";
import Head from "next/head";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SDN 42 Kambang Harapan</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className=""></div>
    </Layout>
  );
}
