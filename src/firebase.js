// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuFNRPe-sdr67dVyRdrdGP_N3IApIymOw",
  authDomain: "custom-social-adcb0.firebaseapp.com",
  databaseURL: "https://custom-social-adcb0-default-rtdb.firebaseio.com",
  projectId: "custom-social-adcb0",
  storageBucket: "custom-social-adcb0.appspot.com",
  messagingSenderId: "342998286456",
  appId: "1:342998286456:web:c5181f467beeb0f46d2d8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);

export default firebaseConfig;
