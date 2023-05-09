import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);


export const firebase = initializeApp(firebaseConfig);


export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);

