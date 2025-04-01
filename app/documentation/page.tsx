"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import {
  Search,
  FileText,
  Layers,
  Map,
  BarChart3,
  Code,
  Server,
  Database,
  ChevronRight,
  CreditCard,
  Calendar,
  Bug,
  ExternalLink,
  Clock,
} from "lucide-react"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const documentCategories = [
    {
      title: "Getting Started",
      icon: <FileText className="h-5 w-5" />,
      articles: [
        { title: "Introduction to TerraBit", link: "/documentation/introduction" },
        { title: "Platform Overview", link: "/documentation/platform-overview" },
        { title: "Creating Your Account", link: "/documentation/creating-account" },
        { title: "Setting Up Your Farm", link: "/documentation/setting-up-farm" },
        { title: "Understanding the Dashboard", link: "/documentation/dashboard" },
      ],
    },
    {
      title: "Field Management",
      icon: <Map className="h-5 w-5" />,
      articles: [
        { title: "Creating Field Boundaries", link: "/documentation/creating-boundaries" },
        { title: "Importing Field Data", link: "/documentation/importing-field-data" },
        { title: "Field Analysis Tools", link: "/documentation/field-analysis" },
        { title: "Satellite Imagery Integration", link: "/documentation/satellite-imagery" },
        { title: "Exporting Field Maps", link: "/documentation/exporting-maps" },
      ],
    },
    {
      title: "Data Analysis",
      icon: <BarChart3 className="h-5 w-5" />,
      articles: [
        { title: "Soil Sample Analysis", link: "/documentation/soil-analysis" },
        { title: "Yield Data Interpretation", link: "/documentation/yield-analysis" },
        { title: "Weather Data Integration", link: "/documentation/weather-data" },
        { title: "Historical Trend Analysis", link: "/documentation/historical-trends" },
        { title: "Custom Reports", link: "/documentation/custom-reports" },
      ],
    },
    {
      title: "Prescription Creation",
      icon: <Layers className="h-5 w-5" />,
      articles: [
        { title: "Creating Seeding Prescriptions", link: "/documentation/seeding-prescriptions" },
        { title: "Fertilizer Application Maps", link: "/documentation/fertilizer-maps" },
        { title: "Variable Rate Technology", link: "/documentation/variable-rate" },
        { title: "Exporting to Equipment", link: "/documentation/equipment-export" },
        { title: "Prescription Templates", link: "/documentation/prescription-templates" },
      ],
    },
    {
      title: "API Reference",
      icon: <Code className="h-5 w-5" />,
      articles: [
        { title: "API Overview", link: "/documentation/api-overview" },
        { title: "Authentication", link: "/documentation/api-authentication" },
        { title: "Field Endpoints", link: "/documentation/api-fields" },
        { title: "Data Endpoints", link: "/documentation/api-data" },
        { title: "Webhook Integration", link: "/documentation/api-webhooks" },
      ],
    },
    {
      title: "Advanced Features",
      icon: <Server className="h-5 w-5" />,
      articles: [
        { title: "AI Recommendations", link: "/documentation/ai-recommendations" },
        { title: "Machine Learning Models", link: "/documentation/ml-models" },
        { title: "Custom Data Integration", link: "/documentation/custom-integration" },
        { title: "Team Collaboration", link: "/documentation/team-collaboration" },
        { title: "Enterprise Features", link: "/documentation/enterprise-features" },
      ],
    },
  ]

  // Filter categories and articles based on search query
  const filteredCategories = documentCategories
    .map((category) => {
      const filteredArticles = category.articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      return {
        ...category,
        filteredArticles,
      }
    })
    .filter((category) => category.filteredArticles.length > 0)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50/50 to-white">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800">
                    Documentation
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Comprehensive guides and resources to help you get the most out of TerraBit's agricultural data
                    platform.
                  </p>
                </div>
                <div className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search documentation..."
                      className="pl-9 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="ml-2 bg-green-700 hover:bg-green-800 text-white">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Guides */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Popular Guides</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <FileText className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="font-medium">Getting Started Guide</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Everything you need to know to set up your account and start using TerraBit.
                  </p>
                  <Link href="/documentation/getting-started">
                    <Button variant="link" className="p-0 h-auto text-green-700 hover:text-green-800">
                      Read Guide
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <Map className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="font-medium">Field Mapping Tutorial</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Learn how to create and manage field boundaries for precise data analysis.
                  </p>
                  <Link href="/documentation/field-mapping">
                    <Button variant="link" className="p-0 h-auto text-green-700 hover:text-green-800">
                      Read Guide
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <Database className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="font-medium">Data Import/Export</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Step-by-step instructions for importing and exporting agricultural data.
                  </p>
                  <Link href="/documentation/data-import-export">
                    <Button variant="link" className="p-0 h-auto text-green-700 hover:text-green-800">
                      Read Guide
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-green-100 p-2 mr-3">
                      <Code className="h-5 w-5 text-green-700" />
                    </div>
                    <h3 className="font-medium">API Documentation</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Comprehensive reference for integrating with TerraBit's API endpoints.
                  </p>
                  <Link href="/documentation/api">
                    <Button variant="link" className="p-0 h-auto text-green-700 hover:text-green-800">
                      Read Guide
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Documentation Categories
                </h2>
                <p className="max-w-[900px] text-gray-500">
                  Browse our comprehensive documentation library by category
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">{category.icon}</div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {category.filteredArticles.map((article, articleIndex) => (
                        <li key={articleIndex}>
                          <Link href={article.link} className="flex items-center text-gray-700 hover:text-green-700">
                            <FileText className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{article.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link href={`/documentation/category/${category.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        <Button variant="link" className="p-0 h-auto text-green-700 hover:text-green-800">
                          View all {category.title} docs
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
                  <p className="text-gray-500 mb-4">We couldn't find any documentation matching your search query.</p>
                  <Button onClick={() => setSearchQuery("")} className="bg-green-700 hover:bg-green-800 text-white">
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Video Tutorials</h2>
                <p className="max-w-[900px] text-gray-500">Visual guides to help you master TerraBit's features</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">Getting Started with TerraBit</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    A complete walkthrough of setting up your account and navigating the platform.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>15:24</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-700 text-green-700 hover:bg-green-50">
                      Watch Video
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">Creating Prescription Maps</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Learn how to create variable rate prescription maps for different field operations.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>12:08</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-700 text-green-700 hover:bg-green-50">
                      Watch Video
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm overflow-hidden">
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <FileText className="h-12 w-12 text-gray-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">Analyzing Soil Sample Data</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    Step-by-step guide to importing, visualizing, and interpreting soil sample data.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>18:32</span>
                    </div>
                    <Button variant="outline" size="sm" className="border-green-700 text-green-700 hover:bg-green-50">
                      Watch Video
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/documentation/videos">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  View All Videos
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-gray-500">Quick answers to common questions about TerraBit</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">How do I import my field boundaries?</h3>
                  <p className="text-gray-600">
                    You can import field boundaries by navigating to Fields &gt; Import and uploading a shapefile, KML,
                    or GeoJSON file. You can also draw boundaries manually using our mapping tools.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">What file formats are supported for soil sample data?</h3>
                  <p className="text-gray-600">
                    TerraBit supports CSV, Excel (XLSX), and JSON formats for soil sample data imports. We also offer
                    direct integration with major soil testing labs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">How can I share data with my agronomist?</h3>
                  <p className="text-gray-600">
                    Go to Settings > Team and add your agronomist as a team member with appropriate permissions.
                    Alternatively, you can generate shareable reports under Reports > Generate > Share.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Is my data secure?</h3>
                  <p className="text-gray-600">
                    Yes, TerraBit employs industry-standard security measures, including encryption, secure data
                    centers, and regular security audits. You maintain full ownership of your data at all times.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">How do I export prescription maps to my equipment?</h3>
                  <p className="text-gray-600">
                    TerraBit supports direct export to major equipment brands. Go to Prescriptions > [Your Prescription]
                    > Export and select your equipment type. You can also download standard formats like shapefile or
                    ISO-XML.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Link href="/documentation/faq">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  View All FAQs
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Need Additional Help?
                </h2>
                <p className="text-gray-600">
                  Can't find what you're looking for in our documentation? Our support team is here to help you get the
                  most out of TerraBit.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link href="/contact">
                    <Button className="bg-green-700 hover:bg-green-800 text-white">Contact Support</Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                      Browse Help Center
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 grid grid-cols-2 gap-4">
                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Schedule a Demo</h3>
                      <p className="text-sm text-gray-500">Get a personalized walkthrough</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">
                      <Bug className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Report an Issue</h3>
                      <p className="text-sm text-gray-500">Submit a bug report</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Billing Support</h3>
                      <p className="text-sm text-gray-500">Get help with payments</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-sm">
                  <CardContent className="p-4 flex items-center">
                    <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Community Forum</h3>
                      <p className="text-sm text-gray-500">Connect with other users</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

