import Layout from "@/components/layout";
import Head from "next/head";
import { Loading, Tooltip } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import dibuat from "../../../public/dibuat.svg";
import penulis from "../../../public/penulis.svg";
import { db } from "@/server/db";
import styles from "../../styles/Home.module.css";
export default function HasilSeleksi() {
  const route = useRouter();
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const snapshot = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const getDBFromFirestore = async () => {
    const querySnapshot = query(collection(db, "pendaftaran"));
    const gettt = await getDocs(querySnapshot);
    snapshot.current = gettt.docs;
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  useEffect(() => {
    getDBFromFirestore();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.main}>
        <Loading color={"currentColor"} />
      </div>
    );
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    return (
      <Layout>
        <Head>
          <title>Hasil Seleksi - SDN 42 Kambang Harapan</title>
        </Head>
        <div className="min-h-screen mx-5 mb-5 ">
          <table className="w-full text-sm bg-white divide-y-2 divide-gray-200 ">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Nama
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Alamat
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Keterangan
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((e, i) => {
                const Data = e.data();
                return (
                  <tr key={i}>
                    <td className="px-4 py-2 font-medium text-gray-900 text-start">
                      {Data.nmlengkap}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.alamat}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.ket ?? "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}
