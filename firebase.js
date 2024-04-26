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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
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