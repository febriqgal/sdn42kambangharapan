/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layout";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>SDN 42 Kambang Harapan</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <section className="relative  bg-[url(https://images.unsplash.com/photo-1665664660924-255a6167f498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative max-w-screen-xl px-4 py-32 mx-auto sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-10">
          <div className="max-w-2xl px-10 py-4 text-center bg-white bg-opacity-50 rounded-xl ltr:sm:text-left rtl:sm:text-right">
            <p className="text-xl">
              Selamat datang di Website resmi pendaftaran siswa baru
            </p>
            <h1 className="text-2xl font-extrabold sm:text-5xl">
              SDN 42 Kambang Harapan
            </h1>
            <div className="flex items-center justify-center gap-4 mt-5">
              <Link
                href="/login"
                className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-primary focus:outline-none focus:ring sm:w-auto"
              >
                Login
              </Link>

              <Link
                href="/pengumuman"
                className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-primary hover:text-primary focus:outline-none focus:ring sm:w-auto"
              >
                Pengumuman
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
