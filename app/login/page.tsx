"use client"

import { useState, FormEvent, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CropIcon, AlertCircle, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"
import type { CheckedState } from "@radix-ui/react-checkbox"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const router = useRouter()
  const { signIn, resetPassword, user } = useAuth()

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Load saved email if Remember Me was checked
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signIn(email, password)
      
      // Handle Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during sign in. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while sending the reset email. Please try again."
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-terrabit-900 to-terrabit-950">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <CropIcon className="h-6 w-6 text-terrabit-400" />
          <span className="text-xl font-bold text-white">TerraBit</span>
        </Link>
        <div className="w-full max-w-md space-y-6 rounded-lg border border-terrabit-800 bg-terrabit-900/60 p-6 shadow-lg backdrop-blur-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-terrabit-200">Enter your credentials to access your account</p>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/60 text-white border-red-700">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resetSent && (
            <Alert className="bg-green-900/60 text-white border-green-700">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Password reset email sent. Please check your inbox.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-terrabit-100">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-terrabit-400" />
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400 focus:border-terrabit-500"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-terrabit-100">
                  Password
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="text-xs text-terrabit-400 hover:text-terrabit-300 p-0 h-auto"
                  onClick={handleResetPassword}
                >
                  Forgot your password?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-terrabit-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400 focus:border-terrabit-500"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={rememberMe}
                onCheckedChange={(checked: CheckedState) => setRememberMe(checked === true)}
                className="border-terrabit-500 data-[state=checked]:bg-terrabit-500 data-[state=checked]:text-white"
              />
              <Label htmlFor="remember" className="text-sm font-normal text-terrabit-100">
                Remember me
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-terrabit-500 text-white hover:bg-terrabit-600"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="text-center text-sm text-terrabit-200">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-terrabit-400 hover:text-terrabit-300 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

