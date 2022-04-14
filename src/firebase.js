// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAP2TLgUngwoPMyjq8mc3I0zlT9UrKuY5Y",

  authDomain: "nft-project-af5ef.firebaseapp.com",

  projectId: "nft-project-af5ef",

  storageBucket: "nft-project-af5ef.appspot.com",

  messagingSenderId: "80291656728",

  appId: "1:80291656728:web:edc67dbb367c6f84e63f6d"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);
const db = getFirestore(app);

const registerWithEmailAndPassword = async (address, name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, address, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  auth,
  db,
  //logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  //sendPasswordReset,
  //logout,
};
