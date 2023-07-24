import { Button, Input } from "@nextui-org/react";
import Head from "next/head";
import React from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import SignUp from "@/components/SignUp";
import { toast, Toaster } from "react-hot-toast";
import ForgetPassword from "@/components/ForgetPassword";
export default function Login() {
  const route = useRouter();
  const auth = getAuth();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const push = async () => {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setTimeout(() => {
        route.replace("/");
      }, 2000);
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil login</b>,
      error: (error) => {
        if (error.code === "auth/wrong-password") {
          toast.error("Password Salah!");
        } else if (error.code === "auth/user-not-found") {
          toast.error("Email tidak terdaftar!");
        } else {
          toast.error(
            "Tidak bisa login! karena banyak upaya login yang gagal, cobalah beberapa saat lagi!"
          );
        }
      },
    });
    reset();
  };

  return (
    <>
      <Toaster />
      <Head>
        <title>Login - SDN 42 Kambang Harapan</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[300px] p-10 border shadow-2xl rounded-2xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <Input
              type="email"
              label="Email"
              placeholder="Masukkan email"
              {...register("email")}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Masukkan password"
              {...register("password")}
            />
            <ForgetPassword />

            <SignUp />
            <Button type="submit" color={"primary"}>
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
