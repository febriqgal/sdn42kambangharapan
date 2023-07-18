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
import ForgetPassword from "@/components/ForgetPassword";
export default function Login() {
  const route = useRouter();
  const auth = getAuth();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        route.replace("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <Head>
        <title>Login - SDN 42 Kambang Harapan</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-sm p-10 border shadow-2xl rounded-2xl">
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
            <Input.Password
              type="password"
              label="Password"
              placeholder="Masukkan password"
              {...register("password")}
            />
            <ForgetPassword />

            <SignUp />
            <Button type="submit" color={"primary"} className="bg-[#172554]">
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
