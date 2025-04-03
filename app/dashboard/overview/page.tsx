"use client"

import { useState, useEffect } from "react"
import { Calendar, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { HistoricalYieldChart } from "@/components/charts/historical-yield-chart"
import { CropDistributionChart } from "@/components/charts/crop-distribution-chart"
import { FieldHealthMap } from "@/components/charts/field-health-map"
import { CropDiseaseDetector } from "@/components/crop-disease-detector"
import { toast } from "sonner"

// Mock data for demonstration
const mockData = {
  totalYield: 24500,
  fieldHealth: 92,
  pestRisk: "Low",
  weather: {
    temperature: 24,
    condition: "Partly cloudy",
    humidity: 65,
  },
}

export default function OverviewPage() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [data, setData] = useState(mockData)

  useEffect(() => {
    const demoMode = localStorage.getItem("demoMode") === "true"
    setIsDemoMode(demoMode)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setData({
        ...data,
        weather: {
          ...data.weather,
          temperature: Math.floor(Math.random() * 10) + 20, // Random temp between 20-30
        },
      })
      toast.success("Data refreshed successfully")
    } catch (error) {
      toast.error("Failed to refresh data")
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.totalYield.toLocaleString()} kg</div>
            <p className="text-xs text-terrabit-400">+12% from last season</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Field Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.fieldHealth}%</div>
            <p className="text-xs text-terrabit-400">+5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Pest Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.pestRisk}</div>
            <p className="text-xs text-terrabit-400">No active threats</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.weather.temperature}°C</div>
            <p className="text-xs text-terrabit-400">{data.weather.condition}, {data.weather.humidity}% humidity</p>
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
            <HistoricalYieldChart selectedYear={selectedYear} />
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Crop Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <CropDistributionChart selectedYear={selectedYear} />
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