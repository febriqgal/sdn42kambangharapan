import AuthStateChangeProvider from "@/context/auth";
import { UserProvider } from "@/context/user";
import "@/styles/globals.css";
import * as React from "react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    type: "light",
    theme: {
      colors: {
        primary: "#172554",
      },
      space: {},
      fonts: {},
    },
  });
  return (
    <>
      <Head>
        <title>SDN 42 Kambang Harapan</title>
      </Head>
      <UserProvider>
        <AuthStateChangeProvider>
          <NextUIProvider theme={theme}>
            <NextNProgress color="#172554" />
            <Component {...pageProps} />
          </NextUIProvider>
        </AuthStateChangeProvider>
      </UserProvider>
    </>
  );
}
