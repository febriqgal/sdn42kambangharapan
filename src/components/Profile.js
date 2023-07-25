import { getAuth } from "firebase/auth";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
export default function ProfileC() {
  const route = useRouter();
  const auth = getAuth();
  const user = getAuth().currentUser;
  console.log(user);
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse opacity="0.4" cx="12" cy="17" rx="7" ry="4" fill="#ffff" />
            <circle cx="12" cy="7" r="4" fill="#ffff" />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        {user ? (
          <DropdownItem
            onPress={() => {
              route.push(user?.email != "admin@gmail.com" ? "/user" : "/admin");
            }}
            key="copy"
          >
            Dashboard
          </DropdownItem>
        ) : (
          <DropdownItem></DropdownItem>
        )}
        {user ? (
          <DropdownItem
            onPress={async () => {
              await signOut(auth);
              route.reload();
            }}
            key="delete"
          >
            Keluar
          </DropdownItem>
        ) : (
          <DropdownItem
            onPress={() => {
              route.push("/login");
            }}
          >
            Masuk
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
