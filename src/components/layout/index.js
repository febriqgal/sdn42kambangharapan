import React from "react";
import FooterC from "../footer";
import NavbarC from "../navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavbarC />
      <main>{children}</main>
      <FooterC />
    </>
  );
}
