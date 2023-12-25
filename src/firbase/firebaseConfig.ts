import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuvgbSYOlcsoHj-Te3alyvXxIQBIGJfCg",
  authDomain: "courses-88b02.firebaseapp.com",
  projectId: "courses-88b02",
  storageBucket: "courses-88b02.appspot.com",
  messagingSenderId: "987148900122",
  appId: "1:987148900122:web:b52c3753c2c3ca659bfea3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// storage

export const storage = getStorage(app);

// db

export const db = getFirestore(app);
