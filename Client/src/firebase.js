// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBupkwcLHYG8JQGbE9LDVolYEhcNzaQXT4",
  authDomain: "ice-route-sky-5c758.firebaseapp.com",
  databaseURL: "https://ice-route-sky-5c758-default-rtdb.firebaseio.com",
  projectId: "ice-route-sky-5c758",
  storageBucket: "ice-route-sky-5c758.appspot.com",
  messagingSenderId: "238752043648",
  appId: "1:238752043648:web:50955a206f46ec70efcc65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);