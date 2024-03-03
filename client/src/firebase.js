// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-projects-593ef.firebaseapp.com",
  projectId: "react-projects-593ef",
  storageBucket: "react-projects-593ef.appspot.com",
  messagingSenderId: "991113485771",
  appId: "1:991113485771:web:456d5c4b7f1eb91d246a4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);