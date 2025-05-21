import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1Z_dErTBigtOsCojPTh8iTD9RhPVGRVM",
  authDomain: "code-book-226fc.firebaseapp.com",
  projectId: "code-book-226fc",
  storageBucket: "code-book-226fc.appspot.com",
  messagingSenderId: "170874857691",
  appId: "1:170874857691:web:e39671cac5f164187e44fe",
  measurementId: "G-QX1EJSTYDY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
