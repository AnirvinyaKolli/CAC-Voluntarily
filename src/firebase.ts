// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCayLJpT-uPq6vkneJM9wlZvHB2ZWb7Vb4",
  authDomain: "voluntarily-67249.firebaseapp.com",
  projectId: "voluntarily-67249",
  storageBucket: "voluntarily-67249.firebasestorage.app",
  messagingSenderId: "334782215396",
  appId: "1:334782215396:web:10435908adaf8f8c1aa8f1",
  measurementId: "G-M41XTZ2WBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app); 