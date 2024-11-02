import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDvqi3pebEOg-yX4KtMNQpDYAFX0jsdKw0",
  authDomain: "watertracking-242f5.firebaseapp.com",
  projectId: "watertracking-242f5",
  storageBucket: "watertracking-242f5.firebasestorage.app",
  messagingSenderId: "108015935216",
  appId: "1:108015935216:web:15e01b6dfb1d74719bec35",
  measurementId: "G-8E9YEEXQF5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Enable persistent authentication
setPersistence(auth, browserLocalPersistence);

export { app, db, auth };