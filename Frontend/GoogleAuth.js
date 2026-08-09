
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "food-delivery-c7a79.firebaseapp.com",
  projectId: "food-delivery-c7a79",
  storageBucket: "food-delivery-c7a79.firebasestorage.app",
  messagingSenderId: "575675907377",
  appId: "1:575675907377:web:d7596a7a42847ea387c410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {app,auth};