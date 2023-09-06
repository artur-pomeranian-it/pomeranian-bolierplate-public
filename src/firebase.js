// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAcC-ScoS5AmRq3o5-9hA45ei6juIahuPI',
  authDomain: 'pomeranian-fire.firebaseapp.com',
  projectId: 'pomeranian-fire',
  storageBucket: 'pomeranian-fire.appspot.com',
  messagingSenderId: '692222167618',
  appId: '1:692222167618:web:19b33a65634505f0457bdb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();
