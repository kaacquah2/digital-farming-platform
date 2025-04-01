"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStripe } from "@stripe/stripe-js"

export function StripeTest() {
  const [status, setStatus] = useState<string>("")
  const [error, setError] = useState<string>("")

  const testStripeConnection = async () => {
    try {
      setStatus("Testing Stripe connection...")
      
      // Initialize Stripe
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      
      if (!stripe) {
        throw new Error("Failed to load Stripe")
      }

      // Test creating a payment intent
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "price_1R8aWqP9eIEsOwZUiOXyerrW", // Using the Basic plan price ID
          userId: "test-user",
        }),
      })

      const { sessionId } = await response.json()

      if (!sessionId) {
        throw new Error("No session ID returned")
      }

      setStatus("Stripe connection successful! Redirecting to checkout...")
      
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId })
      
      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setStatus("")
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Stripe Integration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testStripeConnection}>
          Test Stripe Connection
        </Button>
        {status && (
          <div className="text-sm text-green-500">{status}</div>
        )}
        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}
      </CardContent>
    </Card>
  )
} 