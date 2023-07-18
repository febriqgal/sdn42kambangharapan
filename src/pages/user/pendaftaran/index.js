import protectLogin from "@/protect/protect-login";
import { db } from "@/server/db";
import app from "@/server/db";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { getAuth } from "firebase/auth";
import { addDoc,setDoc, collection, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "react-hot-toast";
import layoutUser from "@/components/layout/layout-user";
import LayoutUser from "@/components/layout/layout-user";
import { useUser } from "@/context/user";
const Pendaftaran = () => {
  const uidUser = useUser().uid
   
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const { register, handleSubmit, control, reset } = useForm();
  const uid = uuidv4();
  const auth = getAuth();
  const user = auth.currentUser;
  const [imageUpload2, setImageUpload2] = useState();
  const storage = getStorage(app);
  const storageRef = ref(storage, `image/pendaftaran/${uid}`);

  const addDatafromDBFirestore = async (data) => {
    const push = async () => {
      await uploadBytes(storageRef, imageUpload2);
      await setDoc(doc(db, "pendaftaran",uidUser), {
        uid: user.uid,
        nmlengkap: data.namalengkap,
        tempatlahir: data.tempatlahir,
        tgllahir: data.tanggallahir,
        jeniskelamin: data.jeniskelamin,
        agama: data.agama,
        alamat: data.alamat,
        nik: data.nik,
        nmayah: data.namaayah,
        agamaayah: data.agamaayah,
        pekerjaanayah: data.pekerjaanayah,
        nmibu: data.namaibu,
        agamaibu: data.agamaibu,
        pekerjaanibu: data.pekerjaanibu,
        nohp: data.nohp,
        pdf: storageRef.name,
        ket: "-",
      });
    };
    toast.promise(push(), {
      loading: "Mohon tunggu...",
      success: <b>Berhasil menambahkan pendaftaran</b>,
      error: <b>Error</b>,
    });
  };

  return (
    <LayoutUser>
      <Toaster />
      <Head>
        <title>Pendaftaran - SDN 42 Kambang Harapan</title>
      </Head>
      
        <form
          onSubmit={handleSubmit(addDatafromDBFirestore)}
          className="grid w-full grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:max-w-2xl"
        >
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
              {...register("namalengkap", { required: false })}
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
              {...register("tempatlahir", { required: false })}
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
              {...register("tanggallahir", { required: false })}
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
              {...register("jeniskelamin", { required: false })}
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
              {...register("agama", { required: false })}
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
              {...register("alamat", { required: false })}
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
              {...register("nik", { required: false })}
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
              {...register("namaayah", { required: false })}
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
              {...register("agamaayah", { required: false })}
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
              {...register("pekerjaanayah", { required: false })}
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
              {...register("namaibu", { required: false })}
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
              {...register("agamaibu", { required: false })}
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
              {...register("pekerjaanibu", { required: false })}
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
              {...register("nohp", { required: false })}
            />
          </label>

          <label
            htmlFor="gambarkk"
            className="block px-3 py-2 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <span className="text-xs font-medium text-gray-700">{`Upload KK & Akta (Jadikan dalam 1 file PDF)`}</span>

            <input
              type="file"
              id="gambarkk"
              className="w-full p-0 mt-1 border-none focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
              onChange={(event) => {
                setImageUpload2(event.target.files[0]);
              }}
            />
          </label>
          <Button type="submit" className="bg-[#172554] sm:mt-7">
            Kirim
          </Button>
        </form>
     
    </LayoutUser>
  );
};
export default protectLogin(Pendaftaran);