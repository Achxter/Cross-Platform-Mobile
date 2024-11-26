import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCJ1iA1VGp2Dwxc53hcFQ8jdl14eYH7Y1Q",
  authDomain: "crossplat-week11-61730.firebaseapp.com",
  projectId: "crossplat-week11-61730",
  storageBucket: "crossplat-week11-61730.firebasestorage.app",
  messagingSenderId: "57368912798",
  appId: "1:57368912798:web:2270828b908b1740e72c8f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage();

export default firebaseConfig