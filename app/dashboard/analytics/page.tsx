"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, DollarSign, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Analytics</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,231.89</div>
            <p className="text-xs text-terrabit-400">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Yield Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+15.2%</div>
            <p className="text-xs text-terrabit-400">Compared to last season</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Fields</CardTitle>
            <BarChart3 className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-terrabit-400">+2 new this month</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Season Progress</CardTitle>
            <Calendar className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">65%</div>
            <p className="text-xs text-terrabit-400">Until harvest</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-terrabit-400">
              Revenue chart will be displayed here
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Crop Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center text-terrabit-400">
              Crop performance chart will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 