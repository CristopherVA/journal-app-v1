import firebase from 'firebase/compat/app';
import  'firebase/compat/firestore';
import  'firebase/compat/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq_82CcsEo8Wd5AS4pWquFznu40U14s5k",
  authDomain: "journalapp-dcb99.firebaseapp.com",
  projectId: "journalapp-dcb99",
  storageBucket: "journalapp-dcb99.appspot.com",
  messagingSenderId: "345459626321",
  appId: "1:345459626321:web:b6f586bb2898a0f0ff8370"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  firebase,
  db,
  googleAuthProvider,
}
