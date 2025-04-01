"use client"

import { useState, useEffect } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HistoricalYieldChart } from "@/components/charts/historical-yield-chart"
import { CropDistributionChart } from "@/components/charts/crop-distribution-chart"
import { FieldHealthMap } from "@/components/charts/field-health-map"
import { Button } from "@/components/ui/button"
import { CropDiseaseDetector } from "@/components/crop-disease-detector"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function OverviewPage() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    const demoMode = localStorage.getItem("demoMode") === "true"
    setIsDemoMode(demoMode)
  }, [])

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Overview</h1>
        <div className="flex items-center gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px] border-terrabit-700 bg-terrabit-800/50 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
              <SelectItem value="2023">2023 Season</SelectItem>
              <SelectItem value="2022">2022 Season</SelectItem>
              <SelectItem value="2021">2021 Season</SelectItem>
              <SelectItem value="2020">2020 Season</SelectItem>
              <SelectItem value="historical">Historical Data (1990-2025)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24,500 kg</div>
            <p className="text-xs text-terrabit-400">+12% from last season</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Field Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">92%</div>
            <p className="text-xs text-terrabit-400">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pest Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Low</div>
            <p className="text-xs text-terrabit-400">No active threats</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24°C</div>
            <p className="text-xs text-terrabit-400">Partly cloudy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Crop Disease Detection</h2>
          {isDemoMode && (
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              Demo Mode
            </span>
          )}
          <Button variant="outline">View History</Button>
        </div>
        <CropDiseaseDetector />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Historical Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <HistoricalYieldChart />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Crop Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <CropDistributionChart />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-terrabit-900 border-terrabit-800">
        <CardHeader>
          <CardTitle className="text-white">Field Health Map</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldHealthMap />
        </CardContent>
      </Card>
    </div>
  )
} 