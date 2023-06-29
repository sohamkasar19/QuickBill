// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBW-JK_cZdG0Aa_RNZF1-GPsDLNYBdJaY',
  authDomain: 'quickbill-8d2f2.firebaseapp.com',
  projectId: 'quickbill-8d2f2',
  storageBucket: 'quickbill-8d2f2.appspot.com',
  messagingSenderId: '454958006189',
  appId: '1:454958006189:web:7ee3cd179d1c074e53eb24',
  measurementId: 'G-73Y750SEEK',
};

// Initialize Firebase
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
