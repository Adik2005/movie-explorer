import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDVI1m7JKSivISBm8-0xUa0votqu3GAOMs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "move-app-6d1aa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "move-app-6d1aa",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "move-app-6d1aa.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "883588201002",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:883588201002:web:7f9336efd72687985e2153",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();