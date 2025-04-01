import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Pricing | TerraBit",
  description: "Choose the right plan for your farming needs",
}

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing Plans</h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Choose the right plan for your farming needs. All plans include access to our core features.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Basic Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Basic</CardTitle>
            <CardDescription>For small farms just getting started</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $0<span className="ml-1 text-2xl font-medium text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Up to 3 fields</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Basic soil analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Weather forecasts</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Community support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/signup">Get Started</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col border-green-500 shadow-lg">
          <CardHeader className="bg-green-50 dark:bg-green-900/20">
            <div className="text-center text-sm font-medium uppercase text-green-600 dark:text-green-400">
              Most Popular
            </div>
            <CardTitle className="text-2xl">Pro</CardTitle>
            <CardDescription>For medium-sized farms seeking optimization</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $29<span className="ml-1 text-2xl font-medium text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Up to 15 fields</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Advanced soil analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Pest detection</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Yield predictions</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Email support</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Data export</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/signup?plan=pro">Try Pro</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl">Enterprise</CardTitle>
            <CardDescription>For large agricultural operations</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $99<span className="ml-1 text-2xl font-medium text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Unlimited fields</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Comprehensive soil analysis</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Advanced pest management</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>AI-powered recommendations</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Priority support</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>API access</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Custom integrations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/contact?subject=Enterprise">Contact Sales</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mx-auto mt-16 max-w-3xl text-center">
        <h2 className="text-2xl font-bold">Need a custom solution?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We offer tailored solutions for agricultural cooperatives, government agencies, and research institutions.
        </p>
        <Button asChild className="mt-6">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

