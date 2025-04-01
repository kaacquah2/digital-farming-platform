"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowRight, Calendar, User, Tag, Clock, Search, ChevronLeft, ChevronRight } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Precision Agriculture: 1990 to 2025",
      excerpt:
        "Explore how agricultural technology has transformed over 35 years, from basic GPS systems to AI-powered predictive analytics and autonomous machinery.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 15, 2025",
      author: "Dr. Sarah Johnson",
      category: "Technology",
      readTime: "8 min read",
      featured: true,
    },
    {
      id: 2,
      title: "Understanding Soil Health: Key Indicators and Improvement Strategies",
      excerpt:
        "Learn about the essential metrics for evaluating soil health and practical approaches to enhance soil quality for sustainable crop production.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 10, 2025",
      author: "Michael Rodriguez",
      category: "Soil Science",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 3,
      title: "Climate-Smart Farming: Adapting to Changing Weather Patterns",
      excerpt:
        "Discover strategies to make your farm more resilient to climate change, including drought-resistant crops, water conservation techniques, and risk management approaches.",
      image: "/placeholder.svg?height=400&width=600",
      date: "March 5, 2025",
      author: "Emily Chen",
      category: "Climate Change",
      readTime: "10 min read",
      featured: false,
    },
    {
      id: 4,
      title: "Data-Driven Decisions: Turning Farm Information into Actionable Insights",
      excerpt:
        "How to leverage your farm's data to make better operational decisions, from planting strategies to resource allocation and marketing timing.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 28, 2025",
      author: "John Miller",
      category: "Data Analytics",
      readTime: "7 min read",
      featured: false,
    },
    {
      id: 5,
      title: "The Rise of Autonomous Farming Equipment",
      excerpt:
        "An in-depth look at the current state of autonomous tractors, drones, and harvesting equipment, and what's on the horizon for farm automation.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 20, 2025",
      author: "Alex Thompson",
      category: "Equipment",
      readTime: "9 min read",
      featured: false,
    },
    {
      id: 6,
      title: "Integrated Pest Management: Biology-Based Approaches to Crop Protection",
      excerpt:
        "Explore sustainable pest control strategies that rely on ecosystem understanding rather than chemical interventions.",
      image: "/placeholder.svg?height=400&width=600",
      date: "February 15, 2025",
      author: "Sophia Williams",
      category: "Pest Management",
      readTime: "8 min read",
      featured: false,
    },
  ]

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
                    TerraBit Blog
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Insights, research, and practical advice on agricultural data science, sustainable farming, and the
                    future of food production.
                  </p>
                </div>
                <div className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      className="pl-9 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <Button className="ml-2 bg-green-700 hover:bg-green-800 text-white">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Featured Article</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={blogPosts[0].image || "/placeholder.svg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {blogPosts[0].category}
                  </span>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {blogPosts[0].date}
                  </div>
                </div>
                <h3 className="text-2xl font-bold tracking-tight md:text-3xl mb-2">{blogPosts[0].title}</h3>
                <p className="text-gray-500 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-sm text-gray-600">{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Link href={`/blog/${blogPosts[0].id}`}>
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Recent Articles</h2>
                <p className="max-w-[900px] text-gray-500">
                  Stay up-to-date with the latest research, insights, and practical advice
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden bg-white shadow-sm">
                  <div className="relative aspect-video">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {post.category}
                      </span>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 line-clamp-3 text-sm">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </CardFooter>
                  <div className="px-6 pb-6">
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" className="w-full border-green-700 text-green-700 hover:bg-green-50">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-green-700 text-white border-green-700 hover:bg-green-800"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  4
                </Button>
                <Button variant="outline" size="sm">
                  5
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Browse by Category</h2>
                <p className="max-w-[900px] text-gray-500">Find articles on specific agricultural topics</p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <Link href="/blog/category/technology">
                <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow hover:border-green-200">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900 group-hover:bg-green-700 group-hover:text-white transition-colors">
                    <Tag className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">Technology</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Agricultural tech, precision farming, and digital innovation
                  </p>
                  <div className="mt-4 text-sm font-medium text-green-700 group-hover:underline">View Articles</div>
                </div>
              </Link>

              <Link href="/blog/category/soil-science">
                <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow hover:border-green-200">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900 group-hover:bg-green-700 group-hover:text-white transition-colors">
                    <Tag className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">Soil Science</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Soil health, fertility management, and conservation practices
                  </p>
                  <div className="mt-4 text-sm font-medium text-green-700 group-hover:underline">View Articles</div>
                </div>
              </Link>

              <Link href="/blog/category/climate-change">
                <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow hover:border-green-200">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900 group-hover:bg-green-700 group-hover:text-white transition-colors">
                    <Tag className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">Climate Change</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Adaptation strategies, resilient farming, and carbon sequestration
                  </p>
                  <div className="mt-4 text-sm font-medium text-green-700 group-hover:underline">View Articles</div>
                </div>
              </Link>

              <Link href="/blog/category/data-analytics">
                <div className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow hover:border-green-200">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-900 group-hover:bg-green-700 group-hover:text-white transition-colors">
                    <Tag className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">Data Analytics</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Farm data management, analysis techniques, and decision support
                  </p>
                  <div className="mt-4 text-sm font-medium text-green-700 group-hover:underline">View Articles</div>
                </div>
              </Link>
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/blog/categories">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  View All Categories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Stay Informed</h2>
                <p className="max-w-[900px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter to receive the latest articles, research findings, and agricultural
                  insights.
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <form className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="border-green-700 bg-green-800/50 text-white placeholder:text-green-300"
                    required
                  />
                  <Button className="bg-white text-green-900 hover:bg-green-100">Subscribe</Button>
                </form>
                <p className="text-xs text-green-300">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

