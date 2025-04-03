"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Brain,
  Cloud,
  BarChart3,
  Map,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  Users,
} from "lucide-react"

const features = [
  {
    title: "Crop Management",
    description: "Track and manage your crops with precision. Monitor growth stages, health status, and yield predictions.",
    icon: Leaf,
    benefits: [
      "Real-time crop monitoring",
      "Growth stage tracking",
      "Yield prediction",
      "Health status alerts"
    ],
    category: "core"
  },
  {
    title: "Disease Detection",
    description: "AI-powered disease detection system that identifies plant diseases early and provides treatment recommendations.",
    icon: Brain,
    benefits: [
      "AI-powered detection",
      "Early warning system",
      "Treatment recommendations",
      "Historical analysis"
    ],
    category: "ai"
  },
  {
    title: "Weather Integration",
    description: "Get accurate weather forecasts and alerts to protect your crops from adverse conditions.",
    icon: Cloud,
    benefits: [
      "Real-time weather updates",
      "Custom alerts",
      "Historical weather data",
      "Irrigation recommendations"
    ],
    category: "monitoring"
  },
  {
    title: "Analytics Dashboard",
    description: "Comprehensive analytics and insights to optimize your farming operations and increase productivity.",
    icon: BarChart3,
    benefits: [
      "Performance metrics",
      "Trend analysis",
      "Custom reports",
      "Export capabilities"
    ],
    category: "analytics"
  },
  {
    title: "Field Mapping",
    description: "Create detailed field maps, track soil conditions, and plan crop rotations efficiently.",
    icon: Map,
    benefits: [
      "Interactive field maps",
      "Soil condition tracking",
      "Crop rotation planning",
      "Resource allocation"
    ],
    category: "planning"
  },
  {
    title: "Smart Recommendations",
    description: "Get personalized recommendations based on your farm's data and best agricultural practices.",
    icon: Lightbulb,
    benefits: [
      "Personalized insights",
      "Best practices",
      "Resource optimization",
      "Cost reduction tips"
    ],
    category: "ai"
  }
]

const categories = [
  { id: "all", label: "All Features" },
  { id: "core", label: "Core Features" },
  { id: "ai", label: "AI Features" },
  { id: "monitoring", label: "Monitoring" },
  { id: "analytics", label: "Analytics" },
  { id: "planning", label: "Planning" }
]

const benefits = [
  {
    title: "Increased Efficiency",
    description: "Streamline your farming operations with automated processes and smart recommendations.",
    icon: Zap
  },
  {
    title: "Better Decision Making",
    description: "Make informed decisions with real-time data and predictive analytics.",
    icon: Brain
  },
  {
    title: "Risk Reduction",
    description: "Minimize risks with early warning systems and preventive measures.",
    icon: Shield
  },
  {
    title: "Time Savings",
    description: "Save time with automated monitoring and reporting features.",
    icon: Clock
  },
  {
    title: "Team Collaboration",
    description: "Enable seamless collaboration between team members and stakeholders.",
    icon: Users
  }
]

export default function FeaturesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)

  const filteredFeatures = activeCategory === "all"
    ? features
    : features.filter(feature => feature.category === activeCategory)

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Powerful Features for Modern Farming</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how our platform can transform your farming operations with cutting-edge technology and smart features.
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {filteredFeatures.map((feature) => (
          <div
            key={feature.title}
            className="animate-fade-in-up"
            onMouseEnter={() => setHoveredFeature(feature.title)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="mt-4 w-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8 mb-12 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-primary/10 mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Farming?</h2>
        <p className="text-muted-foreground mb-6">
          Join thousands of farmers who are already using our platform to optimize their operations.
        </p>
        <Button size="lg" className="transition-transform hover:scale-105">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 