import React from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;
firebase.initializeApp(firebaseConfig);

const StoreContext = React.createContext(firebase.firestore());
export const StoreProvider = StoreContext.Provider
export default StoreContext