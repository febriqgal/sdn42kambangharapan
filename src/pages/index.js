/* eslint-disable @next/next/no-img-element */
import Persyaratan from "@/components/ModalPersyaratan";
import Layout from "@/components/layout";
import { useUser } from "@/context/user";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const route = useRouter();
  const user = useUser().uid;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  });
  return (
    <Layout>
      <Head>
        <title>SDN 42 Kambang Harapan</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <section className="relative  bg-[url(https://images.unsplash.com/photo-1665664660924-255a6167f498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 w-full bg-primary-100 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="">
          <div className="flex items-center justify-center w-full h-screen px-10 py-4 text-center text-white bg-opacity-50 bg-primary-100">
            <div className="-mt-[70px]">
              <p className="text-xl">
                Selamat datang di Website resmi pendaftaran siswa baru
              </p>
              <h1 className="text-2xl font-extrabold sm:text-5xl">
                SDN 42 Kambang Harapan
              </h1>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
