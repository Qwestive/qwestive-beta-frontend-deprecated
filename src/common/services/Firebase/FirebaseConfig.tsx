// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyAxnuVjAujKL4tensp22UtWN5RvmxCKJ9Q',
  authDomain: 'qwestive-beta-prod.firebaseapp.com',
  projectId: 'qwestive-beta-prod',
  storageBucket: 'qwestive-beta-prod.appspot.com',
  messagingSenderId: '234760367876',
  appId: '1:234760367876:web:9cb192a118ec8d5a522a51',
  measurementId: 'G-36SGFC0785',
};

// TEST 2 FOR GITIGNORE
// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseFunctions = getFunctions(FirebaseApp);
export const Firestore = getFirestore(FirebaseApp);
export const FirebaseAuth = getAuth();
export const FirebaseStorage = getStorage();
