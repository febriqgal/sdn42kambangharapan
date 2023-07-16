import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "@/context/user";
import LogoSD from "./icon/logo";
export default function NavbarC() {
  const user = getAuth().currentUser;
  const auth = getAuth();
  const route = useRouter();
  const navigation = [
    { title: "Beranda", href: "/" },
    { title: "Pengumuman", href: "/pengumuman" },
    { title: "Hasil Seleksi", href: "/hasil-seleksi" },
    { title: "Pendaftaran", href: "/pendaftaran" },
  ];

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand>
        <Navbar.Toggle
          aria-label="toggle navigation"
          className="mr-4 sm:hidden"
        />
        <LogoSD className={"h-10 mr-2"} />

        <Text b color="inherit">
          SDN 42 Kambang Harapan
        </Text>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
        {navigation.map((e, i) => {
          return (
            <Link
              key={i}
              className={route.pathname != e.href ? "" : "font-bold"}
              href={e.href}
            >
              {e.title}
            </Link>
          );
        })}
        {user ? (
          <Button
            onPress={async () => {
              await signOut(auth);
            }}
            className="text-white bg-red-500"
            size={"sm"}
          >
            Keluar
          </Button>
        ) : (
          <Button
            onPress={() => {
              route.push("/login");
            }}
            flat
            bordered
            className="bg-[#172554] text-white"
            size={"sm"}
          >
            Login
          </Button>
        )}
      </Navbar.Content>

      <Navbar.Collapse>
        {navigation.map((item, index) => (
          <Navbar.CollapseItem key={index}>
            <Link href={item.href}>{item.title}</Link>
          </Navbar.CollapseItem>
        ))}
        {user ? (
          <button
            className="text-lg text-red-500"
            onClick={async () => {
              await signOut(auth);
            }}
          >
            Keluar
          </button>
        ) : (
          <button
            className="text-lg"
            onClick={() => {
              route.push("/login");
            }}
          >
            Login
          </button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
