"use client"

import { useState } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const plans = [
  {
    name: "Basic",
    price: 0,
    description: "Perfect for small farms getting started",
    features: [
      "Up to 5 fields",
      "Basic crop tracking",
      "Weather forecasts",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 29,
    description: "For medium-sized farms seeking optimization",
    features: [
      "Up to 15 fields",
      "Advanced crop tracking",
      "Disease detection",
      "Weather integration",
      "Analytics dashboard",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large farms requiring full automation",
    features: [
      "Unlimited fields",
      "All Pro features",
      "Custom integrations",
      "Field mapping",
      "API access",
      "Dedicated support",
    ],
  },
]

export const metadata: Metadata = {
  title: "Pricing | TerraBit",
  description: "Choose the right plan for your farming needs",
}

export default function PricingPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (plan: string) => {
    setIsLoading(true)
    try {
      if (!user) {
        window.location.href = `/signup?redirect=/pricing&plan=${plan}`
        return
      }
      window.location.href = `/payment?plan=${plan}`
    } catch (error) {
      console.error("Error subscribing:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setIsLoading(true)
    try {
      // Get the ID token
      const idToken = await user?.getIdToken()
      
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })
      
      if (!response.ok) {
        throw new Error("Failed to create portal session")
      }
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Error managing subscription:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Pricing</h1>
          <p className="text-muted-foreground">
            Choose the right plan for your farming needs
          </p>
          {user?.subscriptionStatus === 'active' && (
            <div className="mt-4">
              <Button onClick={handleManageSubscription} disabled={isLoading}>
                Manage Current Subscription
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                selectedPlan === plan.name.toLowerCase() ? "border-primary" : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  ${plan.price}
                  <span className="ml-1 text-2xl font-medium text-muted-foreground">
                    /month
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(plan.name.toLowerCase())}
                  disabled={isLoading || (user?.plan === plan.name.toLowerCase())}
                >
                  {user?.plan === plan.name.toLowerCase()
                    ? "Current Plan"
                    : plan.price === 0
                    ? "Get Started"
                    : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

