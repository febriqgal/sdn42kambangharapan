import { Spinner } from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import LayoutUser from "@/components/layout/layout-user";
import { useUser } from "@/context/user";
import { db } from "@/server/db";
import { getAuth } from "firebase/auth";
import styles from "../../styles/Home.module.css";
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
        <Spinner color={"currentColor"} />
      </div>
    );
  } else if (snapshot.current == null) {
    return (
      <LayoutUser>
        <div>
          <h1 className="text-xl">{`Hallo,👋 ${userr.displayName}, Selamat Datang di Dashboard User SDN 42 Kambang Harapan`}</h1>
        </div>
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
              href={`/user/${snapshot.current.uid}`}
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
        <h1>
          Pendaftaran anda sedang di proses mohon tunggu konfirmasi dari Admin
        </h1>
      </LayoutUser>
    );
  }
}
