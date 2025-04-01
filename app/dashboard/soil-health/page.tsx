"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Thermometer, Leaf, Activity } from "lucide-react"

export default function SoilHealthPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Soil Health</h1>
        <Button className="bg-terrabit-600 hover:bg-terrabit-700">
          <Activity className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Soil Moisture</CardTitle>
            <Droplet className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">65%</div>
            <p className="text-xs text-terrabit-400">Optimal range</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Soil Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">22°C</div>
            <p className="text-xs text-terrabit-400">Favorable</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">pH Level</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">6.5</div>
            <p className="text-xs text-terrabit-400">Neutral</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Organic Matter</CardTitle>
            <Activity className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3.2%</div>
            <p className="text-xs text-terrabit-400">Good</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Soil Health Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-terrabit-400">
              Soil health trends chart will be displayed here
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">Field A Analysis</p>
                  <span className="text-xs text-terrabit-400">2 days ago</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Nitrogen</span>
                    <span className="text-white">45 mg/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Phosphorus</span>
                    <span className="text-white">32 mg/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Potassium</span>
                    <span className="text-white">180 mg/kg</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">Field B Analysis</p>
                  <span className="text-xs text-terrabit-400">5 days ago</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Nitrogen</span>
                    <span className="text-white">38 mg/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Phosphorus</span>
                    <span className="text-white">28 mg/kg</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Potassium</span>
                    <span className="text-white">165 mg/kg</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 