"use client"

import { Label } from "@/components/ui/label"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Calendar,
  Loader2,
} from "lucide-react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    // Search functionality would be implemented here
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  const faqItems = [
    {
      question: "How do I set up soil moisture sensors?",
      answer:
        "To set up soil moisture sensors, first identify the optimal locations in your field based on soil type variations. Install sensors at different depths (typically 6\", 12\", and 24\") to monitor the root zone. Connect the sensors to your TerraBit gateway device following the manufacturer's instructions, then activate them in your TerraBit dashboard under 'Devices > Add New > Soil Sensor'.",
    },
    {
      question: "How often should I calibrate my equipment?",
      answer:
        "We recommend calibrating your equipment at the beginning of each growing season and after any major maintenance. For precision equipment like soil sensors and weather stations, quarterly calibration is ideal. The TerraBit system will send you automatic reminders when calibration is due based on your equipment type and usage patterns.",
    },
    {
      question: "Can I import data from other farm management systems?",
      answer:
        "Yes, TerraBit supports data import from most major farm management systems. Go to 'Settings > Data Management > Import' and select your previous system. We support CSV, shapefile, and direct API connections with John Deere Operations Center, Climate FieldView, and other popular platforms.",
    },
    {
      question: "How do I create a prescription map?",
      answer:
        "To create a prescription map, navigate to 'Prescriptions > Create New' in your dashboard. Select the field, choose the prescription type (seeding, fertilizer, or pesticide), and set your parameters. You can use our AI-powered recommendation engine or create custom zones manually. Once complete, export the file in a format compatible with your equipment.",
    },
    {
      question: "What weather data sources does TerraBit use?",
      answer:
        "TerraBit integrates multiple weather data sources including NOAA, Weather Underground, and local weather stations if you have them installed. Our system combines these sources with 35 years of historical data to provide the most accurate forecasts and historical analysis for your specific location.",
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
                    Support Center
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Get help with TerraBit's agricultural data platform. Browse our support resources or contact our
                    team.
                  </p>
                </div>
                <form onSubmit={handleSearch} className="flex items-center max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search for help..."
                      className="pl-9 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="ml-2 bg-green-700 hover:bg-green-800 text-white">
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Support Options */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">How Can We Help?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-sm border-t-4 border-t-green-600">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-2 text-green-700">
                      <FileText className="h-5 w-5" />
                    </div>
                    <CardTitle>Browse Documentation</CardTitle>
                  </div>
                  <CardDescription>Access comprehensive guides and tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Find step-by-step guides, tutorials, and reference materials to help you get the most out of
                    TerraBit.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/documentation">
                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white">View Documentation</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-sm border-t-4 border-t-blue-600">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-700">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <CardTitle>Contact Support</CardTitle>
                  </div>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Need personalized assistance? Our support team is here to help with any questions or issues you
                    encounter.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="#contact-form">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Contact Us</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-sm border-t-4 border-t-purple-600">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-100 p-2 text-purple-700">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <CardTitle>Schedule a Demo</CardTitle>
                  </div>
                  <CardDescription>Get a personalized walkthrough</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Book a one-on-one session with our product specialists to get a personalized demonstration of
                    TerraBit's features.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href="/demo">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Schedule Demo</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Quick answers to common questions about TerraBit
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-white mb-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 rounded-t-lg text-left font-medium">
                      <div className="flex items-start gap-2">
                        <HelpCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                      <div className="pl-7">{item.answer}</div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="flex justify-center mt-8">
                <Link href="/documentation/faq">
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    View All FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-4 text-green-800">Contact Our Support Team</h2>
                <p className="text-gray-600 mb-6">
                  Can't find what you're looking for? Our dedicated support team is here to help. Fill out the form and
                  we'll get back to you as soon as possible.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone Support</h3>
                      <p className="text-gray-600">+1 (888) 123-4567</p>
                      <p className="text-sm text-gray-500">Monday-Friday, 8am-6pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-green-100 p-2 mr-3 text-green-700">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Support</h3>
                      <p className="text-gray-600">support@terrabit.com</p>
                      <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>

                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-6">
                    <h3 className="font-medium text-green-800 mb-2">Premium Support</h3>
                    <p className="text-gray-600 mb-4">
                      Professional and Enterprise plan customers receive priority support with faster response times and
                      dedicated support specialists.
                    </p>
                    <Link href="/pricing">
                      <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-100">
                        View Support Plans
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle>Submit a Support Request</CardTitle>
                    <CardDescription>Please provide details about your issue or question</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSuccess ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                        <h3 className="text-xl font-bold text-green-800 mb-2">Request Submitted!</h3>
                        <p className="text-gray-500">
                          Thank you for contacting us. We'll respond to your inquiry shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your email" required />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="Brief description of your issue" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Issue Category</Label>
                          <Tabs defaultValue="technical">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger
                                value="technical"
                                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                              >
                                Technical
                              </TabsTrigger>
                              <TabsTrigger
                                value="account"
                                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                              >
                                Account
                              </TabsTrigger>
                              <TabsTrigger
                                value="billing"
                                className="data-[state=active]:bg-green-700 data-[state=active]:text-white"
                              >
                                Billing
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="technical" className="space-y-4 mt-2">
                              <div className="space-y-2">
                                <Label htmlFor="technical-details">Technical Details</Label>
                                <Textarea
                                  id="technical-details"
                                  placeholder="Please describe your technical issue in detail"
                                  className="min-h-[120px]"
                                  required
                                />
                              </div>
                            </TabsContent>
                            <TabsContent value="account" className="space-y-4 mt-2">
                              <div className="space-y-2">
                                <Label htmlFor="account-details">Account Details</Label>
                                <Textarea
                                  id="account-details"
                                  placeholder="Please describe your account issue in detail"
                                  className="min-h-[120px]"
                                  required
                                />
                              </div>
                            </TabsContent>
                            <TabsContent value="billing" className="space-y-4 mt-2">
                              <div className="space-y-2">
                                <Label htmlFor="billing-details">Billing Details</Label>
                                <Textarea
                                  id="billing-details"
                                  placeholder="Please describe your billing issue in detail"
                                  className="min-h-[120px]"
                                  required
                                />
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </form>
                    )}
                  </CardContent>
                  {!isSuccess && (
                    <CardFooter>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    </CardFooter>
                  )}
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

