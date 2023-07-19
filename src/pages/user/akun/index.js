import LayoutUser from "@/components/layout/layout-user";
import { Button, Loading } from "@nextui-org/react";
import "dayjs/locale/id";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

import { db } from "@/server/db";
export default function Index() {
  const route = useRouter();
  const user = getAuth().currentUser;
  const auth = getAuth();
  const userr = auth.currentUser;
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const push = async () => {
      updatePassword(userr, data.password);
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil Edit Akun</b>,
      error: <b>Error</b>,
    });
    route.replace("/login");
  };

  return (
    <LayoutUser>
      <Toaster />

      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="namalengkap"
          className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700">
            Nama Lengkap
          </span>

          <input
            type="text"
            id="namalengkap"
            defaultValue={user?.displayName ?? ""}
            disabled
            className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            {...register("namalengkap", { required: false })}
          />
        </label>
        <label
          htmlFor="email"
          className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700"> Email </span>

          <input
            type="email"
            id="email"
            disabled
            defaultValue={user?.email ?? ""}
            className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          />
        </label>
        <label
          htmlFor="password"
          className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
          <span className="text-xs font-medium text-gray-700"> Password </span>

          <input
            id="password"
            type="password"
            className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            {...register("password", { required: true })}
          />
        </label>
        <Button type="submit" className="bg-[#172554]">
          Kirim
        </Button>
      </form>
    </LayoutUser>
  );
}
