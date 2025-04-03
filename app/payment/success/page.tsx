"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/stripe/verify-payment?session_id=${sessionId}`)
        if (!response.ok) {
          throw new Error("Failed to verify payment")
        }
        setIsLoading(false)
      } catch (error) {
        setError("Failed to verify payment. Please contact support.")
        setIsLoading(false)
      }
    }

    if (sessionId) {
      verifyPayment()
    } else {
      setError("No session ID found")
      setIsLoading(false)
    }
  }, [sessionId])

  if (isLoading) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Verifying your payment...</h1>
          <p className="mt-2 text-muted-foreground">Please wait while we confirm your subscription.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container flex min-h-[60vh] flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Error</h1>
          <p className="mt-2 text-muted-foreground">{error}</p>
          <Button asChild className="mt-4">
            <Link href="/pricing">Back to Pricing</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-bold">Payment Successful!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for subscribing to our Pro plan. Your account has been upgraded.
        </p>
        <div className="mt-6 space-x-4">
          <Button asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile">Manage Subscription</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 