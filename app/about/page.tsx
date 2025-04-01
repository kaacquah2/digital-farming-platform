"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { BarChart3, Cloud, Layers, Map, Tractor, Globe, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 bg-white/80 backdrop-blur-sm p-6 rounded-xl">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800">
                    About TerraBit
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Revolutionizing agriculture with comprehensive data analysis spanning 35 years, from 1990 to 2025.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Our Mission
                </h2>
                <p className="text-gray-500 md:text-xl">
                  At TerraBit, our mission is to empower farmers with data-driven insights that optimize agricultural
                  operations, increase yields, and promote sustainable farming practices.
                </p>
                <p className="text-gray-500 md:text-xl">
                  We believe that by combining historical agricultural data with cutting-edge technology, we can help
                  farmers make better decisions, reduce environmental impact, and ensure food security for future
                  generations.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-lg">
                  <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                  <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                  <div className="relative">
                    <Image
                      alt="Farming technology"
                      className="mx-auto rounded-lg shadow-xl"
                      height="400"
                      src="/placeholder.svg?height=400&width=500"
                      width="500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Our Story
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The journey from soil samples to comprehensive agricultural intelligence
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <div className="relative pl-8 pb-12 border-l-2 border-green-200">
                <div className="absolute left-[-10px] top-0 h-5 w-5 rounded-full bg-green-600"></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-800">1990 - The Beginning</h3>
                  <p className="text-gray-500">
                    TerraBit began as a small agricultural research project, collecting soil samples and crop yield data
                    from a handful of farms in the Midwest.
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-2 border-green-200">
                <div className="absolute left-[-10px] top-0 h-5 w-5 rounded-full bg-green-600"></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-800">2000 - Digital Transformation</h3>
                  <p className="text-gray-500">
                    As technology evolved, we digitized our growing database and began developing the first version of
                    our agricultural analytics platform.
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-2 border-green-200">
                <div className="absolute left-[-10px] top-0 h-5 w-5 rounded-full bg-green-600"></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-800">2010 - Cloud Integration</h3>
                  <p className="text-gray-500">
                    We moved our platform to the cloud, enabling real-time data collection from weather stations, soil
                    sensors, and farm equipment across the country.
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-12 border-l-2 border-green-200">
                <div className="absolute left-[-10px] top-0 h-5 w-5 rounded-full bg-green-600"></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-800">2020 - AI Revolution</h3>
                  <p className="text-gray-500">
                    Implementing artificial intelligence and machine learning algorithms, we transformed our vast
                    historical dataset into predictive models for crop performance, pest outbreaks, and weather
                    patterns.
                  </p>
                </div>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-[-10px] top-0 h-5 w-5 rounded-full bg-green-600"></div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-green-800">Today - Global Impact</h3>
                  <p className="text-gray-500">
                    TerraBit now serves farmers across six continents, with data spanning 35 years and covering millions
                    of acres, helping to optimize agricultural practices worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Platform Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Our Platform
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive agricultural intelligence at your fingertips
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Map className="h-6 w-6" />
                  </div>
                  <CardTitle>Field Mapping</CardTitle>
                  <CardDescription>
                    Detailed field mapping with satellite imagery and soil composition analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Create comprehensive field maps with boundaries, soil types, elevation data, and historical
                    performance metrics.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <CardTitle>Data Analysis</CardTitle>
                  <CardDescription>Advanced analytics for crop performance and field health</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Analyze historical and real-time data to identify trends, optimize inputs, and maximize yields.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Layers className="h-6 w-6" />
                  </div>
                  <CardTitle>Prescription Creation</CardTitle>
                  <CardDescription>Custom prescriptions for seeding, fertilizer, and pesticides</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Generate variable rate application maps based on soil variability, crop needs, and environmental
                    factors.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <CardTitle>Weather Integration</CardTitle>
                  <CardDescription>Historical weather data and forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Access 35 years of weather data and receive accurate forecasts to plan field operations and mitigate
                    risks.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Tractor className="h-6 w-6" />
                  </div>
                  <CardTitle>Equipment Integration</CardTitle>
                  <CardDescription>Seamless connection with farm machinery</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Connect with tractors, combines, and implements to collect and process data for planting, spraying,
                    and harvesting.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Globe className="h-6 w-6" />
                  </div>
                  <CardTitle>Global Database</CardTitle>
                  <CardDescription>Worldwide agricultural data from 1990 to 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    Access our comprehensive global database covering soil health, crop performance, and farming
                    practices across different regions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">Our Team</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the experts behind TerraBit
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image alt="Team member" className="object-cover" fill src="/placeholder.svg?height=160&width=160" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Dr. Sarah Johnson</h3>
                  <p className="text-sm text-gray-500">CEO & Agricultural Scientist</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image alt="Team member" className="object-cover" fill src="/placeholder.svg?height=160&width=160" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Michael Chen</h3>
                  <p className="text-sm text-gray-500">CTO & Data Scientist</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image alt="Team member" className="object-cover" fill src="/placeholder.svg?height=160&width=160" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold">Dr. Emily Rodriguez</h3>
                  <p className="text-sm text-gray-500">Head of Research</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Farming?
                </h2>
                <p className="max-w-[900px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of farmers who are optimizing their operations with TerraBit
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-green-900 hover:bg-green-100">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-green-800">
                    Try Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

