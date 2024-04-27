import { initializeApp } from 'firebase/app';
import {
    getAuth,
    setPersistence,
    browserSessionPersistence,
    initializeAuth,
    getReactNativePersistence,  
 } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCX5nqQQBYzroc4x3EAinuUEP0Ak8kiEOc",
  authDomain: "familytraditions-35b28.firebaseapp.com",
  projectId: "familytraditions-35b28",
  storageBucket: "familytraditions-35b28.appspot.com",
  messagingSenderId: "231810229987",
  appId: "1:231810229987:web:63e9e4de3e60f32bed47d6",
  measurementId: "G-VN91YG2E68"
};

const app = initializeApp(firebaseConfig);

let auth;
if (typeof document !== 'undefined') {
    // Web environment
    auth = getAuth(app);
    setPersistence(auth, browserSessionPersistence)
    .catch((error) => {
      console.error("Persistence setting failed", error);
    });
} else {
    // React Native environment
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
}

const db = getFirestore(app);

// Exporting the necessary Firebase services and functions
export { db, auth };