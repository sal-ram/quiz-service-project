import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const firebase = initializeApp(firebaseConfig);

export const Context = createContext(null)

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
);
