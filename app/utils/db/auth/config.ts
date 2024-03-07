import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
import firebaseConfig from "./firebaseConfig.json";

/**
 * Initialize Firebase Admin
 */

const app: FirebaseApp = initializeApp(firebaseConfig);
export default getAuth(app);
