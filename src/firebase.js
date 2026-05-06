// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "salem-play-district-407d0.firebaseapp.com",
  projectId: "salem-play-district-407d0",
  storageBucket: "salem-play-district-407d0.firebasestorage.app",
  messagingSenderId: "215155461019",
  appId: "1:215155461019:web:37d08e88708915bb4fef3e",
  measurementId: "G-KDKR2H8HES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);
export { db, auth }; 