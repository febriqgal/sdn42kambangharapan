import AuthStateChangeProvider from "@/context/auth";
import { UserProvider } from "@/context/user";
import "@/styles/globals.css";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SDN 42 Kambang Harapan</title>
      </Head>
      <NextUIProvider>
        <UserProvider>
          <AuthStateChangeProvider>
            <NextNProgress color="#172554" />
            <Component {...pageProps} />
          </AuthStateChangeProvider>
        </UserProvider>
      </NextUIProvider>
    </>
  );
}
