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
  getDoc,
  updateDoc,
} from "firebase/firestore";
import layoutUser from "@/components/layout/layout-user";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import dibuat from "../../../public/dibuat.svg";
import penulis from "../../../public/penulis.svg";
import { db } from "@/server/db";
import styles from "../../styles/Home.module.css";
import LayoutUser from "@/components/layout/layout-user";
import { getAuth } from "firebase/auth";
import { useUser } from "@/context/user";
export default function User() {
  const uidUser = useUser().uid;
  const userr = getAuth().currentUser;
  const route = useRouter();
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const snapshot = useRef(null);
  const [isLoading, setIsloading] = useState(true);
  const getDBFromFirestore = async () => {
    const docRef = doc(db, "pendaftaran", uidUser);
    const docSnap = await getDoc(docRef);
    snapshot.current = docSnap.data();
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data().ket);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
  };

  useEffect(() => {
    getDBFromFirestore();
  });

  if (isLoading) {
    return (
      <div className={styles.main}>
        <Loading color={"currentColor"} />
      </div>
    );
  } else if (snapshot.current == null) {
    return (
      <LayoutUser>
        <h1>belum daftar</h1>
      </LayoutUser>
    );
  }
  if (snapshot.current.ket == "Diterima") {
    return (
      <LayoutUser>
        <h1>
          {`Selamat ${userr.displayName} Anda Dinyatakan LULUS, silahkan unduh bukti lulus anda `}
          <span>
            <a
              className="text-blue-700 underline"
              target="_blank"
              href="/user/pdf"
            >
              Disini
            </a>
          </span>
        </h1>
      </LayoutUser>
    );
  } else if (snapshot.current.ket == "Tidak Diterima") {
    return (
      <LayoutUser>
        <h1>
          {`Mohon Maaf ${userr.displayName} Anda Dinyatakan Tidak Diterima😭`}
        </h1>
      </LayoutUser>
    );
  } else {
    return (
      <LayoutUser>
        <h1>Proses</h1>
      </LayoutUser>
    );
  }
}
