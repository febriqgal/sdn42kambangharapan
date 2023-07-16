import Layout from "@/components/layout";
import protectLogin from "@/protect/protect-login";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import Head from "next/head";
const pendaftaran = () => {
  return (
    <Layout>
      <Head>
        <title>Pendaftaran - SDN 42 Kambang Harapan</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen py-5">
        <form className="grid w-full grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:max-w-2xl">
          <Input label="Nama Lengkap" />
          <Input label="Tempat Lahir" />
          <Input label="Jenis Kelamin" />
          <Input type="date" label="Tanggal Lahir" />
          <Input label="Agama" />
          <Input label="Alamat" />
          <Input label="Tk Asal (Jika Ada)" />
          <Input type="number" label="No. Hp yang bisa dihubungi" />
          <Input label="Nama Ayah" />
          <Input type="date" label="Tanggal Lahir Ayah" />
          <Input label="Pendidikan Ayah" />
          <Input label="Pekerjaan Ayah" />
          <Input label="Agama Ayah" />
          <Input label="Alamat Ayah" />
          <Input label="Nama Ibu" />
          <Input type="date" label="Tanggal Lahir Ibu" />
          <Input label="Pendidikan Ibu" />
          <Input label="Pekerjaan Ibu" />
          <Input label="Agama Ibu" />
          <Input label="Alamat Ibu" />
          <Input type="file" label="Upload KK" />
          <Input type="file" label="Upload Akta Kelahiran" />
          <Input type="file" label="Upload Ijazah TK (Jika Ada)" />
          <Input type="file" label="Upload KTP (Ayah / Ibu)" />
          <Input
            type="file"
            label="Upload Kartu Indonesia Pintar  (Jika Ada)"
          />
          <Button className="bg-[#172554] sm:mt-7">Kirim</Button>
        </form>
      </div>
    </Layout>
  );
};
export default protectLogin(pendaftaran);
