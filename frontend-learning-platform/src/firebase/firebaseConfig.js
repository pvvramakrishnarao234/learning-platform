// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8LlwmkTOO_ur_KWh-ydDOeSJlguAxS84",
  authDomain: "learning-platform-c3d9c.firebaseapp.com",
  projectId: "learning-platform-c3d9c",
  storageBucket: "learning-platform-c3d9c.firebasestorage.app",
  messagingSenderId: "557913125021",
  appId: "1:557913125021:web:d8c64d3e3e10087e0a6474",
  measurementId: "G-HCX47742PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);