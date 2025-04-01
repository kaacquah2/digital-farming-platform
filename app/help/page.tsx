"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  MessageSquare,
  HelpCircle,
  FileText,
  Send,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

// Sample FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I set up soil moisture sensors?",
    answer:
      "To set up soil moisture sensors, first identify the optimal locations in your field based on soil type variations. Install sensors at different depths (typically 6\", 12\", and 24\") to monitor the root zone. Connect the sensors to your TerraBit gateway device following the manufacturer's instructions, then activate them in your TerraBit dashboard under 'Devices > Add New > Soil Sensor'.",
  },
  {
    id: 2,
    question: "How often should I calibrate my equipment?",
    answer:
      "We recommend calibrating your equipment at the beginning of each growing season and after any major maintenance. For precision equipment like soil sensors and weather stations, quarterly calibration is ideal. The TerraBit system will send you automatic reminders when calibration is due based on your equipment type and usage patterns.",
  },
  {
    id: 3,
    question: "Can I import data from other farm management systems?",
    answer:
      "Yes, TerraBit supports data import from most major farm management systems. Go to 'Settings > Data Management > Import' and select your previous system. We support CSV, shapefile, and direct API connections with John Deere Operations Center, Climate FieldView, and other popular platforms.",
  },
  {
    id: 4,
    question: "How do I create a prescription map?",
    answer:
      "To create a prescription map, navigate to 'Prescriptions > Create New' in your dashboard. Select the field, choose the prescription type (seeding, fertilizer, or pesticide), and set your parameters. You can use our AI-powered recommendation engine or create custom zones manually. Once complete, export the file in a format compatible with your equipment.",
  },
  {
    id: 5,
    question: "What weather data sources does TerraBit use?",
    answer:
      "TerraBit integrates multiple weather data sources including NOAA, Weather Underground, and local weather stations if you have them installed. Our system combines these sources with 35 years of historical data to provide the most accurate forecasts and historical analysis for your specific location.",
  },
  {
    id: 6,
    question: "How can I share data with my agronomist?",
    answer:
      "You can share data with your agronomist by going to 'Settings > Team Management' and adding them as a team member with appropriate permissions. Alternatively, you can generate shareable reports under 'Reports > Generate > Share' which creates a secure link that can be sent via email.",
  },
]

// Sample support ticket statuses
const ticketStatuses = {
  open: "bg-blue-500",
  "in-progress": "bg-yellow-500",
  resolved: "bg-green-500",
  closed: "bg-gray-500",
}

// Sample support tickets
const supportTickets = [
  {
    id: "TKT-1234",
    subject: "Weather station not connecting",
    status: "in-progress",
    created: "2023-06-15T10:30:00",
    updated: "2023-06-16T14:22:00",
    messages: [
      {
        id: 1,
        sender: "user",
        name: "John Farmer",
        message:
          "My weather station stopped sending data to the dashboard yesterday. I've checked the power and it seems to be working fine on the device itself.",
        timestamp: "2023-06-15T10:30:00",
      },
      {
        id: 2,
        sender: "support",
        name: "Sarah Support",
        message:
          "Hi John, I'm sorry to hear about the connection issue. Could you please check if the gateway device is online? You can verify this by checking the status LED on the device.",
        timestamp: "2023-06-15T11:45:00",
      },
      {
        id: 3,
        sender: "user",
        name: "John Farmer",
        message:
          "I checked the gateway and the status LED is blinking red instead of solid green. Does this indicate a problem?",
        timestamp: "2023-06-16T09:15:00",
      },
      {
        id: 4,
        sender: "support",
        name: "Sarah Support",
        message:
          "Yes, a blinking red light indicates a connection issue. Please try power cycling the gateway by unplugging it, waiting 30 seconds, and plugging it back in. Let me know if that resolves the issue.",
        timestamp: "2023-06-16T14:22:00",
      },
    ],
  },
  {
    id: "TKT-1189",
    subject: "Error when creating prescription map",
    status: "resolved",
    created: "2023-06-10T15:45:00",
    updated: "2023-06-12T11:30:00",
    messages: [
      {
        id: 1,
        sender: "user",
        name: "John Farmer",
        message:
          "I'm trying to create a variable rate seeding prescription but keep getting an error message saying 'Invalid field boundaries'.",
        timestamp: "2023-06-10T15:45:00",
      },
      {
        id: 2,
        sender: "support",
        name: "Mike Support",
        message:
          "Hello John, this error typically occurs when there's an issue with the field boundary file. Could you tell me how you created or imported the field boundaries?",
        timestamp: "2023-06-11T09:20:00",
      },
      {
        id: 3,
        sender: "user",
        name: "John Farmer",
        message: "I imported them from a shapefile I got from my previous system.",
        timestamp: "2023-06-11T10:05:00",
      },
      {
        id: 4,
        sender: "support",
        name: "Mike Support",
        message:
          "I've checked your account and found that the shapefile has some topology errors. I've fixed these issues for you. Please try creating the prescription again and let me know if it works now.",
        timestamp: "2023-06-11T14:30:00",
      },
      {
        id: 5,
        sender: "user",
        name: "John Farmer",
        message: "That worked perfectly! Thank you for the quick fix.",
        timestamp: "2023-06-12T08:45:00",
      },
      {
        id: 6,
        sender: "support",
        name: "Mike Support",
        message:
          "You're welcome! I'm glad we could resolve this issue. If you need any further assistance, don't hesitate to reach out.",
        timestamp: "2023-06-12T11:30:00",
      },
    ],
  },
]

export default function HelpPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTicket, setActiveTicket] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleNewTicket = () => {
    // In a real app, this would open a form to create a new ticket
    alert("This would open a new ticket form in a real application")
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setIsSubmitting(true)

    // Simulate sending message
    setTimeout(() => {
      setNewMessage("")
      setIsSubmitting(false)

      // In a real app, this would add the message to the ticket and send to backend
      alert("Message sent: " + newMessage)
    }, 1000)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-terrabit-950">
        <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex flex-1">
          <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 md:ml-64 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Help & Support</h1>
                <p className="text-terrabit-300">
                  Find answers to common questions or get in touch with our support team
                </p>
              </div>

              <Tabs defaultValue="faq" className="w-full">
                <TabsList className="bg-terrabit-900 border border-terrabit-800 mb-6">
                  <TabsTrigger
                    value="faq"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    FAQ
                  </TabsTrigger>
                  <TabsTrigger
                    value="tickets"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Support Tickets
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                  >
                    Contact Us
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="faq" className="mt-0 space-y-6">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-terrabit-400" />
                    <Input
                      type="search"
                      placeholder="Search frequently asked questions..."
                      className="pl-9 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Card className="gradient-card shadow-card border-terrabit-800">
                    <CardHeader>
                      <CardTitle className="text-xl text-white">Frequently Asked Questions</CardTitle>
                      <CardDescription className="text-terrabit-300">
                        Find answers to common questions about TerraBit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFaqs.length > 0 ? (
                          filteredFaqs.map((faq) => (
                            <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border-terrabit-700">
                              <AccordionTrigger className="text-white hover:text-terrabit-200">
                                <div className="flex items-start gap-2 text-left">
                                  <HelpCircle className="h-5 w-5 text-terrabit-400 mt-0.5 flex-shrink-0" />
                                  <span>{faq.question}</span>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="text-terrabit-200 pl-7">{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8">
                            <FileText className="h-12 w-12 text-terrabit-700 mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">No matching FAQs found</h3>
                            <p className="text-terrabit-300 mb-4 text-center max-w-md">
                              Try adjusting your search terms or browse all FAQs
                            </p>
                            <Button
                              variant="outline"
                              className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                              onClick={() => setSearchQuery("")}
                            >
                              View All FAQs
                            </Button>
                          </div>
                        )}
                      </Accordion>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-terrabit-800 pt-6">
                      <p className="text-terrabit-300 text-center max-w-md">
                        Can't find what you're looking for?
                        <Button
                          variant="link"
                          className="text-terrabit-400 hover:text-terrabit-300 p-0 h-auto ml-1"
                          onClick={() => document.querySelector('[data-value="contact"]').click()}
                        >
                          Contact our support team
                        </Button>
                      </p>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="tickets" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium text-white">Your Tickets</h3>
                        <Button className="bg-terrabit-500 text-white hover:bg-terrabit-600" onClick={handleNewTicket}>
                          New Ticket
                        </Button>
                      </div>

                      <Card className="gradient-card shadow-card border-terrabit-800">
                        <CardContent className="p-0">
                          {supportTickets.length > 0 ? (
                            <div className="divide-y divide-terrabit-800">
                              {supportTickets.map((ticket) => (
                                <button
                                  key={ticket.id}
                                  className={`w-full text-left p-4 hover:bg-terrabit-800/50 transition-colors ${activeTicket?.id === ticket.id ? "bg-terrabit-800/70" : ""}`}
                                  onClick={() => setActiveTicket(ticket)}
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-medium text-white">{ticket.subject}</h4>
                                    <Badge className={`${ticketStatuses[ticket.status]} capitalize`}>
                                      {ticket.status.replace("-", " ")}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-terrabit-300">#{ticket.id}</span>
                                    <span className="text-terrabit-400">
                                      <Clock className="h-3 w-3 inline mr-1" />
                                      {new Date(ticket.updated).toLocaleDateString()}
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8">
                              <MessageSquare className="h-12 w-12 text-terrabit-700 mb-4" />
                              <h3 className="text-lg font-medium text-white mb-2">No support tickets</h3>
                              <p className="text-terrabit-300 mb-4 text-center max-w-md">
                                You haven't created any support tickets yet
                              </p>
                              <Button
                                className="bg-terrabit-500 text-white hover:bg-terrabit-600"
                                onClick={handleNewTicket}
                              >
                                Create Your First Ticket
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    <div className="lg:col-span-2">
                      {activeTicket ? (
                        <Card className="gradient-card shadow-card border-terrabit-800 h-full flex flex-col">
                          <CardHeader className="border-b border-terrabit-800">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-xl text-white">{activeTicket.subject}</CardTitle>
                                <CardDescription className="text-terrabit-300">
                                  Ticket #{activeTicket.id} • Created {formatDate(activeTicket.created)}
                                </CardDescription>
                              </div>
                              <Badge className={`${ticketStatuses[activeTicket.status]} capitalize`}>
                                {activeTicket.status.replace("-", " ")}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1 overflow-y-auto p-0">
                            <div className="flex flex-col p-4 space-y-4">
                              {activeTicket.messages.map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[80%] rounded-lg p-4 ${
                                      message.sender === "user"
                                        ? "bg-terrabit-600 text-white"
                                        : "bg-terrabit-800 text-terrabit-100"
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback
                                          className={`text-xs ${
                                            message.sender === "user"
                                              ? "bg-terrabit-500 text-white"
                                              : "bg-terrabit-700 text-terrabit-200"
                                          }`}
                                        >
                                          {message.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-sm font-medium">{message.name}</span>
                                      <span className="text-xs opacity-70 ml-auto">
                                        {new Date(message.timestamp).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        })}
                                      </span>
                                    </div>
                                    <p className="text-sm">{message.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="border-t border-terrabit-800 p-4">
                            {activeTicket.status === "resolved" || activeTicket.status === "closed" ? (
                              <div className="w-full flex items-center justify-center p-2 bg-terrabit-800/50 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                                <span className="text-terrabit-200">This ticket has been {activeTicket.status}</span>
                              </div>
                            ) : (
                              <div className="flex w-full gap-2">
                                <Textarea
                                  placeholder="Type your reply..."
                                  className="flex-1 min-h-[80px] border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400 resize-none"
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <Button
                                  className="bg-terrabit-500 text-white hover:bg-terrabit-600 self-end"
                                  onClick={handleSendMessage}
                                  disabled={!newMessage.trim() || isSubmitting}
                                >
                                  {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Send className="h-4 w-4 mr-2" />
                                      Send
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}
                          </CardFooter>
                        </Card>
                      ) : (
                        <Card className="gradient-card shadow-card border-terrabit-800 h-full flex flex-col items-center justify-center p-8">
                          <MessageSquare className="h-16 w-16 text-terrabit-700 mb-4" />
                          <h3 className="text-xl font-medium text-white mb-2">Select a ticket</h3>
                          <p className="text-terrabit-300 mb-6 text-center max-w-md">
                            Choose a support ticket from the list to view the conversation
                          </p>
                          <Button
                            className="bg-terrabit-500 text-white hover:bg-terrabit-600"
                            onClick={handleNewTicket}
                          >
                            Create New Ticket
                          </Button>
                        </Card>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-4">
                      <Card className="gradient-card shadow-card border-terrabit-800">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">Contact Information</CardTitle>
                          <CardDescription className="text-terrabit-300">
                            Ways to reach our support team
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-terrabit-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white mb-1">Phone Support</h4>
                              <p className="text-terrabit-200 mb-1">+1 (888) 123-4567</p>
                              <p className="text-sm text-terrabit-300">Available Monday-Friday, 8am-6pm EST</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Mail className="h-5 w-5 text-terrabit-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white mb-1">Email Support</h4>
                              <p className="text-terrabit-200 mb-1">support@terrabit.com</p>
                              <p className="text-sm text-terrabit-300">We typically respond within 24 hours</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MessageSquare className="h-5 w-5 text-terrabit-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white mb-1">Live Chat</h4>
                              <p className="text-terrabit-200 mb-1">Available in your dashboard</p>
                              <p className="text-sm text-terrabit-300">Chat with our support team in real-time</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="gradient-card shadow-card border-terrabit-800">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">Support Hours</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-terrabit-200">Monday - Friday</span>
                            <span className="text-white">8:00 AM - 6:00 PM EST</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-terrabit-200">Saturday</span>
                            <span className="text-white">9:00 AM - 2:00 PM EST</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-terrabit-200">Sunday</span>
                            <span className="text-white">Closed</span>
                          </div>
                          <div className="pt-3 border-t border-terrabit-800 mt-3">
                            <p className="text-sm text-terrabit-300">
                              Emergency support is available 24/7 for Premium and Enterprise customers
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="lg:col-span-2">
                      <Card className="gradient-card shadow-card border-terrabit-800">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">Contact Form</CardTitle>
                          <CardDescription className="text-terrabit-300">
                            Send us a message and we'll get back to you as soon as possible
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="name" className="text-terrabit-100">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  placeholder="Your name"
                                  className="border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="email" className="text-terrabit-100">
                                  Email
                                </Label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Your email address"
                                  className="border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="subject" className="text-terrabit-100">
                                Subject
                              </Label>
                              <Input
                                id="subject"
                                placeholder="What is your message about?"
                                className="border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="category" className="text-terrabit-100">
                                Category
                              </Label>
                              <Select>
                                <SelectTrigger className="border-terrabit-700 bg-terrabit-800/50 text-white">
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                                  <SelectItem value="technical">Technical Support</SelectItem>
                                  <SelectItem value="account">Account Issues</SelectItem>
                                  <SelectItem value="billing">Billing Questions</SelectItem>
                                  <SelectItem value="feature">Feature Request</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="message" className="text-terrabit-100">
                                Message
                              </Label>
                              <Textarea
                                id="message"
                                placeholder="Please describe your issue or question in detail"
                                className="min-h-[150px] border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="attachments" className="text-terrabit-100">
                                Attachments (optional)
                              </Label>
                              <Input
                                id="attachments"
                                type="file"
                                className="border-terrabit-700 bg-terrabit-800/50 text-white file:bg-terrabit-700 file:text-white file:border-0"
                              />
                              <p className="text-xs text-terrabit-400">
                                You can attach screenshots or files to help us understand your issue better (max 10MB)
                              </p>
                            </div>
                          </form>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button className="bg-terrabit-500 text-white hover:bg-terrabit-600">
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
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

