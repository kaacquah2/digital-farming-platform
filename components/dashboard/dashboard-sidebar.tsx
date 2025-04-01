"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bug,
  Cloud,
  CropIcon,
  FileText,
  Globe,
  Home,
  Layers,
  Map,
  Microscope,
  Settings,
  Tractor,
  X,
  Zap,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname()
  const { user } = useAuth()

  const isActive = (path) => {
    return pathname === path
  }

  const navigation = [
    { name: "Overview", href: "/dashboard/overview", icon: Home },
    { name: "Fields", href: "/dashboard/fields", icon: CropIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Weather", href: "/dashboard/weather", icon: Cloud },
    { name: "Pests", href: "/dashboard/pests", icon: Bug },
    { name: "Soil Health", href: "/dashboard/soil-health", icon: Microscope },
    { name: "Maps", href: "/dashboard/maps", icon: Map },
    { name: "Resources", href: "/dashboard/resources", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-20 w-64 border-r border-terrabit-800 bg-terrabit-900 transition-transform md:translate-x-0`}
      >
        <div className="flex h-16 items-center border-b border-terrabit-800 px-6">
          <Link className="flex items-center gap-2 font-semibold text-white" href="/">
            <CropIcon className="h-6 w-6 text-terrabit-400" />
            <span>TerraBit</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden text-white hover:bg-terrabit-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-terrabit-800 text-white"
                    : "text-terrabit-400 hover:bg-terrabit-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-terrabit-800 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-terrabit-800 flex items-center justify-center text-terrabit-400">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">{user?.displayName || "User"}</span>
              <span className="text-xs text-terrabit-400">{user?.email || "user@example.com"}</span>
            </div>
          </div>
        </div>
      </aside>
      <div
        className={`${isSidebarOpen ? "block" : "hidden"} fixed inset-0 z-10 bg-black/50 backdrop-blur-sm md:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      />
    </>
  )
}

