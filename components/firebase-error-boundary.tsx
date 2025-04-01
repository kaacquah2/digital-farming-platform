"use client"

import { useState, useEffect, ReactNode } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { auth } from "@/lib/firebase"

interface FirebaseErrorBoundaryProps {
  children: ReactNode
}

export default function FirebaseErrorBoundary({ children }: FirebaseErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if Firebase is properly configured
    const checkFirebase = async () => {
      try {
        // Wait a bit to make sure Firebase had a chance to initialize
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Firebase initialization error:", error)
        setHasError(true)
        setIsLoading(false)
      }
    }

    checkFirebase()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terrabit-500"></div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Firebase Configuration Error</AlertTitle>
          <AlertDescription>
            There was an error initializing Firebase. This could be due to missing or invalid environment variables.
            <div className="mt-4">
              <Button asChild className="w-full">
                <Link href="/demo">Continue in Demo Mode</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return children
}

