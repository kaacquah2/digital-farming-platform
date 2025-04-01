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
import {
  Search,
  Filter,
  Download,
  FileText,
  Video,
  Calendar,
  Clock,
  BookOpen,
  Bookmark,
  ExternalLink,
  ChevronRight,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

// Sample resources data
const resources = [
  {
    id: 1,
    title: "Soil Health Management Guide",
    type: "guide",
    category: "soil",
    image: "/placeholder.svg?height=300&width=300",
    description: "Comprehensive guide to understanding and improving soil health for sustainable farming.",
    datePublished: "2023-05-15",
    readTime: "15 min read",
    downloadable: true,
    tags: ["Soil Health", "Sustainability"],
    featured: true,
  },
  {
    id: 2,
    title: "Precision Agriculture Webinar",
    type: "video",
    category: "technology",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Expert panel discussion on the latest precision agriculture technologies and implementation strategies.",
    datePublished: "2023-06-22",
    duration: "45 min",
    tags: ["Precision Ag", "Technology"],
    featured: false,
  },
  {
    id: 3,
    title: "Crop Rotation Best Practices",
    type: "guide",
    category: "crops",
    image: "/placeholder.svg?height=300&width=300",
    description: "Learn effective crop rotation strategies to improve soil health and maximize yields.",
    datePublished: "2023-04-10",
    readTime: "12 min read",
    downloadable: true,
    tags: ["Crop Management", "Sustainability"],
    featured: true,
  },
  {
    id: 4,
    title: "Climate-Smart Farming Workshop",
    type: "event",
    category: "climate",
    image: "/placeholder.svg?height=300&width=300",
    description: "Virtual workshop on adapting farming practices to climate change and reducing environmental impact.",
    datePublished: "2023-07-15",
    eventDate: "2023-08-10",
    tags: ["Climate Change", "Sustainability"],
    featured: false,
  },
  {
    id: 5,
    title: "Pest Management Strategies",
    type: "guide",
    category: "pests",
    image: "/placeholder.svg?height=300&width=300",
    description: "Integrated pest management approaches for reducing chemical use while maintaining crop protection.",
    datePublished: "2023-03-05",
    readTime: "18 min read",
    downloadable: true,
    tags: ["Pest Control", "IPM"],
    featured: false,
  },
  {
    id: 6,
    title: "Water Conservation Techniques",
    type: "video",
    category: "water",
    image: "/placeholder.svg?height=300&width=300",
    description: "Practical demonstration of water conservation techniques for different farming systems.",
    datePublished: "2023-02-18",
    duration: "32 min",
    tags: ["Water Management", "Sustainability"],
    featured: true,
  },
  {
    id: 7,
    title: "Farm Data Management Webinar",
    type: "video",
    category: "technology",
    image: "/placeholder.svg?height=300&width=300",
    description: "Learn how to effectively collect, manage, and analyze farm data for better decision-making.",
    datePublished: "2023-01-25",
    duration: "60 min",
    tags: ["Data Management", "Technology"],
    featured: false,
  },
  {
    id: 8,
    title: "Sustainable Farming Conference",
    type: "event",
    category: "sustainability",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Annual conference bringing together experts and farmers to discuss sustainable agriculture practices.",
    datePublished: "2023-06-01",
    eventDate: "2023-09-15",
    tags: ["Sustainability", "Networking"],
    featured: true,
  },
]

export default function ResourcesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")

  // Filter resources
  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesType
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
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Farming Resources</h1>
                <p className="text-terrabit-300">Access guides, videos, and events to improve your farming knowledge</p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-terrabit-400" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
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
                      <SelectItem value="soil">Soil</SelectItem>
                      <SelectItem value="crops">Crops</SelectItem>
                      <SelectItem value="pests">Pests</SelectItem>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="climate">Climate</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="sustainability">Sustainability</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[140px] border-terrabit-700 bg-terrabit-800/50 text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="guide">Guides</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="event">Events</SelectItem>
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

              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-terrabit-900 border border-terrabit-800 mb-6">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    All Resources
                  </TabsTrigger>
                  <TabsTrigger
                    value="featured"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Featured
                  </TabsTrigger>
                  <TabsTrigger
                    value="recent"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Recent
                  </TabsTrigger>
                  <TabsTrigger
                    value="saved"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Saved
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="featured" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources
                      .filter((resource) => resource.featured)
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources
                      .sort((a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime())
                      .slice(0, 6)
                      .map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="saved" className="mt-0">
                  <div className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-16 w-16 text-terrabit-700 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No saved resources yet</h3>
                    <p className="text-terrabit-300 mb-6 text-center max-w-md">
                      Bookmark resources you find useful to access them quickly later
                    </p>
                    <Button
                      variant="outline"
                      className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                    >
                      Browse Resources
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

function ResourceCard({ resource }) {
  const [isSaved, setIsSaved] = useState(false)

  const getResourceIcon = (type) => {
    switch (type) {
      case "guide":
        return <FileText className="h-5 w-5 text-terrabit-400" />
      case "video":
        return <Video className="h-5 w-5 text-terrabit-400" />
      case "event":
        return <Calendar className="h-5 w-5 text-terrabit-400" />
      default:
        return <FileText className="h-5 w-5 text-terrabit-400" />
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card className="gradient-card shadow-card border-terrabit-800 overflow-hidden flex flex-col h-full">
      <div className="relative h-40 bg-terrabit-800/50">
        <Image src={resource.image || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-terrabit-900/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          {resource.tags.map((tag, index) => (
            <Badge key={index} className="bg-terrabit-600/80 hover:bg-terrabit-700">
              {tag}
            </Badge>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-white hover:bg-terrabit-800/50"
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark className={`h-5 w-5 ${isSaved ? "fill-terrabit-400 text-terrabit-400" : "text-terrabit-200"}`} />
        </Button>
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          {getResourceIcon(resource.type)}
          <Badge variant="outline" className="border-terrabit-700 text-terrabit-200 capitalize">
            {resource.type}
          </Badge>
          {resource.featured && <Badge className="ml-auto bg-terrabit-500 hover:bg-terrabit-600">Featured</Badge>}
        </div>
        <CardTitle className="text-lg text-white line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="text-terrabit-300 line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-4 text-sm text-terrabit-300 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(resource.datePublished)}</span>
          </div>
          {resource.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{resource.readTime}</span>
            </div>
          )}
          {resource.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{resource.duration}</span>
            </div>
          )}
          {resource.eventDate && (
            <div className="flex items-center gap-1 text-terrabit-400">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(resource.eventDate)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
        >
          {resource.downloadable ? (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </>
          )}
        </Button>
        <Button className="bg-terrabit-500 text-white hover:bg-terrabit-600">
          Learn More
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  )
}

