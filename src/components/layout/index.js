import Link from "next/link";
import React from "react";
import NavbarC from "../Navbar";
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
