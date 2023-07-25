/* eslint-disable @next/next/no-img-element */
import { db } from "@/server/db";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { doc, getDoc } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import dibuat from "../../../../public/dibuat.svg";
import dilihat from "../../../../public/dilihat.svg";
import edit from "../../../../public/edit.svg";
import penulis from "../../../../public/penulis.svg";
import Layout from "../../../components/layout";
import { useUser } from "../../../context/user";
import styles from "../../../styles/Home.module.css";
import ModalHapus from "./ModalHapus";
export default function Detail() {
  const [isLoading, setIsloading] = useState(true);
  const route = useRouter();
  const { id } = route.query;
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
    const docRef = doc(db, "pengumuman", `${id}`);
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
      <Layout>
        <Toaster />
        <Head>
          <title>{post.judul}</title>
          <meta name="description" content={post.isi} />
          <link rel="icon" href="/logo.png" />
        </Head>
        <div className="mx-0 mb-5 overflow-hidden bg-white rounded-b-xl lg:mx-5 ">
          <div className="relative px-5 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 left-3/4" />
            <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
              <div className="flex flex-col gap-1 p-4 rounded-lg shadow-xl lg:flex-row lg:gap-0 lg:justify-evenly">
                <div className="flex items-center gap-2">
                  <Image src={penulis} width={20} alt={"#"} />
                  <h2 className="text-xs">{post.penulis}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={dilihat} width={20} alt={"#"} />
                  <h2 className="text-xs">{`Dilihat ${post.dilihat} kali`}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Image src={dibuat} width={20} alt={"#"} />
                  <Tooltip content={post.tanggal_pengumuman}>
                    <h3 className="text-xs uppercase">
                      {`${dayjs(post.tanggal).fromNow()}`}
                    </h3>
                  </Tooltip>
                </div>
                {email === "admin@gmail.com" ? (
                  <>
                    <ModalHapus data={post} />
                    <Button
                      onPress={() => {
                        route.push(`${id}/edit/${post.judul}`);
                      }}
                    >
                      Edit
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
              <div className="relative lg:row-start-1 lg:col-start-2">
                <svg
                  className="absolute top-0 right-0 hidden -mt-20 -mr-20 lg:block"
                  width={404}
                  height={384}
                  fill="none"
                  viewBox="0 0 404 384"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                  />
                </svg>
                <div className="relative mx-auto text-base max-w-prose lg:max-w-none">
                  <figure>
                    <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                      <img
                        className="object-cover object-center duration-1000 rounded-lg shadow-lg hover:scale-105"
                        src={`https://firebasestorage.googleapis.com/v0/b/sdn42-kambang-harapan.appspot.com/o/image%2Fpengumuman%2F${post.gambar}?alt=media&token=71358162-6fe6-4e17-8929-d7c546c963c7`}
                        alt={post.judul}
                        width={1184}
                        height={1376}
                      />
                    </div>
                  </figure>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="mx-auto text-base max-w-prose lg:max-w-none">
                  <p className="text-xl font-bold text-gray-500">
                    {post.judul}
                  </p>
                </div>
                <div className="mx-auto mt-5 prose text-gray-500 prose-indigo lg:max-w-none lg:row-start-1 lg:col-start-1">
                  <h1 className="text-justify">{post.isi}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
