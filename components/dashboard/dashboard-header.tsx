"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CropIcon, Menu, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { signOut } from "@/firebase/auth"
import { useAuth } from "@/context/auth-context"

export function DashboardHeader({ isSidebarOpen, setIsSidebarOpen }) {
  const router = useRouter()
  const { user } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user || !user.displayName) return "TB"
    return user.displayName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
      <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex items-center gap-2">
        <CropIcon className="h-6 w-6 text-green-600" />
        <span className="text-lg font-semibold">TerraBit</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Select defaultValue="farm1">
          <SelectTrigger className="w-[180px] border-green-200">
            <SelectValue placeholder="Select Farm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="farm1">North Field Farm</SelectItem>
            <SelectItem value="farm2">South Valley Farm</SelectItem>
            <SelectItem value="farm3">East Ridge Farm</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="border-green-200 text-green-700">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                <AvatarFallback className="bg-green-100 text-green-700">{getInitials()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.displayName || "User"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

