import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs5fyV_fI-JRR0fO9CuCz_Jo1WzFhykrs",
  authDomain: "steven-app-4b450.firebaseapp.com",
  projectId: "steven-app-4b450",
  storageBucket: "steven-app-4b450.appspot.com",
  messagingSenderId: "971983313174",
  appId: "1:971983313174:web:d1bffcc95d757a889a1837"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
const dateTime = firebase.firestore.FieldValue.serverTimestamp();
firebase.firestore().settings({timeStampInSnapshots: true});
export const update = firebase.updateProfile;
export default {auth, db, dateTime, update};