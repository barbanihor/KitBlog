import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWp7eA1Tf1c5dufeUXZSO8oF-Ulo5Ru6M',
  authDomain: 'blog-kit-ed4ac.firebaseapp.com',
  projectId: 'blog-kit-ed4ac',
  storageBucket: 'blog-kit-ed4ac.firebasestorage.app',
  messagingSenderId: '1075882589357',
  appId: '1:1075882589357:web:ad0044ec7454a773d45a24',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
