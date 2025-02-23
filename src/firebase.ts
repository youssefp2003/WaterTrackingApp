import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
<<<<<<< HEAD
  apiKey: "AIzaSyDvqi3pebEOg-yX4KtMNQpDYAFX0jsdKw0",
  authDomain: "watertracking-242f5.firebaseapp.com",
  projectId: "watertracking-242f5",
  storageBucket: "watertracking-242f5.firebasestorage.app",
  messagingSenderId: "108015935216",
  appId: "1:108015935216:web:15e01b6dfb1d74719bec35",
  measurementId: "G-8E9YEEXQF5"
=======
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
>>>>>>> 8be8f0c (pre-workign-notif)
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

<<<<<<< HEAD
// Enable persistent authentication
=======
>>>>>>> 8be8f0c (pre-workign-notif)
setPersistence(auth, browserLocalPersistence);

export { app, db, auth };