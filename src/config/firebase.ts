import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: undefined,
  authDomain: undefined,
  projectId: undefined,
  storageBucket: undefined,
  messagingSenderId: undefined,
  appId: undefined,
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp, "dev-db");