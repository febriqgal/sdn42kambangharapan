import LogoSD from "@/components/icon/logo";
import protectAdmin from "@/protect/protect-admin";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["devanagari", "latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const LayoutAdmin = ({ children }) => {
  const route = useRouter();
  const navigation = [
    { title: "Beranda", href: "/admin" },
    { title: "Kelola Pendaftaran", href: "/admin/kelola-pendaftaran" },
    { title: "Tambah Pengumuman", href: "/admin/tambah-pengumuman" },
  ];
  return (
    <div className={poppins.className}>
      <nav className="flex items-center justify-between px-20 py-4 border-b-2">
        <Link
          title="Beranda SDN 42 Kambang Harapan"
          href={"/"}
          className="flex items-center justify-center"
        >
          <LogoSD className={"h-11 mr-2"} />
          <h1 className="text-xl font-bold">Dashboard Admin</h1>
        </Link>
        <nav className="flex gap-4">
          {navigation.map((e, i) => {
            return (
              <Link
                className={
                  route.pathname != e.href
                    ? ""
                    : "font-bold underline underline-offset-8"
                }
                key={i}
                href={e.href}
              >
                {e.title}
              </Link>
            );
          })}
        </nav>
      </nav>
      <main className="flex items-center justify-center ">{children}</main>
    </div>
  );
};
export default protectAdmin(LayoutAdmin);
