import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
import firebaseConfig from "./firebaseConfig.json";
import { Firestore, getFirestore } from "firebase/firestore";

/**
 * Initialize Firebase Admin
 */

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { db };

export default getAuth(app);
