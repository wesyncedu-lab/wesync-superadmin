// wesync-superadmin/lib/firebase.js

import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase Config (DO NOT HARDCODE IN PRODUCTION)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyABGK8Os_Qiox8rk7Inqrq2NM8nPxfIFAs",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "wesync-app-82814.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "wesync-app-82814",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE || "wesync-app-82814.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID || "156472359241",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:156472359241:web:6e3abb8b5a706765af8298",
};

// Safe initialization—prevents multiple app instances
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firebase Services (Auth + Firestore)
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
