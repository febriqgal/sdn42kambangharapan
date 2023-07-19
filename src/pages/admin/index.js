import LayoutAdmin from "@/components/layout/layout-admin";
import React from "react";
import Head from "next/head";
export default function Admin() {
  return (
    <LayoutAdmin>
      <Head>
        <title>Dashboard Admin - SDN 42 Kambang Harapan</title>
      </Head>
      <div className="mt-20 text-xl font-bold">Admin</div>
    </LayoutAdmin>
  );
}
