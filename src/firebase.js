// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuFAloML0-Zf7vPDIU2zssaM4C_HEfz74",
  authDomain: "psychologists-81420.firebaseapp.com",
  projectId: "psychologists-81420",
  storageBucket: "psychologists-81420.firebasestorage.app",
  messagingSenderId: "36804762803",
  appId: "1:36804762803:web:c480361a963e3eb40724c6",
  measurementId: "G-NM5EJ979M3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
