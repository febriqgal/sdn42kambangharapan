import { Loading } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { collection, getDocs, query } from "firebase/firestore";
import Head from "next/head";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
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
      <LayoutAdmin>
        <Head>
          <title>Hasil Seleksi - SDN 42 Kambang Harapan</title>
        </Head>
        <div className="w-full min-h-screen mx-5 mb-5 ">
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
                  Nama Ayah
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 text-start">
                  Nama Ibu
                </th>
                <th className="px-4 py-2 font-medium text-center text-gray-900">
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
                      {Data.tgllahir}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.jeniskelamin}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.alamat}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.nmayah}
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-start">
                      {Data.nmibu}
                    </td>
                    <div>
                      <Menu as="div">
                        <div>
                          <Menu.Button className="items-center justify-center w-full px-2 py-2 my-1 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            {Data.ket != "-" ? Data.ket : "Pilih"}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute px-5 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-44 right-10 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="flex flex-col px-1 py-1 my-4">
                              <button
                                onClick={async () => {
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
                                className="py-2 text-center rounded-lg hover:bg-black hover:text-white"
                              >
                                Diterima
                              </button>
                              <button
                                onClick={async () => {
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
                                className="py-2 text-center rounded-lg hover:bg-black hover:text-white"
                              >
                                Tidak Diterima
                              </button>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
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
