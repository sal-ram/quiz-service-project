import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);