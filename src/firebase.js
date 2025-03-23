import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyBuFAloML0-Zf7vPDIU2zssaM4C_HEfz74",
  authDomain: "psychologists-81420.firebaseapp.com",
  databaseURL: "https://psychologists-81420-default-rtdb.firebaseio.com", 
  projectId: "psychologists-81420",
  storageBucket: "psychologists-81420.appspot.com",
  messagingSenderId: "36804762803",
  appId: "1:36804762803:web:c480361a963e3eb40724c6",
  measurementId: "G-NM5EJ979M3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

export {
  auth,
  database,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
