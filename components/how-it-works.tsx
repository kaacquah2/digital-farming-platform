import { CheckCircle2, Upload, LineChart, Leaf, Cloud } from "lucide-react"

const steps = [
  {
    title: "Upload Your Data",
    description: "Import your farm data, including crop information, soil samples, and weather records.",
    icon: Upload,
  },
  {
    title: "AI Analysis",
    description: "Our advanced AI analyzes your data to identify patterns and potential issues.",
    icon: LineChart,
  },
  {
    title: "Smart Recommendations",
    description: "Get personalized recommendations for crop management and disease prevention.",
    icon: Leaf,
  },
  {
    title: "Weather Integration",
    description: "Real-time weather forecasts and alerts to help you plan your farming activities.",
    icon: Cloud,
  },
]

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform makes it easy to analyze your farm data and get actionable insights.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-3 bg-green-100 rounded-full">
                <step.icon className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

