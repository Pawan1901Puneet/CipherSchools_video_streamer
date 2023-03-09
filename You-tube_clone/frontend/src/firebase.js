import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    //later will add apiKey in an env file
  apiKey: "AIzaSyAElCnT7eXVndkiLRMANW-GC_YovW5zsWk",
  authDomain: "video-streamer-88ffe.firebaseapp.com",
  projectId: "video-streamer-88ffe",
  storageBucket: "video-streamer-88ffe.appspot.com",
  messagingSenderId: "209595816982",
  appId: "1:209595816982:web:3b97b63a32d37af5fd6937"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();