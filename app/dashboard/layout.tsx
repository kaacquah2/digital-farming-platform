"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { useAuth } from "@/context/auth-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    // Check for demo mode
    const demoMode = localStorage.getItem("demoMode") === "true"
    const demoExpiry = localStorage.getItem("demoExpiry")
    
    if (demoMode && demoExpiry) {
      const expiryDate = new Date(demoExpiry)
      if (expiryDate > new Date()) {
        setIsDemoMode(true)
      } else {
        // Demo expired
        localStorage.removeItem("demoMode")
        localStorage.removeItem("demoExpiry")
        router.push("/")
      }
    } else if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user && !isDemoMode) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 