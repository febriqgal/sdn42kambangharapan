/* eslint-disable @next/next/no-img-element */
import LayoutUser from "@/components/layout/layout-user";
import { db } from "@/server/db";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import dibuat from "../../../../public/dibuat.svg";
import dilihat from "../../../../public/dilihat.svg";
import penulis from "../../../../public/penulis.svg";
import { useUser } from "../../../context/user";
import styles from "../../../styles/Home.module.css";

export default function Detail() {
  const [isLoading, setIsloading] = useState(true);
  const route = useRouter();
  const { detailpendaftaran } = route.query;
  const users = useUser();
  const { email } = users;
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  const snapshot = useRef(null);
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const datapengumuman = async () => {
    const docRef = doc(db, "pendaftaran", `${detailpendaftaran}`);
    const docSnap = await getDoc(docRef);
    snapshot.current = docSnap.data();
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
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
      <LayoutUser>
        <Toaster />
        <Head>
          <title>{post.nmlengkap}</title>
          <meta name="description" content={post.isi} />
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="flow-root px-20 py-3 border border-gray-100 rounded-lg shadow-sm">
          <h1 className="mb-5 font-bold text-center">
            Detail Pendaftaran {post.nmlengkap}
          </h1>
          <dl className="-my-3 text-sm divide-y divide-gray-100">
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nama Lengkap</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.nmlengkap}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Tempat Lahir</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {post.tempatlahir}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Tanggal Lahir</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.tgllahir}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Umur</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.umur}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Jenis Kelamin</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {post.jeniskelamin}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Agama</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.agama}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Alamat</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.alamat}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nik</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.nik}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nama Ayah</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.nmayah}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Agama Ayah</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.agamaayah}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Pekerjaan Ayah</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {post.pekerjaanayah}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Nama Ibu</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.nmibu}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Agama Ibu</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.agamaibu}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Pekerjaan Ibu</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {post.pekerjaanibu}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">No. HP</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.nohp}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Prestasi</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {post.prestasi != "" ? post.prestasi : "-"}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Jarak Rumah</dt>
              <dd className="text-gray-700 sm:col-span-2">{post.jarak} KM</dd>
            </div>
          </dl>
        </div>
      </LayoutUser>
    );
  }
}
