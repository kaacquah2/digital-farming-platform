"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bug, AlertTriangle, CheckCircle, XCircle } from "lucide-react"

export default function PestsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Pest Management</h1>
        <Button className="bg-terrabit-600 hover:bg-terrabit-700">
          <Bug className="mr-2 h-4 w-4" />
          Report Pest
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-terrabit-400">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Monitored Areas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">8</div>
            <p className="text-xs text-terrabit-400">All clear</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Risk Level</CardTitle>
            <XCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Medium</div>
            <p className="text-xs text-terrabit-400">Monitor closely</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Last Inspection</CardTitle>
            <Bug className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2 days ago</div>
            <p className="text-xs text-terrabit-400">Next in 5 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Pest Activity Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-terrabit-400">
              Pest activity map will be displayed here
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Active Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Aphid Infestation</p>
                    <p className="text-xs text-terrabit-400">North Field</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-terrabit-700 text-white hover:bg-terrabit-800">
                  View Details
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Spider Mites</p>
                    <p className="text-xs text-terrabit-400">South Field</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-terrabit-700 text-white hover:bg-terrabit-800">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 