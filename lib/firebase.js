// wesync-superadmin/lib/firebase.js

import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABGK8Os_Qiox8rk7Inqrq2NM8nPxfIFAs",
  authDomain: "wesync-app-82814.firebaseapp.com",
  projectId: "wesync-app-82814",
  storageBucket: "wesync-app-82814.firebasestorage.app",
  messagingSenderId: "156472359241",
  appId: "1:156472359241:web:6e3abb8b5a706765af8298",
};

// Prevent duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore
export const db = getFirestore(app);

export default app;
