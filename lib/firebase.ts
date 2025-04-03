import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database"

// Function to clean environment variables by removing quotes
const cleanEnvVar = (envVar: string | undefined) => {
  if (!envVar) return undefined
  return envVar.replace(/^["'](.*)["']$/, "$1")
}

// Debug log for environment variables
console.log('Environment Variables:', {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Present' : 'Missing',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Present' : 'Missing',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Present' : 'Missing',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? 'Present' : 'Missing',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? 'Present' : 'Missing',
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? 'Present' : 'Missing',
  NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? 'Present' : 'Missing',
})

const firebaseConfig = {
  apiKey: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  databaseURL: cleanEnvVar(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL),
}

// Debug log to check Firebase config after cleaning
console.log('Firebase Config (after cleaning):', {
  apiKey: firebaseConfig.apiKey ? 'Present' : 'Missing',
  authDomain: firebaseConfig.authDomain ? 'Present' : 'Missing',
  projectId: firebaseConfig.projectId ? 'Present' : 'Missing',
  storageBucket: firebaseConfig.storageBucket ? 'Present' : 'Missing',
  messagingSenderId: firebaseConfig.messagingSenderId ? 'Present' : 'Missing',
  appId: firebaseConfig.appId ? 'Present' : 'Missing',
  databaseURL: firebaseConfig.databaseURL ? 'Present' : 'Missing',
})

// Validate Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.databaseURL) {
  console.error('Missing required Firebase configuration:', {
    apiKey: !firebaseConfig.apiKey,
    authDomain: !firebaseConfig.authDomain,
    projectId: !firebaseConfig.projectId,
    databaseURL: !firebaseConfig.databaseURL,
  })
  throw new Error("Missing required Firebase configuration. Please check your environment variables.")
}

// Initialize Firebase only if it hasn't been initialized yet
const apps = getApps()
console.log('Existing Firebase apps:', apps.length)

const app = apps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const rtdb = getDatabase(app)

// Debug log to check Firebase initialization
console.log('Firebase Services Status:', {
  app: app ? 'Initialized' : 'Not initialized',
  auth: auth ? 'Initialized' : 'Not initialized',
  db: db ? 'Initialized' : 'Not initialized',
  storage: storage ? 'Initialized' : 'Not initialized',
  rtdb: rtdb ? 'Initialized' : 'Not initialized',
  authCurrentUser: auth.currentUser ? 'Logged in' : 'Not logged in',
})

export { app, auth, db, storage, rtdb } 