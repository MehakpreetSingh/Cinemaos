// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGfHPjNx0nkB1lWJaa8uVzrGBKBkjvk9E",
  authDomain: "cinemaos-fdc2b.firebaseapp.com",
  projectId: "cinemaos-fdc2b",
  storageBucket: "cinemaos-fdc2b.appspot.com",
  messagingSenderId: "786990825330",
  appId: "1:786990825330:web:8b79759467135b6293a7eb",
  measurementId: "G-7CEHSTF1PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);