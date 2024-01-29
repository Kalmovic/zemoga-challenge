// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCM8eHpcUnuwCmZabG22dotv5lyvIDn7Hw",
  authDomain: "zemoga-rule-of-thumb.firebaseapp.com",
  databaseURL: "https://zemoga-rule-of-thumb-default-rtdb.firebaseio.com",
  projectId: "zemoga-rule-of-thumb",
  storageBucket: "zemoga-rule-of-thumb.appspot.com",
  messagingSenderId: "623611041742",
  appId: "1:623611041742:web:85b7bcb2188458b30afd9f",
  measurementId: "G-ZHSEMEGC0V",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getDatabase();
