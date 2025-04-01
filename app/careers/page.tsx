"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowRight, MapPin, Clock } from "lucide-react"

export default function CareersPage() {
  const jobListings = [
    {
      id: 1,
      title: "Senior Agricultural Data Scientist",
      department: "Data Science",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "We're looking for a Senior Agricultural Data Scientist to develop machine learning models for crop yield prediction, disease detection, and resource optimization.",
      requirements: [
        "PhD or MS in Data Science, Agricultural Science, or related field",
        "5+ years of experience in machine learning and data analysis",
        "Experience with agricultural data and systems",
        "Proficiency in Python, R, and SQL",
        "Strong communication skills",
      ],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description:
        "Join our engineering team to build and maintain our agricultural data platform, working on both frontend and backend components.",
      requirements: [
        "BS in Computer Science or equivalent experience",
        "3+ years of full stack development experience",
        "Proficiency in React, Node.js, and relational databases",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Knowledge of agricultural systems is a plus",
      ],
    },
    {
      id: 3,
      title: "Agricultural Solutions Consultant",
      department: "Customer Success",
      location: "Chicago, IL",
      type: "Full-time",
      description:
        "Help our agricultural customers implement and maximize value from our platform, providing expert guidance on data-driven farming practices.",
      requirements: [
        "BS in Agriculture, Agronomy, or related field",
        "3+ years of experience in agricultural consulting or farm management",
        "Strong understanding of modern farming practices and precision agriculture",
        "Excellent customer service and communication skills",
        "Willingness to travel up to 30%",
      ],
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description:
        "Design intuitive and efficient user experiences for farmers and agricultural professionals using our platform.",
      requirements: [
        "Bachelor's degree in Design, HCI, or related field",
        "3+ years of experience in UX/UI design for complex applications",
        "Strong portfolio showcasing user-centered design process",
        "Proficiency with design tools (Figma, Sketch, etc.)",
        "Experience designing for mobile and responsive web applications",
      ],
    },
    {
      id: 5,
      title: "Machine Learning Engineer",
      department: "AI & ML",
      location: "San Francisco, CA",
      type: "Full-time",
      description:
        "Develop and deploy machine learning models for agricultural applications, including crop yield prediction, disease detection, and resource optimization.",
      requirements: [
        "MS or PhD in Computer Science, Machine Learning, or related field",
        "3+ years of experience building and deploying ML models in production",
        "Expertise in deep learning, computer vision, and time series analysis",
        "Proficiency in Python, TensorFlow, and PyTorch",
        "Experience with cloud-based ML infrastructure",
      ],
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
                    Join Our Mission
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Help us transform agriculture through data science and technology. Discover opportunities to make a
                    real impact on global food production and sustainability.
                  </p>
                </div>
                <div>
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    View Open Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Why Join TerraBit
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At TerraBit, we're committed to building a culture that supports innovation, growth, and work-life
                  balance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Meaningful Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Your work will directly contribute to improving agricultural productivity, sustainability, and food
                    security worldwide.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Innovation & Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    We're at the forefront of agricultural technology, offering endless opportunities to learn and
                    develop cutting-edge solutions.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Work-Life Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    We value flexibility and understand that a healthy balance between work and personal life leads to
                    better outcomes for everyone.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Competitive Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    We offer competitive salaries, comprehensive health benefits, retirement plans, and generous time
                    off.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Diverse & Inclusive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    We're committed to building a diverse team and fostering an inclusive environment where everyone can
                    thrive.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Remote-Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Many positions offer remote work options, allowing you to join our mission from anywhere in the
                    world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50" id="open-positions">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
                  Open Positions
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our team and help us transform agriculture through data science and technology.
                </p>
              </div>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {jobListings.map((job) => (
                <div key={job.id} className="bg-white shadow-sm rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-gray-500">{job.department}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        <Clock className="mr-1 h-3 w-3" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Button className="bg-green-700 hover:bg-green-800 text-white">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Don't See a Perfect Fit?
                </h2>
                <p className="max-w-[900px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We're always looking for talented individuals. Send us your resume and let us know how you can
                  contribute.
                </p>
              </div>
              <Button className="bg-white text-green-900 hover:bg-green-100">
                Send Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

