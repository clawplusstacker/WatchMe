import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD44jQpGU5wqthUflUQQu1Y3F1aheOO1_M",
  authDomain: "watchme-6ecfa.firebaseapp.com",
  projectId: "watchme-6ecfa",
  storageBucket: "watchme-6ecfa.appspot.com",
  messagingSenderId: "1053343843832",
  appId: "1:1053343843832:web:00780b060bd88ebe2b420d",
  measurementId: "G-XWPYK03WW2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore(app);;


