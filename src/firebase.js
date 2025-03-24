import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (get this from Firebase Console > Project Settings)
const firebaseConfig = {
  apiKey: "AIzaSyCfkkc-aNxu3bEaLdUpdRmCoEAXcUfY1uE",
  authDomain: "my-ortho-world.firebaseapp.com",
  projectId: "my-ortho-world",
  storageBucket: "my-ortho-world.firebasestorage.app",
  messagingSenderId: "616801421973",
  appId: "1:616801421973:web:36ebb6abc3d009da89e99c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);      // For authentication
export const db = getFirestore(app);   // For database