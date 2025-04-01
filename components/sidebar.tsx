"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Crop,
  BarChart3,
  Cloud,
  Bug,
  Leaf,
  Map,
  BookOpen,
  Settings,
  LogOut,
  Calendar,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"

const routes = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard/overview",
  },
  {
    label: "Crops",
    icon: Leaf,
    href: "/dashboard/crops",
  },
  {
    label: "Disease Detection",
    icon: Bug,
    href: "/dashboard/disease-detection",
  },
  {
    label: "Calendar",
    icon: Calendar,
    href: "/dashboard/calendar",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    label: "Help & Support",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem("demoMode")
      localStorage.removeItem("demoExpiry")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-background border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Crop className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">TerraBit</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {routes.map((route) => {
                const isActive = pathname === route.href
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center flex-1">
                      <route.icon
                        className={cn(
                          "mr-3 h-5 w-5",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      {route.label}
                    </div>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>
          <div className="flex-shrink-0 flex border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 