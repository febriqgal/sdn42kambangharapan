import Image from "next/image";
import Head from "next/head";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SDN 42 Kambang Harapan</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <h1>Home</h1>
      </div>
    </Layout>
  );
}
