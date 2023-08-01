// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJpmNHSmyMUrzI7PEiL9V5Aogw34ySYiE",
  authDomain: "learn-firebase-4b0e3.firebaseapp.com",
  projectId: "learn-firebase-4b0e3",
  storageBucket: "learn-firebase-4b0e3.appspot.com",
  messagingSenderId: "973326495890",
  appId: "1:973326495890:web:a142f19441082ffdda364b",
  measurementId: "G-8E2MHMKDMD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
