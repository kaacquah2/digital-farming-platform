"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowRight, Check, Code, FileText, Key, Lock, Database } from "lucide-react"

export default function APIPage() {
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
                    TerraBit API
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Integrate agricultural data analysis capabilities into your applications with our comprehensive API.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="#getting-started">
                    <Button className="bg-green-700 hover:bg-green-800 text-white">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/documentation/api">
                    <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                      API Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">API Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful tools for integrating agricultural data into your applications
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Database className="h-6 w-6" />
                  </div>
                  <CardTitle>Field Data Access</CardTitle>
                  <CardDescription>Access comprehensive field data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Retrieve field boundaries, soil samples, yield data, and more through simple API calls.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Field boundary retrieval</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Soil sample data</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Historical yield information</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <FileText className="h-6 w-6" />
                  </div>
                  <CardTitle>Prescription Generation</CardTitle>
                  <CardDescription>Create prescriptions programmatically</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Generate variable rate prescriptions for seeding, fertilizer, and pesticide applications.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Seeding rate calculations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Fertilizer recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Multiple export formats</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Lock className="h-6 w-6" />
                  </div>
                  <CardTitle>Secure Authentication</CardTitle>
                  <CardDescription>Robust security protocols</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Industry-standard authentication and authorization to keep your data secure.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">OAuth 2.0 authentication</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">API key management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Role-based access control</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section id="getting-started" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Getting Started</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Follow these steps to begin integrating with the TerraBit API
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center text-green-800 font-bold mb-4">
                    1
                  </div>
                  <CardTitle>Create an API Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Sign up for a TerraBit account and generate your API key from the developer settings page.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm text-pink-500">YOUR_API_KEY</code>
                      <Key className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500">Keep your API key secure and never share it publicly.</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/dashboard/settings/api-keys">
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white">Create API Key</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center text-green-800 font-bold mb-4">
                    2
                  </div>
                  <CardTitle>Make Your First Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Start with a simple API call to verify your connection.</p>
                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-xs text-gray-100">
                      <code>{`curl -X GET "https://api.terrabit.com/v1/fields" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
                    </pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/documentation/api/quickstart">
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white">View Examples</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="rounded-full bg-green-100 w-8 h-8 flex items-center justify-center text-green-800 font-bold mb-4">
                    3
                  </div>
                  <CardTitle>Explore the Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Browse our comprehensive API documentation for detailed endpoint information.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Code className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Endpoint reference</span>
                    </li>
                    <li className="flex items-start">
                      <Code className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Request/response examples</span>
                    </li>
                    <li className="flex items-start">
                      <Code className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">SDK documentation</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/documentation/api/reference">
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white">Read Documentation</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">API Reference</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our API endpoints and functionality
                </p>
              </div>
            </div>

            <Tabs defaultValue="fields" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="fields" className="data-[state=active]:bg-green-700 data-[state=active]:text-white">
                  Fields
                </TabsTrigger>
                <TabsTrigger value="data" className="data-[state=active]:bg-green-700 data-[state=active]:text-white">
                  Data
                </TabsTrigger>
                <TabsTrigger
                  value="prescriptions"
                  className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                >
                  Prescriptions
                </TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-green-700 data-[state=active]:text-white">
                  Users
                </TabsTrigger>
              </TabsList>

              <TabsContent value="fields" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Fields API</CardTitle>
                    <CardDescription>Manage field boundaries and related information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/fields</code>
                        </div>
                        <span className="text-sm text-gray-500">List all fields</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/fields/{"{field_id}"}</code>
                        </div>
                        <span className="text-sm text-gray-500">Get field details</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                          <code className="text-sm font-mono">/v1/fields</code>
                        </div>
                        <span className="text-sm text-gray-500">Create a field</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            PUT
                          </span>
                          <code className="text-sm font-mono">/v1/fields/{"{field_id}"}</code>
                        </div>
                        <span className="text-sm text-gray-500">Update a field</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">DELETE</span>
                          <code className="text-sm font-mono">/v1/fields/{"{field_id}"}</code>
                        </div>
                        <span className="text-sm text-gray-500">Delete a field</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Example Response</h4>
                      <pre className="text-xs text-gray-800 overflow-x-auto">
                        <code>{`{
  "id": "field_001",
  "name": "North Field",
  "acres": 125.7,
  "crop": "corn",
  "boundary": {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [
        [
          [-95.5487, 42.3127],
          [-95.5372, 42.3127],
          [-95.5372, 42.3042],
          [-95.5487, 42.3042],
          [-95.5487, 42.3127]
        ]
      ]
    }
  }
}`}</code>
                      </pre>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/documentation/api/fields">
                      <Button className="bg-green-700 hover:bg-green-800 text-white">
                        View Fields API Docs
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="data" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data API</CardTitle>
                    <CardDescription>Access soil samples, yield data, and other field information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/data/soil-samples</code>
                        </div>
                        <span className="text-sm text-gray-500">List soil samples</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/data/yields</code>
                        </div>
                        <span className="text-sm text-gray-500">List yield data</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                          <code className="text-sm font-mono">/v1/data/soil-samples</code>
                        </div>
                        <span className="text-sm text-gray-500">Create soil sample</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      Access and manage various types of agricultural data, including soil samples, yield data, and
                      more.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/documentation/api/data">
                      <Button className="bg-green-700 hover:bg-green-800 text-white">
                        View Data API Docs
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="prescriptions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Prescriptions API</CardTitle>
                    <CardDescription>Create and manage variable rate prescriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/prescriptions</code>
                        </div>
                        <span className="text-sm text-gray-500">List prescriptions</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                          <code className="text-sm font-mono">/v1/prescriptions</code>
                        </div>
                        <span className="text-sm text-gray-500">Create prescription</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/prescriptions/{"{id}"}/export</code>
                        </div>
                        <span className="text-sm text-gray-500">Export prescription</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      Generate, manage, and export variable rate prescriptions for seeding, fertilizer, and pesticide
                      applications.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/documentation/api/prescriptions">
                      <Button className="bg-green-700 hover:bg-green-800 text-white">
                        View Prescriptions API Docs
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Users API</CardTitle>
                    <CardDescription>Manage users and permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">GET</span>
                          <code className="text-sm font-mono">/v1/users</code>
                        </div>
                        <span className="text-sm text-gray-500">List users</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">POST</span>
                          <code className="text-sm font-mono">/v1/users</code>
                        </div>
                        <span className="text-sm text-gray-500">Create user</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            PUT
                          </span>
                          <code className="text-sm font-mono">/v1/users/{"{id}"}/permissions</code>
                        </div>
                        <span className="text-sm text-gray-500">Update permissions</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-4">
                      Manage users, roles, and permissions within your organization. Control access to data and
                      functionality.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/documentation/api/users">
                      <Button className="bg-green-700 hover:bg-green-800 text-white">
                        View Users API Docs
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Integrate?</h2>
                <p className="max-w-[900px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start building with our API today and unlock the power of agricultural data.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button className="bg-white text-green-900 hover:bg-green-100">Create Account</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-green-200 text-green-100 hover:bg-green-800">
                    Contact Sales
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

