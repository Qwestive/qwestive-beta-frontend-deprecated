// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// import { getFunctions } from 'firebase/functions';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// Emulators
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseFunctions = getFunctions(FirebaseApp);
export const Firestore = getFirestore(FirebaseApp);
export const FirebaseAuth = getAuth();
export const FirebaseStorage = getStorage();

// Emulators
connectFunctionsEmulator(FirebaseFunctions, 'localhost', 5001);
connectFirestoreEmulator(Firestore, 'localhost', 8080);
connectAuthEmulator(FirebaseAuth, 'http://localhost:9099');
connectStorageEmulator(FirebaseStorage, 'localhost', 9199);
