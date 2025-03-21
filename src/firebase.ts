// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqdKxWUPK5SMGrS1wF87I2P5OrqiwYqV4",
    authDomain: "rncore-noti.firebaseapp.com",
    projectId: "rncore-noti",
    storageBucket: "rncore-noti.firebasestorage.app",
    messagingSenderId: "632449728851",
    appId: "1:632449728851:web:187079002d9412443fa1a6",
    measurementId: "G-SSVJXN91E1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);