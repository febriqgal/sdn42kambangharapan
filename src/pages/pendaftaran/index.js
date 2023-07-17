import Layout from "@/components/layout";
import protectLogin from "@/protect/protect-login";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import Head from "next/head";
import LayoutAdmin from "@/components/layout/layout-admin";
import app, { db } from "@/server/db";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import InputC from "@/components/Input";
const Pendaftaran = () => {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { register, handleSubmit, control, reset } = useForm();
  const uid = uuidv4();
  const auth = getAuth();
  const user = auth.currentUser;
  const [imageUpload, setImageUpload] = useState();
  const storage = getStorage(app);
  const storageRef = ref(storage, `image/pengumuman/${uid}`);

  const addDatafromDBFirestore = async (data) => {
    const push = async () => {
      if (imageUpload == null) return;
      await uploadBytes(storageRef, imageUpload);
      await addDoc(collection(db, "pengumuman"), {
        judul: data.judul,
        isi: data.isi,
        penulis: "Admin",
        tanggal_pengumuman: dayjs().format("ddd, MMM D, YYYY HH:mm"),
        tanggal: dayjs().format(),
        dilihat: 0,
        gambar: storageRef.name,
      });
      reset();
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil menambahkan pengumuman</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi.</b>,
    });
  };

  return (
    <Layout>
      <Head>
        <title>Pendaftaran - SDN 42 Kambang Harapan</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen py-5">
        <form className="grid w-full grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:max-w-2xl">
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
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("namalengkap", { required: true })}
            />
          </label>
          <label
            htmlFor="tempatlahir"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Tempat Lahir
            </span>

            <input
              type="text"
              id="tempatlahir"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("tempatlahir", { required: true })}
            />
          </label>
          <label
            htmlFor="tanggallahir"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Tanggal Lahir
            </span>

            <input
              type="date"
              id="tanggallahir"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("tanggallahir", { required: true })}
            />
          </label>
          <label
            htmlFor="jeniskelamin"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Jenis Kelamin
            </span>

            <select
              id="jeniskelamin"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("jeniskelamin", { required: true })}
            >
              <option>-Pilih Jenis Kelamin-</option>
              <option value="Laki - Laki">Laki - Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </label>
          <label
            htmlFor="agama"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">Agama</span>

            <select
              id="agama"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("agama", { required: true })}
            >
              <option>-Pilih agama-</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
            </select>
          </label>
          <label
            htmlFor="alamat"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">Alamat</span>

            <input
              type="text"
              id="alamat"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("alamat", { required: true })}
            />
          </label>
          <label
            htmlFor="nik"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">NIK</span>

            <input
              type="number"
              id="nik"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("nik", { required: true })}
            />
          </label>
          <label
            htmlFor="namaayah"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">Nama Ayah</span>

            <input
              type="text"
              id="namaayah"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("namaayah", { required: true })}
            />
          </label>
          <label
            htmlFor="agamaayah"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Agama Ayah
            </span>

            <select
              id="agamaayah"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("agamaayah", { required: true })}
            >
              <option>-Pilih agama ayah-</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
            </select>
          </label>
          <label
            htmlFor="pekerjaanayah"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Pekerjaan Ayah
            </span>

            <input
              type="text"
              id="pekerjaanayah"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("pekerjaanayah", { required: true })}
            />
          </label>
          <label
            htmlFor="namaibu"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">Nama Ibu</span>

            <input
              type="text"
              id="namaibu"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("namaibu", { required: true })}
            />
          </label>
          <label
            htmlFor="agamaibu"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">Agama Ibu</span>

            <select
              id="agamaibu"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("agamaibu", { required: true })}
            >
              <option>-Pilih agama ibu-</option>
              <option value="Islam">Islam</option>
              <option value="Kristen">Kristen</option>
            </select>
          </label>
          <label
            htmlFor="pekerjaanibu"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Pekerjaan Ibu
            </span>

            <input
              type="text"
              id="pekerjaanibu"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("pekerjaanibu", { required: true })}
            />
          </label>
          <label
            htmlFor="nohp"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">No. HP</span>

            <input
              type="tel"
              id="nohp"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("nohp", { required: true })}
            />
          </label>
          <label
            htmlFor="gambarakta"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">
              Gambar Akta
            </span>

            <input
              type="file"
              id="gambarakta"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("gambarakta", { required: true })}
            />
          </label>
          <label
            htmlFor="gambarkk"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">Gambar KK</span>

            <input
              type="file"
              id="gambarkk"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              {...register("gambarkk", { required: true })}
            />
          </label>
          <Button className="bg-[#172554] sm:mt-7">Kirim</Button>
        </form>
      </div>
    </Layout>
  );
};
export default protectLogin(Pendaftaran);
