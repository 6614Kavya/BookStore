import {initializeApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDvgZXEyqw_bGZWGrTzB2u8xx4ZasqogVw',
  authDomain: 'bookstore-7e746.firebaseapp.com',
  projectId: 'bookstore-7e746',
  storageBucket: 'bookstore-7e746.firebasestorage.app',
  messagingSenderId: '421334871959',
  appId: '1:421334871959:web:b27271be8e5433989d1ed2',
};

// Initialize Firebase App
const FIREBASE_APP =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with default persistence
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
