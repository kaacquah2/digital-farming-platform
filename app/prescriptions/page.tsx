"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Cloud,
  CropIcon,
  Download,
  FileText,
  Home,
  Layers,
  Map,
  Menu,
  Plus,
  Settings,
  Tractor,
  Users,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PrescriptionsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex items-center gap-2">
          <CropIcon className="h-6 w-6 text-green-600" />
          <span className="text-lg font-semibold">FarmInsight</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Select defaultValue="farm1">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Farm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="farm1">North Field Farm</SelectItem>
              <SelectItem value="farm2">South Valley Farm</SelectItem>
              <SelectItem value="farm3">East Ridge Farm</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside
          className={`${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-20 w-64 border-r bg-background transition-transform md:translate-x-0`}
        >
          <div className="flex h-16 items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <CropIcon className="h-6 w-6 text-green-600" />
              <span>FarmInsight</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto md:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close Sidebar</span>
            </Button>
          </div>
          <nav className="grid gap-1 p-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <Map className="h-5 w-5" />
              Fields
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/prescriptions"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all hover:text-accent-foreground"
            >
              <Layers className="h-5 w-5" />
              Prescriptions
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <Cloud className="h-5 w-5" />
              Weather
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <Tractor className="h-5 w-5" />
              Equipment
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <FileText className="h-5 w-5" />
              Reports
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <Users className="h-5 w-5" />
              Team
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-accent-foreground"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden`}
          onClick={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 md:ml-64">
          <div className="container p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Prescriptions</h1>
                <div className="flex items-center gap-2">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Prescription
                  </Button>
                </div>
              </div>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Prescriptions</TabsTrigger>
                  <TabsTrigger value="seeding">Seeding</TabsTrigger>
                  <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                  <TabsTrigger value="pesticide">Pesticide</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>North Field Seeding Plan</CardTitle>
                        <CardDescription>Created on Apr 1, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-12 w-12 text-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Field</p>
                            <p className="text-sm text-muted-foreground">North Field</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">Seeding</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>South Valley Fertilizer Plan</CardTitle>
                        <CardDescription>Created on May 10, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-12 w-12 text-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Field</p>
                            <p className="text-sm text-muted-foreground">South Valley</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">Fertilizer</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>East Ridge Pesticide Plan</CardTitle>
                        <CardDescription>Created on Jun 15, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-12 w-12 text-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Field</p>
                            <p className="text-sm text-muted-foreground">East Ridge</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">Pesticide</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="seeding" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>North Field Seeding Plan</CardTitle>
                        <CardDescription>Created on Apr 1, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-12 w-12 text-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Field</p>
                            <p className="text-sm text-muted-foreground">North Field</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">Seeding</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="fertilizer" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>South Valley Fertilizer Plan</CardTitle>
                        <CardDescription>Created on May 10, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-12 w-12 text-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Field</p>
                            <p className="text-sm text-muted-foreground">South Valley</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">Fertilizer</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="pesticide" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>East Ridge Pesticide Plan</CardTitle>
                        <CardDescription>Created on Jun 15, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-12 w-12 text-muted" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium">Field</p>
                            <p className="text-sm text-muted-foreground">East Ridge</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Type</p>
                            <p className="text-sm text-muted-foreground">Pesticide</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

