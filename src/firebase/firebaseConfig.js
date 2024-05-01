import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence, initializeAuth, getReactNativePersistence, } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA6Hy3Q0kbacOJ6yAcsgaBa_ydzGwlspr0",
  authDomain: "family-traditions-7a638.firebaseapp.com",
  projectId: "family-traditions-7a638",
  storageBucket: "family-traditions-7a638.appspot.com",
  messagingSenderId: "741770824617",
  appId: "1:741770824617:web:cae3401d48e576509d52b8",
  measurementId: "G-2YXDREP5R6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

export { db, auth };