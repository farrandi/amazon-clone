// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6Pt428KZ7vPmZywyCXSPTSeq4ruKftR4",
  authDomain: "clone-17c13.firebaseapp.com",
  projectId: "clone-17c13",
  storageBucket: "clone-17c13.appspot.com",
  messagingSenderId: "1078919457557",
  appId: "1:1078919457557:web:c86a775030b627ec09571c",
  measurementId: "G-MSR323KQD7",
};
// Initalize the firebase App
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { firebaseApp, auth, db };
