import Link from "next/link";
import React from "react";

import FooterC from "../footer";
import NavbarC from "../Navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavbarC />
      <main>{children}</main>
      <FooterC />
    </>
  );
}
