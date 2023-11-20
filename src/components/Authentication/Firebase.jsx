import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD87P8wWtMwxLkLJkT-wLRbPGRkPFUBAUc",
  authDomain: "sticktap-34d5b.firebaseapp.com",
  projectId: "sticktap-34d5b",
  storageBucket: "sticktap-34d5b.appspot.com",
  messagingSenderId: "605640235373",
  appId: "1:605640235373:web:5ec9caff680693a79da264",
  measurementId: "G-NSEQG2W6T7",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
