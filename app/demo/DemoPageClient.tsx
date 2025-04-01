"use client"

import { useState } from "react"
import PestManagement from "@/components/pest-management"
import ClimateWaterManagement from "@/components/climate-water-management"
import SoilHealth from "@/components/soil-health"
import PrecisionAgriculture from "@/components/precision-agriculture"

export default function DemoPageClient() {
  const [selectedYear, setSelectedYear] = useState("2023")

  return (
    <div className="min-h-screen">
      <div className="bg-green-50 dark:bg-green-900/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">TerraBit Demo</h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the full capabilities of our digital farming platform. Explore how TerraBit can help you optimize
            your agricultural operations.
          </p>
        </div>
      </div>

      <PestManagement />
      <ClimateWaterManagement />
      <SoilHealth />
      <PrecisionAgriculture />
    </div>
  )
}

