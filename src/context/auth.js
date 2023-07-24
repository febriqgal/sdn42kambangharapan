/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Authentication } from "@/server/db";
import styles from "../styles/Home.module.css";
import { InitialUserState, useUser } from "./user";
import { Spinner } from "@nextui-org/react";

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const { SetUser } = user;
  const InitiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated");

        SetUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        });
      } else {
        console.log("User is not authenticated");
        SetUser(InitialUserState);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    InitiateAuthStateChange();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.main}>
        <Spinner color="primary"></Spinner>
      </div>
    );
  }

  return children;
};

export default AuthStateChangeProvider;
