// src/lib/firebase.ts

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6r0dkImrDui5PBnlkBwVzdjjS9nVO9N0",
  authDomain: "pustaklink.firebaseapp.com",
  projectId: "pustaklink",
  storageBucket: "pustaklink.firebasestorage.app",
  messagingSenderId: "185652062595",
  appId: "1:185652062595:web:9c60bb62e34547c060aeb6"
};

// Prevent re-initialization in Vercel environment
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
