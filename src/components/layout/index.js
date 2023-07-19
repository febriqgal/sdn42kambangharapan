import React from "react";
import FooterC from "../footer";
import NavbarC from "../navbar";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function Layout({ children }) {
  return (
    <div className={poppins.className}>
      <NavbarC />
      <main className="mt-[70px]">{children}</main>
      <FooterC />
    </div>
  );
}
