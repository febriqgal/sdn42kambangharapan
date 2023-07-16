// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMf_Dsi_8gBpoc8u10QuULQFkBBdUnxi8",
  authDomain: "sdn42-kambang-harapan.firebaseapp.com",
  projectId: "sdn42-kambang-harapan",
  storageBucket: "sdn42-kambang-harapan.appspot.com",
  messagingSenderId: "251727364587",
  appId: "1:251727364587:web:855009ec0a75b9bed619ae",
  measurementId: "G-JEWE8QYDME",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const FirebaseStorage = getStorage(app);
const auth = getAuth(app);
export { db, FirebaseStorage, auth };
export const Authentication = () => {
  return auth;
};
export default app;
