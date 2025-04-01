"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Mail, MessageSquare, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "How do I add a new crop to my farm?",
    answer: "To add a new crop, go to the Crops page and click the 'Add Crop' button. Fill in the required information including crop name, variety, planting date, and expected harvest date. You can also add notes and specify the crop's needs for water, sunlight, and temperature.",
  },
  {
    question: "How do I schedule farming tasks?",
    answer: "Navigate to the Calendar page and click 'Add Task'. You can specify the task type (planting, harvesting, maintenance, or other), set the date, and add a description. The calendar will show all your scheduled tasks for easy reference.",
  },
  {
    question: "How do I update my profile information?",
    answer: "Go to the Settings page to update your profile information. You can change your display name, upload a profile picture, and manage your account settings.",
  },
  {
    question: "How do I contact support?",
    answer: "You can contact support by filling out the contact form on this page or by sending an email to support@digitalfarming.com. Our team typically responds within 24 hours.",
  },
]

export default function HelpPage() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    toast.success("Message sent successfully! We'll get back to you soon.")
    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Help & Support</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white hover:text-terrabit-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-terrabit-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">Subject</Label>
                <Input
                  id="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-terrabit-600 hover:bg-terrabit-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Email Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-terrabit-400">
              <Mail className="h-4 w-4" />
              <span>support@digitalfarming.com</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-terrabit-400">
              <MessageSquare className="h-4 w-4" />
              <span>Available 24/7</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Documentation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-terrabit-400">
              <BookOpen className="h-4 w-4" />
              <span>User Guide</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 