"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CropIcon, Menu, X } from "lucide-react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0 bg-background z-50">
      <Link className="flex items-center justify-center" href="/">
        <CropIcon className="h-6 w-6 text-green-600 mr-2" />
        <span className="font-bold text-xl">TerraBit</span>
      </Link>

      <Button variant="ghost" size="icon" className="md:hidden ml-auto" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <nav
        className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row md:ml-auto md:items-center bg-background md:bg-transparent border-b md:border-0 p-4 md:p-0 gap-4 md:gap-6 z-50`}
      >
        <Link className="text-sm font-medium hover:text-primary" href="#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:text-primary" href="#how-it-works">
          How It Works
        </Link>
        <Link className="text-sm font-medium hover:text-primary" href="#data-analysis">
          Data Analysis
        </Link>
        <Link className="text-sm font-medium hover:text-primary" href="#pricing">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:text-primary" href="/about">
          About
        </Link>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link href="/login">
            <Button variant="outline" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}

