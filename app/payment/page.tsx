"use client"

import { Separator } from "@/components/ui/separator"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircle,
  CreditCard,
  CheckCircle,
  Calendar,
  Lock,
  User,
  DollarSign,
  ArrowLeft,
  Loader2,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

export default function PaymentPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

  const plans = {
    basic: {
      name: "Basic",
      price: 29,
      period: "month",
      features: ["Up to 500 acres", "Basic field mapping", "Weather integration", "Email support"],
    },
    professional: {
      name: "Professional",
      price: 79,
      period: "month",
      features: [
        "Up to 2,000 acres",
        "Advanced field mapping",
        "Prescription creation",
        "Equipment integration",
        "Priority support",
      ],
    },
    enterprise: {
      name: "Enterprise",
      price: 199,
      period: "month",
      features: [
        "Unlimited acres",
        "Custom integrations",
        "Advanced analytics",
        "Dedicated account manager",
        "24/7 phone and email support",
      ],
    },
  }

  const handleProcessPayment = () => {
    setIsProcessing(true)
    setError("")

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)

      // Redirect to dashboard after successful payment
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <ProtectedRoute>
        <div className="flex min-h-screen flex-col bg-terrabit-950">
          <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex flex-1">
            <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8">
              <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center">
                <div className="rounded-full bg-green-600/20 p-3 mb-4">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
                <p className="text-terrabit-300 mb-6">
                  Thank you for your payment. Your subscription to the {plans[selectedPlan].name} plan has been
                  activated.
                </p>
                <Button
                  className="bg-terrabit-500 text-white hover:bg-terrabit-600"
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-terrabit-950">
        <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex flex-1">
          <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-4 border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-white">Payment</h1>
                  <p className="text-terrabit-300">Complete your subscription purchase</p>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mb-6 bg-red-900/60 text-white border-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="gradient-card shadow-card border-terrabit-800">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Payment Method</CardTitle>
                      <CardDescription className="text-terrabit-300">
                        Select your preferred payment method
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                        <div className="flex items-center space-x-2 rounded-lg border border-terrabit-700 p-4 hover:bg-terrabit-800/50 cursor-pointer">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                            className="border-terrabit-500 text-terrabit-500"
                          />
                          <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 mr-2 text-terrabit-400" />
                              <span className="text-white">Credit / Debit Card</span>
                            </div>
                          </Label>
                          <div className="flex space-x-1">
                            <div className="h-6 w-10 rounded bg-blue-600"></div>
                            <div className="h-6 w-10 rounded bg-red-600"></div>
                            <div className="h-6 w-10 rounded bg-yellow-600"></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border border-terrabit-700 p-4 hover:bg-terrabit-800/50 cursor-pointer">
                          <RadioGroupItem
                            value="paypal"
                            id="paypal"
                            className="border-terrabit-500 text-terrabit-500"
                          />
                          <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <div className="mr-2 text-blue-500 font-bold">
                                Pay<span className="text-blue-700">Pal</span>
                              </div>
                              <span className="text-white">PayPal</span>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border border-terrabit-700 p-4 hover:bg-terrabit-800/50 cursor-pointer">
                          <RadioGroupItem
                            value="bank-transfer"
                            id="bank-transfer"
                            className="border-terrabit-500 text-terrabit-500"
                          />
                          <Label htmlFor="bank-transfer" className="flex-1 cursor-pointer">
                            <div className="flex items-center">
                              <DollarSign className="h-5 w-5 mr-2 text-terrabit-400" />
                              <span className="text-white">Bank Transfer</span>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      <Tabs value={paymentMethod} className="mt-6">
                        <TabsContent value="credit-card" className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-name" className="text-terrabit-100">
                              Cardholder Name
                            </Label>
                            <div className="relative">
                              <User className="absolute left-3 top-2.5 h-4 w-4 text-terrabit-400" />
                              <Input
                                id="card-name"
                                placeholder="John Smith"
                                className="pl-10 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="card-number" className="text-terrabit-100">
                              Card Number
                            </Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-terrabit-400" />
                              <Input
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                                className="pl-10 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry" className="text-terrabit-100">
                                Expiry Date
                              </Label>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-terrabit-400" />
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="pl-10 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cvc" className="text-terrabit-100">
                                CVC
                              </Label>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-terrabit-400" />
                                <Input
                                  id="cvc"
                                  placeholder="123"
                                  className="pl-10 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="paypal" className="mt-4">
                          <div className="text-center py-8">
                            <div className="text-2xl font-bold text-blue-500 mb-4">
                              Pay<span className="text-blue-700">Pal</span>
                            </div>
                            <p className="text-terrabit-200 mb-4">
                              Click the button below to complete your payment with PayPal.
                            </p>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Continue to PayPal</Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="bank-transfer" className="mt-4">
                          <div className="space-y-4">
                            <div className="rounded-lg border border-terrabit-700 p-4 bg-terrabit-800/30">
                              <h3 className="text-white font-medium mb-2">Bank Transfer Details</h3>
                              <div className="space-y-2 text-terrabit-200">
                                <p>Account Name: TerraBit Inc.</p>
                                <p>Account Number: 1234567890</p>
                                <p>Routing Number: 987654321</p>
                                <p>Bank: Example Bank</p>
                                <p>Reference: Your email address</p>
                              </div>
                            </div>
                            <p className="text-terrabit-300 text-sm">
                              Please include your email address as the payment reference. Your subscription will be
                              activated once the payment is confirmed.
                            </p>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-terrabit-500 text-white hover:bg-terrabit-600"
                        onClick={handleProcessPayment}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Pay ${plans[selectedPlan].price}/{plans[selectedPlan].period}
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="lg:col-span-1">
                  <Card className="gradient-card shadow-card border-terrabit-800">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-terrabit-100">Selected Plan</Label>
                        <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                          <SelectTrigger className="border-terrabit-700 bg-terrabit-800/50 text-white">
                            <SelectValue placeholder="Select plan" />
                          </SelectTrigger>
                          <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                            <SelectItem value="basic">Basic - $29/month</SelectItem>
                            <SelectItem value="professional">Professional - $79/month</SelectItem>
                            <SelectItem value="enterprise">Enterprise - $199/month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-terrabit-100">Plan Features</Label>
                        <ul className="space-y-1 text-terrabit-200">
                          {plans[selectedPlan].features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-terrabit-400 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="my-4 bg-terrabit-700" />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-terrabit-200">Subtotal</span>
                          <span className="text-white">${plans[selectedPlan].price}.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-terrabit-200">Tax</span>
                          <span className="text-white">$0.00</span>
                        </div>
                        <div className="flex justify-between font-bold">
                          <span className="text-terrabit-100">Total</span>
                          <span className="text-white">${plans[selectedPlan].price}.00</span>
                        </div>
                      </div>

                      <div className="pt-4 text-xs text-terrabit-300">
                        <p>
                          By completing this purchase, you agree to our{" "}
                          <Link href="/terms" className="text-terrabit-400 hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-terrabit-400 hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

