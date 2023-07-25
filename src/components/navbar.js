import { Button, Navbar, Text } from "@nextui-org/react";
import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import ProfileC from "./Profile";
import LogoSD from "./icon/logo";
import Image from "next/image";
export default function NavbarC() {
  const user = getAuth().currentUser;
  const auth = getAuth();
  const route = useRouter();
  const navigation = [
    { title: "Beranda", href: "/" },
    { title: "Pengumuman", href: "/pengumuman" },
    { title: "Hasil Seleksi", href: "/hasil-seleksi" },
  ];

  return (
    <nav className="fixed top-0 z-50 flex items-center justify-between w-full px-20 bg-gradient-to-br from-primary-100 to-primary-200">
      <div className="flex items-center justify-center">
        <LogoSD className={"h-11 mr-2"} />
        <h1 className="font-bold text-white">SDN 42 Kambang Harapan</h1>
      </div>
      <div className="flex items-center gap-3 py-4">
        {navigation.map((e, i) => {
          return (
            <Button
              variant={route.pathname != e.href ? "light" : "flat"}
              onPress={() => {
                route.push(e.href);
              }}
              className={"text-white"}
              href={e.href}
              key={i}
            >
              {e.title}
            </Button>
          );
        })}
        <ProfileC />
      </div>
    </nav>
  );
}
