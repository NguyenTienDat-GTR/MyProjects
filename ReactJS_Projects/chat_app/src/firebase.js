import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB4PTos-q3DD3o6VP4Vsuqjbjz4OXxWZnE",
    authDomain: "chat-app-e3671.firebaseapp.com",
    projectId: "chat-app-e3671",
    storageBucket: "chat-app-e3671.appspot.com",
    messagingSenderId: "519381498144",
    appId: "1:519381498144:web:0139a7cfdd8058933ebf45",
    measurementId: "G-9EG5VZZJYQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

