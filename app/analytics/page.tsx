"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataImportExport } from "@/components/data-import-export"
import { RecommendationEngine } from "@/components/recommendation-engine"
import { GlobalFarmlandDatabase } from "@/components/global-farmland-database"
import ProtectedRoute from "@/components/protected-route"

export default function AnalyticsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-terrabit-950">
        <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex flex-1">
          <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Agricultural Data Analytics</h1>
                <p className="text-terrabit-300">Analyze global and local agricultural data from 1990 to 2025</p>
              </div>

              <Tabs defaultValue="import-export" className="w-full">
                <TabsList className="bg-terrabit-900 border border-terrabit-800 mb-6">
                  <TabsTrigger
                    value="import-export"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Import & Export
                  </TabsTrigger>
                  <TabsTrigger
                    value="recommendations"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    AI Recommendations
                  </TabsTrigger>
                  <TabsTrigger
                    value="global-database"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Global Database
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="import-export">
                  <DataImportExport />
                </TabsContent>

                <TabsContent value="recommendations">
                  <RecommendationEngine />
                </TabsContent>

                <TabsContent value="global-database">
                  <GlobalFarmlandDatabase />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

