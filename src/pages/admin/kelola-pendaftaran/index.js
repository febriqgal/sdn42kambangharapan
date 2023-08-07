import { Chip, Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Head from "next/head";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { Fragment } from "react";
import LayoutAdmin from "@/components/layout/layout-admin";
import { db } from "@/server/db";
import styles from "../../../styles/Home.module.css";

export default function HasilSeleksi() {
  const route = useRouter();
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const snapshot = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const getDBFromFirestore = async () => {
    const querySnapshot = query(
      collection(db, "pendaftaran"),
      orderBy("nmlengkap", "asc")
    );
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
        <Spinner color={"currentColor"} />
      </div>
    );
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    return (
      <LayoutAdmin>
        <Head>
          <title>Kelola Pendaftaran - SDN 42 Kambang Harapan</title>
        </Head>
        <div className="w-full px-5 overflow-y-auto">
          <table className="w-full text-sm bg-white divide-y-2 divide-gray-200 ">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  No.
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Nik
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Nama Lengkap
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Tempat Lahir
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Tanggal Lahir
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Jenis Kelamin
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Alamat
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Jarak
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Prestasi
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  File
                </th>
                <th className="px-4 py-2 font-medium text-center text-gray-900">
                  Keterangan
                </th>
                <th className="px-4 py-2 font-medium text-center text-gray-900"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {data.map((e, i) => {
                const Data = e.data();
                return (
                  <tr key={i}>
                    <td className="px-4 py-2 font-medium text-gray-900 text-start">
                      {i + 1}.
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 text-start">
                      {Data.nik}
                    </td>
                    <td className="px-4 py-2 font-medium text-gray-900 text-start">
                      {Data.nmlengkap}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.tempatlahir}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {dayjs(Data.tanggallahir).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.jeniskelamin}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.alamat}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.jarak} KM
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.prestasi}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      <a
                        target="_blank"
                        href={`https://firebasestorage.googleapis.com/v0/b/sdn42-kambang-harapan.appspot.com/o/image%2Fpendaftaran%2F${Data.pdf}?alt=media&token=deb93397-742b-4d57-8a5c-a6b00a643ab2`}
                      >
                        Link
                      </a>
                    </td>
                    <td className="flex items-center justify-center px-4 py-2 text-center text-gray-700">
                      {Data.ket != "Diterima" ? (
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              color={
                                Data.ket === "Tidak Diterima"
                                  ? "danger"
                                  : "default"
                              }
                              className="flex items-center justify-center text-center text-white"
                            >
                              {Data.ket != "-" ? Data.ket : "Pilih"}
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              onPress={async () => {
                                const washingtonRef = doc(
                                  db,
                                  "pendaftaran",
                                  e.id
                                );

                                await updateDoc(washingtonRef, {
                                  ket: "Diterima",
                                });
                                route.refresh();
                              }}
                              key="new"
                            >
                              Diterima
                            </DropdownItem>
                            <DropdownItem
                              onPress={async () => {
                                const washingtonRef = doc(
                                  db,
                                  "pendaftaran",
                                  e.id
                                );

                                await updateDoc(washingtonRef, {
                                  ket: "Tidak Diterima",
                                });
                                route.refresh();
                              }}
                              key="copy"
                            >
                              Tidak Diterima
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        <Button
                          isDisabled
                          color="success"
                          className="flex items-center justify-center text-center text-white"
                        >
                          Diterima
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      <Button
                        onPress={() => {
                          route.push(`/admin/kelola-pendaftaran/${e.id}`);
                        }}
                      >
                        Detail
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </LayoutAdmin>
    );
  }
}
