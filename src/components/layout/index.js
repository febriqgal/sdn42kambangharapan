import Link from "next/link";
import React from "react";
import NavbarC from "../navbar";
import FooterC from "../footer";

export default function Layout({ children }) {
  return (
    <>
      <NavbarC />
      <main>{children}</main>
      <FooterC />
    </>
  );
}
