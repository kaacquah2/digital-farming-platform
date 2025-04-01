import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User,
  type UserCredential,
} from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { isDemoMode } from "@/lib/demo-mode"

interface UserProfile {
  displayName: string
  email: string
  role: string
  plan: string
  profile: {
    farmName: string
    location: string
    farmSize: string
    primaryCrops: string[]
    bio: string
  }
  subscription: {
    plan: string
    status: string
    validUntil: Date | null
  }
}

// Create a new user with email and password
export const createUser = async (email: string, password: string, displayName: string): Promise<UserCredential> => {
  try {
    // For demo purposes, if we're in demo mode, just return a mock user
    if (isDemoMode) {
      console.log("Using demo mode for createUser")
      return {
        user: {
          uid: "demo-user-id",
          email,
          displayName,
        } as User,
        providerId: "password",
        operationType: "signIn",
      }
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Update the user's profile with the display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName,
      })

      // Create a user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        displayName,
        email,
        createdAt: serverTimestamp(),
        role: "farmer",
        plan: "basic",
        profile: {
          farmName: "",
          location: "",
          farmSize: "",
          primaryCrops: [],
          bio: "",
        },
        subscription: {
          plan: "free",
          status: "active",
          validUntil: null,
        },
      })
    }

    return userCredential
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    // For demo purposes, if we're in demo mode, just return a mock user
    if (isDemoMode) {
      console.log("Using demo mode for signIn")
      return {
        user: {
          uid: "demo-user-id",
          email,
          displayName: "Demo User",
        } as User,
        providerId: "password",
        operationType: "signIn",
      }
    }

    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in:", error)
    throw error
  }
}

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    if (isDemoMode) {
      console.log("Using demo mode for signOut")
      return
    }

    await firebaseSignOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    // For demo purposes, if we're in demo mode, just return success
    if (isDemoMode) {
      console.log("Using demo mode for resetPassword")
      return
    }

    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    if (isDemoMode) {
      console.log("Using demo mode for getCurrentUser")
      return {
        uid: "demo-user-id",
        email: "demo@example.com",
        displayName: "Demo User",
      } as User
    }

    return auth.currentUser
  } catch (error) {
    console.error("Error getting current user:", error)
    throw error
  }
}

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    if (isDemoMode) {
      console.log("Using demo mode for getUserProfile")
      return {
        displayName: "Demo User",
        email: "demo@example.com",
        role: "farmer",
        plan: "basic",
        profile: {
          farmName: "Demo Farm",
          location: "Demo Location",
          farmSize: "100 acres",
          primaryCrops: ["Demo Crop"],
          bio: "Demo bio",
        },
        subscription: {
          plan: "free",
          status: "active",
          validUntil: null,
        },
      }
    }

    const userDoc = await getDoc(doc(db, "users", uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile
    }
    return null
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  try {
    if (isDemoMode) {
      console.log("Using demo mode for updateUserProfile")
      return
    }

    await setDoc(doc(db, "users", uid), data, { merge: true })
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

