"use client"

import { useState } from "react"
import Image from "next/image"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ShoppingCart, Star, Tag, Truck, Leaf } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

// Sample product data
const products = [
  {
    id: 1,
    name: "SoilSense Pro Moisture Sensor",
    category: "sensors",
    price: 129.99,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    description: "Advanced soil moisture sensor with wireless connectivity and real-time monitoring capabilities.",
    features: [
      "Wireless connectivity",
      "Real-time monitoring",
      "Long battery life",
      "Weather-resistant",
      "Mobile app integration",
    ],
    inStock: true,
    discount: 10,
    tags: ["New", "Best Seller"],
  },
  {
    id: 2,
    name: "NutriTrack Soil Analyzer Kit",
    category: "sensors",
    price: 249.99,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=300",
    description: "Complete soil analysis kit for measuring NPK levels, pH, and micronutrients with cloud data storage.",
    features: [
      "NPK analysis",
      "pH measurement",
      "Micronutrient detection",
      "Cloud data storage",
      "Historical tracking",
    ],
    inStock: true,
    discount: 0,
    tags: ["Popular"],
  },
  {
    id: 3,
    name: "CropGuard Pest Detection System",
    category: "monitoring",
    price: 349.99,
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300",
    description: "AI-powered pest detection system with camera traps and automated alerts for early intervention.",
    features: [
      "AI image recognition",
      "Automated alerts",
      "Solar powered",
      "Wireless connectivity",
      "Weather-resistant",
    ],
    inStock: false,
    discount: 0,
    tags: [],
  },
  {
    id: 4,
    name: "WeatherWatch Pro Station",
    category: "monitoring",
    price: 199.99,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
    description: "Professional weather station with precipitation, wind, temperature, and humidity sensors.",
    features: [
      "Precipitation tracking",
      "Wind speed & direction",
      "Temperature monitoring",
      "Humidity sensing",
      "Historical data",
    ],
    inStock: true,
    discount: 15,
    tags: ["Sale"],
  },
  {
    id: 5,
    name: "FarmDrone X1 Mapping System",
    category: "drones",
    price: 1299.99,
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
    description: "Professional mapping drone with multispectral imaging for comprehensive field analysis.",
    features: [
      "Multispectral imaging",
      "4K camera",
      "Automated flight paths",
      "45-minute flight time",
      "Field mapping software",
    ],
    inStock: true,
    discount: 0,
    tags: ["Premium"],
  },
  {
    id: 6,
    name: "TerraBit Premium Subscription",
    category: "software",
    price: 49.99,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Annual subscription to TerraBit Premium with advanced analytics, AI recommendations, and priority support.",
    features: ["Advanced analytics", "AI recommendations", "Priority support", "Unlimited data storage", "API access"],
    inStock: true,
    discount: 20,
    tags: ["Recommended"],
  },
]

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return 0 // featured
      }
    })

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-terrabit-950">
        <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex flex-1">
          <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">TerraBit Products</h1>
                <p className="text-terrabit-300">Discover tools and solutions to optimize your farming operations</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-terrabit-400" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-9 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[140px] border-terrabit-700 bg-terrabit-800/50 text-white">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="sensors">Sensors</SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                      <SelectItem value="drones">Drones</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] border-terrabit-700 bg-terrabit-800/50 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="grid" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="bg-terrabit-900 border border-terrabit-800">
                    <TabsTrigger
                      value="grid"
                      className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                    >
                      Grid View
                    </TabsTrigger>
                    <TabsTrigger
                      value="list"
                      className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                    >
                      List View
                    </TabsTrigger>
                  </TabsList>

                  <p className="text-sm text-terrabit-300">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>

                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="gradient-card shadow-card border-terrabit-800 overflow-hidden flex flex-col"
                      >
                        <div className="relative h-48 bg-terrabit-800/50">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                          />
                          {product.discount > 0 && (
                            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                              {product.discount}% OFF
                            </Badge>
                          )}
                          {product.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              className="absolute top-2 left-2 bg-terrabit-600 hover:bg-terrabit-700"
                              style={{ top: `${2 + index * 30}px` }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg text-white">{product.name}</CardTitle>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-terrabit-200">{product.rating}</span>
                            </div>
                          </div>
                          <CardDescription className="text-terrabit-300 line-clamp-2">
                            {product.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-terrabit-400" />
                              <span className="text-lg font-bold text-white">
                                $
                                {product.discount > 0
                                  ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                  : product.price.toFixed(2)}
                                {product.discount > 0 && (
                                  <span className="text-sm line-through text-terrabit-400 ml-2">
                                    ${product.price.toFixed(2)}
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-terrabit-400" />
                              <span className={`text-sm ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                          >
                            Details
                          </Button>
                          <Button
                            className="bg-terrabit-500 text-white hover:bg-terrabit-600"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="list" className="mt-0 space-y-4">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="gradient-card shadow-card border-terrabit-800 overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-48 bg-terrabit-800/50">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                          />
                          {product.discount > 0 && (
                            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                              {product.discount}% OFF
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-sm text-terrabit-200">{product.rating}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-white">
                                $
                                {product.discount > 0
                                  ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                  : product.price.toFixed(2)}
                                {product.discount > 0 && (
                                  <span className="text-sm line-through text-terrabit-400 ml-2">
                                    ${product.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <span className={`text-sm ${product.inStock ? "text-green-400" : "text-red-400"}`}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </div>
                          </div>
                          <p className="text-terrabit-300 mb-4">{product.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {product.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="border-terrabit-700 text-terrabit-200">
                                <Leaf className="h-3 w-3 mr-1 text-terrabit-400" />
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-end mt-auto gap-2">
                            <Button
                              variant="outline"
                              className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                            >
                              Details
                            </Button>
                            <Button
                              className="bg-terrabit-500 text-white hover:bg-terrabit-600"
                              disabled={!product.inStock}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

