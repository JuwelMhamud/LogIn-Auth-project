// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf1_uXxVbXputSCCNsG2wFJPkec6MuXQ8",
  authDomain: "private-route-auth-94960.firebaseapp.com",
  projectId: "private-route-auth-94960",
  storageBucket: "private-route-auth-94960.appspot.com",
  messagingSenderId: "385988797927",
  appId: "1:385988797927:web:6b3c119ba5d449cef58942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth