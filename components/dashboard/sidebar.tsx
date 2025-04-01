"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"
import {
  LayoutDashboard,
  Calendar,
  Crop,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function Sidebar({ className, isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-terrabit-900 border-r border-terrabit-800 transition-transform duration-200 ease-in-out md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex h-16 items-center border-b border-terrabit-800 px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-white">Digital Farming</span>
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold text-white">Navigation</h2>
            <div className="space-y-1">
              <Link href="/dashboard">
                <Button
                  variant={pathname === "/dashboard" ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-terrabit-800"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Overview
                </Button>
              </Link>
              <Link href="/dashboard/calendar">
                <Button
                  variant={pathname === "/dashboard/calendar" ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-terrabit-800"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Calendar
                </Button>
              </Link>
              <Link href="/dashboard/crops">
                <Button
                  variant={pathname === "/dashboard/crops" ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-terrabit-800"
                >
                  <Crop className="mr-2 h-4 w-4" />
                  Crops
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button
                  variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-terrabit-800"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Link href="/dashboard/help">
                <Button
                  variant={pathname === "/dashboard/help" ? "secondary" : "ghost"}
                  className="w-full justify-start text-white hover:text-white hover:bg-terrabit-800"
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="absolute bottom-0 left-0 right-0 border-t border-terrabit-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:text-white hover:bg-terrabit-800"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
} 