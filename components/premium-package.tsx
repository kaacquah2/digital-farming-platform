"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

const features = {
  basic: [
    "Basic field mapping",
    "Weather updates",
    "Basic crop tracking",
    "Email support",
    "Up to 5 fields",
    "Basic analytics",
  ],
  pro: [
    "Advanced field mapping",
    "Real-time weather alerts",
    "Advanced crop tracking",
    "Priority support",
    "Up to 20 fields",
    "Advanced analytics",
    "Soil health monitoring",
    "Pest detection",
    "AI-powered disease detection",
    "Mobile app access",
  ],
  enterprise: [
    "Unlimited field mapping",
    "Custom weather alerts",
    "Advanced crop tracking",
    "24/7 dedicated support",
    "Unlimited fields",
    "Custom analytics",
    "Advanced soil health monitoring",
    "AI-powered pest detection",
    "Advanced AI disease detection",
    "Mobile app access",
    "API access",
    "Custom integrations",
    "Team collaboration",
    "Training sessions",
  ],
}

export function PremiumPackage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleTryDemo = async () => {
    setIsLoading(true)
    try {
      // Set demo mode in localStorage
      localStorage.setItem("demoMode", "true")
      localStorage.setItem("demoExpiry", new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString())
      
      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error starting demo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscribe = async (plan: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      })

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-muted-foreground">
          Select the plan that best fits your farming needs
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <Card className={`relative ${selectedPlan === "basic" ? "border-primary" : ""}`}>
          <CardHeader>
            <CardTitle>Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$29<span className="text-sm text-muted-foreground">/month</span></div>
            <ul className="space-y-2 mb-6">
              {features.basic.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              onClick={() => handleSubscribe("basic")}
              disabled={isLoading}
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>

        {/* Pro Plan */}
        <Card className={`relative ${selectedPlan === "pro" ? "border-primary" : ""}`}>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$79<span className="text-sm text-muted-foreground">/month</span></div>
            <ul className="space-y-2 mb-6">
              {features.pro.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              onClick={() => handleSubscribe("pro")}
              disabled={isLoading}
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card className={`relative ${selectedPlan === "enterprise" ? "border-primary" : ""}`}>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">$199<span className="text-sm text-muted-foreground">/month</span></div>
            <ul className="space-y-2 mb-6">
              {features.enterprise.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full"
              onClick={() => handleSubscribe("enterprise")}
              disabled={isLoading}
            >
              Contact Sales
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-8">
        <Button
          variant="outline"
          onClick={handleTryDemo}
          disabled={isLoading}
          className="w-full max-w-md"
        >
          {isLoading ? "Starting Demo..." : "Try Demo Version"}
        </Button>
      </div>
    </div>
  )
} 