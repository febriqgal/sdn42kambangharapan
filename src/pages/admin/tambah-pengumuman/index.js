import LayoutAdmin from "@/components/layout/layout-admin";
import app, { db } from "@/server/db";
import { Button, Input, Textarea } from "@nextui-org/react";
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
import Head from "next/head";
export default function TambahPengumuman() {
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
    <LayoutAdmin>
      <Head>
        <title>Tambah Pengumuman - SDN 42 Kambang Harapan</title>
      </Head>
      <Toaster />
      <form
        className="flex flex-col gap-2 mt-10"
        onSubmit={handleSubmit(addDatafromDBFirestore)}
      >
        <Input
          label="Judul Pengumuman"
          placeholder="Masukan judul pengumuman"
          control={control}
          {...register("judul", { required: true })}
        />

        <Input
          label="Pilih Gambar"
          type="file"
          {...register("gambar")}
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />

        <Textarea
          label="Isi Pengumuman"
          placeholder="Masukan isi pengumuman"
          control={control}
          {...register("isi", { required: true })}
        />
        <Button className="bg-red-500" type="submit">
          Kirim
        </Button>
      </form>
    </LayoutAdmin>
  );
}
