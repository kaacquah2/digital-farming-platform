"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
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
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
          category: "",
        })
      }, 3000)
    }, 1500)
  }

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
                    Get in Touch
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    We're here to help with your agricultural data needs. Reach out to our team for support, inquiries,
                    or partnership opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">
                    Contact Information
                  </h2>
                  <p className="text-gray-500">
                    You can reach us through the following channels or use the contact form.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <MapPin className="mr-2 h-5 w-5 text-green-600" />
                        Our Headquarters
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">
                        123 Farm Street, Suite 456
                        <br />
                        San Francisco, CA 94105
                        <br />
                        United States
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <Phone className="mr-2 h-5 w-5 text-green-600" />
                        Phone Support
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">
                        +1 (888) 123-4567
                        <br />
                        Monday-Friday, 8am-6pm EST
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <Mail className="mr-2 h-5 w-5 text-green-600" />
                        Email Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">
                        General Inquiries:
                        <br />
                        info@terrabit.com
                        <br />
                        <br />
                        Support:
                        <br />
                        support@terrabit.com
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <Clock className="mr-2 h-5 w-5 text-green-600" />
                        Hours of Operation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">
                        Monday-Friday: 8am-6pm EST
                        <br />
                        Saturday: 9am-2pm EST
                        <br />
                        Sunday: Closed
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isSuccess ? (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                        <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                        <p className="text-gray-500">
                          Thank you for contacting us. We'll respond to your inquiry shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Your name"
                              required
                              value={formState.name}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Your email"
                              required
                              value={formState.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="category">Inquiry Type</Label>
                          <Select
                            value={formState.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="careers">Careers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="Subject of your message"
                            required
                            value={formState.subject}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Your message"
                            required
                            className="min-h-[150px]"
                            value={formState.message}
                            onChange={handleChange}
                          />
                        </div>
                      </form>
                    )}
                  </CardContent>
                  {!isSuccess && (
                    <CardFooter>
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-green-700 hover:bg-green-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-green-800">Find Us</h2>
                <p className="max-w-[900px] text-gray-500">
                  Visit our headquarters to learn more about our agricultural data solutions.
                </p>
              </div>
            </div>
            <div className="aspect-[16/9] w-full max-w-4xl mx-auto overflow-hidden rounded-xl bg-gray-200">
              {/* Placeholder for map */}
              <div className="h-full w-full flex items-center justify-center bg-gray-100">
                <MapPin className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Interactive Map Would Display Here</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

