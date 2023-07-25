/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { db } from "@/server/db";
import styles from "../../../../styles/Home.module.css";
export default function detail() {
  const { register, handleSubmit, control } = useForm();
  const [isLoading, setIsloading] = useState(true);
  const route = useRouter();
  const { id } = route.query;
  const snapshot = useRef(null);
  const [isDisable, setIsDisble] = useState(false);
  dayjs.locale("id");
  dayjs.extend(relativeTime);

  const datapengumuman = async () => {
    const docRef = doc(db, "pengumuman", `${id}`);
    const docSnap = await getDoc(docRef);
    snapshot.current = docSnap.data();
    setIsloading(false);
  };
  const updateDataa = async (data) => {
    const push = async () => {
      const docRef = doc(db, "pengumuman", `${id}`);
      await updateDoc(docRef, {
        judul: data.judul,
        isi: data.isi,
      });
    };
    toast.promise(push(), {
      loading: "Menyimpan...",
      success: <b>Berhasil edit pengumuman</b>,
      error: <b>Terjadi kesalahan, silahkan coba lagi!</b>,
    });
    setIsDisble(true);
  };

  useEffect(() => {
    datapengumuman();
  });
  if (isLoading) {
    return (
      <div className={styles.main}>
        <Spinner color={"currentColor"} />
      </div>
    );
  } else {
    const post = snapshot.current;

    return (
      <div className={styles.main}>
        <Toaster />
        <form
          className="flex flex-col text-slate-900 w-full px-5 sm:w-[500px]"
          onSubmit={handleSubmit(updateDataa)}
        >
          <label className="mb-2 text-center">
            Judul
            <textarea
              className="w-full px-3 py-1 mb-2 mr-2 rounded-lg shadow-lg"
              placeholder="Masukan judul*"
              control={control}
              disabled={isDisable}
              defaultValue={post ? post.judul : ""}
              {...register("judul", { required: true })}
            />
          </label>
          <label className="mb-2 text-center">
            Isi pengumuman
            <textarea
              rows={"10"}
              className="w-full px-3 py-1 mb-2 mr-2 rounded-lg shadow-lg"
              placeholder="Masukan isi*"
              control={control}
              disabled={isDisable}
              defaultValue={post ? post.isi : ""}
              {...register("isi")}
            />
          </label>
          <Button
            onClick={async () => {
              const docRef = doc(db, "pengumuman", `${id}`);
              const storage = getStorage(app);
              const desertRef = ref(storage, `image/pengumuman/${post.gambar}`);
              await deleteObject(desertRef);
              await deleteDoc(docRef);
              route.replace("/");
            }}
            className="px-3 py-1 mb-2 text-white bg-red-500 rounded-lg"
          >
            Hapus
          </Button>
          <Button
            disabled={isDisable}
            className="w-full px-3 py-1 mb-2 duration-1000 rounded-lg shadow-lg hover:bg-gray-900 hover:text-white hover:cursor-pointer"
            type="submit"
          >
            Kirim
          </Button>
        </form>
      </div>
    );
  }
}
