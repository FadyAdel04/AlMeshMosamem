import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from "firebase/storage"; // Added storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbEtCidaA9oixKTvCwQ-1_LgEnn6kUy4w",
  authDomain: "almeshmosamem-1b959.firebaseapp.com",
  projectId: "almeshmosamem-1b959",
  storageBucket: "almeshmosamem-1b959.appspot.com",
  messagingSenderId: "839801558455",
  appId: "1:839801558455:web:35020ee6415eda15ce4432",
  measurementId: "G-R0VQ6QSP21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Authentication
const storage = getStorage(app); // Initialize Firebase Storage

export { db, auth, storage }; // Export Firestore, Auth, and Storage
