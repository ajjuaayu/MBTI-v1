
import { initializeApp, getApp, getApps, type FirebaseOptions } from 'firebase/app';
// Add other Firebase services imports here if needed in the future (e.g., getAuth, getFirestore)

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app, firebaseConfig };

// Example of how to get other services (uncomment and install if needed):
// import { getAuth } from "firebase/auth";
// export const auth = getAuth(app);

// import { getFirestore } from "firebase/firestore";
// export const db = getFirestore(app);
