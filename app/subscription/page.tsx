import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function SubscriptionPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    const fetchSubscription = async () => {
      try {
        // Get the ID token
        const idToken = await user.getIdToken()
        
        const response = await fetch("/api/stripe/subscription", {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch subscription")
        }
        const data = await response.json()
        setSubscription(data.subscription)
      } catch (err) {
        setError("Failed to load subscription details")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user, router])

  const handleManageSubscription = async () => {
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
    } catch (err) {
      setError("Failed to open subscription management portal")
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push("/pricing")}>
          View Pricing Plans
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Subscription Management</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>
            Manage your subscription and billing details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {subscription ? (
            <div className="space-y-4">
              <div>
                <p className="font-medium">Status</p>
                <p className="capitalize">{subscription.status}</p>
              </div>
              <div>
                <p className="font-medium">Plan</p>
                <p>{subscription.plan.name}</p>
              </div>
              <div>
                <p className="font-medium">Current Period</p>
                <p>
                  {new Date(subscription.current_period_start * 1000).toLocaleDateString()} -{" "}
                  {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
                </p>
              </div>
              <Button onClick={handleManageSubscription}>
                Manage Subscription
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p>You don't have an active subscription.</p>
              <Button onClick={() => router.push("/pricing")}>
                View Pricing Plans
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 