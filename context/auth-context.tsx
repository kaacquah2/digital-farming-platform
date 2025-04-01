"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import {
  User,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  IdTokenResult,
  AuthError,
  onAuthStateChanged,
} from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { isDemoMode, demoUser } from "@/lib/demo-mode"
import { useRouter } from "next/navigation"

// Define the extended user type that includes our custom properties
interface ExtendedUser extends User {
  role?: string
  plan?: string
}

// Define the auth context type
interface AuthContextType {
  user: ExtendedUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<UserCredential>
  signUp: (email: string, password: string, name: string) => Promise<UserCredential>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Export the auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ExtendedUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // If in demo mode, set the demo user
    if (isDemoMode) {
      const demoUserExtended: ExtendedUser = {
        ...demoUser,
        emailVerified: false,
        isAnonymous: false,
        metadata: {},
        providerData: [],
        refreshToken: '',
        tenantId: null,
        phoneNumber: null,
        providerId: 'demo',
        delete: async () => {},
        getIdToken: async () => '',
        getIdTokenResult: async () => ({
          token: '',
          signInProvider: null,
          claims: {},
          authTime: '',
          issuedAtTime: '',
          expirationTime: '',
          signInSecondFactor: null,
        } as IdTokenResult),
        reload: async () => {},
        toJSON: () => ({})
      }
      setUser(demoUserExtended)
      setLoading(false)
      return
    }

    // Otherwise, listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'No user')
      if (firebaseUser) {
        try {
          // Get the ID token
          const token = await firebaseUser.getIdToken()
          console.log('Got ID token')

          // Set the session cookie
          document.cookie = `__session=${token}; path=/; max-age=3600; samesite=strict; secure`
          console.log('Set session cookie')

          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            console.log('User data from Firestore:', userData)
            setUser({
              ...firebaseUser,
              role: userData.role || "farmer",
              plan: userData.plan || "basic",
            } as ExtendedUser)
          } else {
            console.log('No user data in Firestore, using default values')
            setUser({
              ...firebaseUser,
              role: "farmer",
              plan: "basic",
            } as ExtendedUser)
          }
        } catch (error) {
          console.error("Error setting up user:", error)
          setUser({
            ...firebaseUser,
            role: "farmer",
            plan: "basic",
          } as ExtendedUser)
        }
      } else {
        // Clear the session cookie
        document.cookie = '__session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        console.log('Cleared session cookie')
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with:', { email })
      const result = await signInWithEmailAndPassword(auth, email, password)
      console.log('Sign in successful:', { uid: result.user.uid })

      // Get the ID token and set the session cookie
      const token = await result.user.getIdToken()
      document.cookie = `__session=${token}; path=/; max-age=3600; samesite=strict; secure`
      console.log('Set session cookie after sign in')

      return result
    } catch (error) {
      console.error('Sign in error:', error)
      if (error instanceof Error) {
        const authError = error as AuthError
        switch (authError.code) {
          case 'auth/invalid-email':
            throw new Error('Invalid email address')
          case 'auth/user-disabled':
            throw new Error('This account has been disabled')
          case 'auth/user-not-found':
            throw new Error('No account found with this email')
          case 'auth/wrong-password':
            throw new Error('Incorrect password')
          default:
            throw new Error('Failed to sign in. Please try again.')
        }
      }
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting to sign up with:', { email, name })
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log('Sign up successful:', { uid: userCredential.user.uid })
      
      // Create user document in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role: "farmer",
        plan: "basic",
        createdAt: new Date().toISOString(),
      })

      // Get the ID token and set the session cookie
      const token = await userCredential.user.getIdToken()
      document.cookie = `__session=${token}; path=/; max-age=3600; samesite=strict; secure`
      console.log('Set session cookie after sign up')
      
      return userCredential
    } catch (error) {
      console.error('Sign up error:', error)
      if (error instanceof Error) {
        const authError = error as AuthError
        switch (authError.code) {
          case 'auth/email-already-in-use':
            throw new Error('An account with this email already exists')
          case 'auth/invalid-email':
            throw new Error('Invalid email address')
          case 'auth/operation-not-allowed':
            throw new Error('Email/password accounts are not enabled')
          case 'auth/weak-password':
            throw new Error('Password should be at least 6 characters')
          default:
            throw new Error('Failed to create account. Please try again.')
        }
      }
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      console.log('Attempting to reset password for:', { email })
      await sendPasswordResetEmail(auth, email)
      console.log('Password reset email sent successfully')
    } catch (error) {
      console.error('Password reset error:', error)
      if (error instanceof Error) {
        const authError = error as AuthError
        switch (authError.code) {
          case 'auth/invalid-email':
            throw new Error('Invalid email address')
          case 'auth/user-not-found':
            throw new Error('No account found with this email')
          default:
            throw new Error('Failed to send reset email. Please try again.')
        }
      }
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Export the useAuth hook
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

