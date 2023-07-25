import Layout from "@/components/layout";
import Head from "next/head";
import { Chip, Loading, Spinner, Tooltip } from "@nextui-org/react";
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
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import dibuat from "../../../public/dibuat.svg";
import penulis from "../../../public/penulis.svg";
import { db } from "@/server/db";
import styles from "../../styles/Home.module.css";
export default function HasilSeleksi() {
  const colors = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];
  const [selectedColor, setSelectedColor] = useState("primary");

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
      <Layout>
        <div className={`flex justify-center items-start pt-5 min-h-screen`}>
          <Spinner color={"currentColor"} />
        </div>
      </Layout>
    );
  } else {
    const post = snapshot.current;
    const data = Object.values(post);
    return (
      <Layout>
        <Head>
          <title>Hasil Seleksi - SDN 42 Kambang Harapan</title>
        </Head>
        <div className="flex flex-col min-h-screen gap-3">
          <Table
            color={selectedColor}
            selectionMode="single"
            defaultSelectedKeys={["2"]}
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>No.</TableColumn>
              <TableColumn>Nama Lengkap</TableColumn>
              <TableColumn>Alamat</TableColumn>
              <TableColumn>Keterangan</TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((e, i) => {
                const Data = e.data();
                return (
                  <TableRow key={i}>
                    <TableCell>{i + 1}.</TableCell>
                    <TableCell>{Data.nmlengkap}</TableCell>
                    <TableCell>{Data.alamat}</TableCell>
                    <TableCell>
                      <Chip
                        color={Data.ket === "Diterima" ? "success" : "danger"}
                        className="text-white"
                      >
                        {Data.ket ?? "-"}
                      </Chip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Layout>
    );
  }
}
