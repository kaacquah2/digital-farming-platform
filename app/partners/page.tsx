"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowRight, CheckCircle, Users, Tractor, FileText, Layers, Globe, Handshake } from "lucide-react"

export default function PartnersPage() {
  const partnerCompanies = [
    { name: "AgriTech Solutions", logo: "/placeholder.svg?height=80&width=180", category: "Technology" },
    { name: "FarmEquip Inc.", logo: "/placeholder.svg?height=80&width=180", category: "Equipment" },
    { name: "GreenGrow Systems", logo: "/placeholder.svg?height=80&width=180", category: "Seed & Inputs" },
    { name: "DataHarvest", logo: "/placeholder.svg?height=80&width=180", category: "Data Analytics" },
    { name: "FarmInsure", logo: "/placeholder.svg?height=80&width=180", category: "Financial Services" },
    { name: "EcoFarm Initiative", logo: "/placeholder.svg?height=80&width=180", category: "Sustainability" },
    { name: "AgriDrone Systems", logo: "/placeholder.svg?height=80&width=180", category: "Technology" },
    { name: "Soil Health Labs", logo: "/placeholder.svg?height=80&width=180", category: "Research" },
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
                    Our Partners
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    We collaborate with leading agricultural, technology, and research organizations to deliver
                    comprehensive solutions to farmers worldwide.
                  </p>
                </div>
                <div>
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    Become a Partner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Trusted Partners
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We work with industry leaders to deliver the best solutions for our customers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 lg:grid-cols-4">
              {partnerCompanies.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative h-20 w-40 overflow-hidden mb-2">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{partner.name}</h3>
                  <p className="text-sm text-gray-500">{partner.category}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Programs */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Partnership Programs
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore how we can collaborate to revolutionize agriculture together.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Tractor className="h-6 w-6" />
                  </div>
                  <CardTitle>Equipment Integration</CardTitle>
                  <CardDescription>For agricultural equipment manufacturers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Integrate your equipment with our platform to enable seamless data collection and transfer,
                    enhancing the value of your products.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">API access for direct data integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Co-marketing opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Technical documentation and support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Layers className="h-6 w-6" />
                  </div>
                  <CardTitle>Input Providers</CardTitle>
                  <CardDescription>For seed, fertilizer, and pesticide companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Connect your products with our prescription engine to help farmers optimize input application based
                    on data-driven insights.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Product database integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Field trial data sharing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Customized recommendation engine</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <FileText className="h-6 w-6" />
                  </div>
                  <CardTitle>Research Partners</CardTitle>
                  <CardDescription>For universities and research institutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Collaborate on agricultural research projects to advance knowledge and develop new methodologies for
                    sustainable farming.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Access to anonymized data sets</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Joint research projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Publication opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Globe className="h-6 w-6" />
                  </div>
                  <CardTitle>Technology Partners</CardTitle>
                  <CardDescription>For software and data companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Integrate your technology with our platform to extend functionality and provide more comprehensive
                    solutions to farmers.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Full API access</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Technical integration support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Joint development opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <CardTitle>Reseller Program</CardTitle>
                  <CardDescription>For agricultural consultants and service providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Offer our platform to your clients while providing your expertise in implementation and training.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Competitive commission structure</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Sales and technical training</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Marketing materials and support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900 mb-2">
                    <Handshake className="h-6 w-6" />
                  </div>
                  <CardTitle>Custom Partnerships</CardTitle>
                  <CardDescription>Tailored to your organization's needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Don't see a program that fits your needs? We're open to discussing custom partnership arrangements.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Flexible engagement models</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Jointly defined objectives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">Dedicated partnership manager</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Partner Success Stories
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our partners about the benefits of working together.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="relative h-16 w-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=128"
                      alt="AgriTech Solutions Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "Partnering with TerraBit has allowed us to offer a more comprehensive solution to our customers.
                    The integration between our equipment and their data platform has been seamless."
                  </p>
                  <div>
                    <h4 className="font-semibold">Michael Johnson</h4>
                    <p className="text-sm text-gray-500">CTO, AgriTech Solutions</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="relative h-16 w-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=128"
                      alt="GreenGrow Systems Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "The partnership with TerraBit has been invaluable for our product development. The data insights
                    help us continuously improve our seed varieties for better performance."
                  </p>
                  <div>
                    <h4 className="font-semibold">Sarah Rodriguez</h4>
                    <p className="text-sm text-gray-500">Director of R&D, GreenGrow Systems</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm">
                <CardContent className="p-6">
                  <div className="relative h-16 w-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=64&width=128"
                      alt="DataHarvest Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "As a technology partner, we've found TerraBit's API and integration capabilities to be
                    best-in-class. Our joint customers are seeing tremendous value from our combined solutions."
                  </p>
                  <div>
                    <h4 className="font-semibold">Alex Chen</h4>
                    <p className="text-sm text-gray-500">CEO, DataHarvest</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Become a Partner</h2>
                <p className="max-w-[900px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our network of partners and help shape the future of agriculture
                </p>
              </div>
              <div>
                <Button className="bg-white text-green-900 hover:bg-green-100">
                  Apply for Partnership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

