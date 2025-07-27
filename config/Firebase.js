// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWDqUtQqPzwdPWJzi34EEVXHNOUg90G9A",
  authDomain: "hackathon-acff9.firebaseapp.com",
  projectId: "hackathon-acff9",
  storageBucket: "hackathon-acff9.firebasestorage.app",
  messagingSenderId: "405917685003",
  appId: "1:405917685003:web:4d49c9247aea0d6d367e0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db}