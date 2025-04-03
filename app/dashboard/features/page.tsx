"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Leaf, Bug, Cloud, BarChart3, Map } from "lucide-react"

const features = [
  {
    title: "Crop Management",
    description: "Track and manage your crops with detailed information about growth stages, health, and yield predictions.",
    icon: Leaf,
  },
  {
    title: "Disease Detection",
    description: "AI-powered disease detection system that helps identify plant diseases early and provides treatment recommendations.",
    icon: Bug,
  },
  {
    title: "Weather Integration",
    description: "Real-time weather data and forecasts to help you make informed decisions about your farming activities.",
    icon: Cloud,
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive analytics and insights about your farm's performance, crop health, and resource utilization.",
    icon: BarChart3,
  },
  {
    title: "Field Mapping",
    description: "Create detailed maps of your fields and track different crop zones with precision.",
    icon: Map,
  },
  {
    title: "Smart Recommendations",
    description: "AI-powered recommendations for optimal planting times, irrigation schedules, and crop rotation.",
    icon: Sparkles,
  },
]

export default function FeaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Features</h1>
        <p className="text-muted-foreground">
          Explore the powerful features that help you manage your farm efficiently.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <feature.icon className="h-6 w-6 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 