import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Leaf, BarChart3, Shield, Zap, CheckCircle2, Users, Globe, Clock } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transform Your Farming with
                  <span className="text-primary"> Smart Technology</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join the digital farming revolution. Our AI-powered platform helps you optimize yields, reduce costs, and make data-driven decisions.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline">
                    Try Demo
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-12 w-12 text-primary" />
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-gray-500 dark:text-gray-400">Active Farmers</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Globe className="h-12 w-12 text-primary" />
                <div className="text-3xl font-bold">50+</div>
                <div className="text-gray-500 dark:text-gray-400">Countries</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Leaf className="h-12 w-12 text-primary" />
                <div className="text-3xl font-bold">30%</div>
                <div className="text-gray-500 dark:text-gray-400">Yield Increase</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <Clock className="h-12 w-12 text-primary" />
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-gray-500 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Everything you need to modernize your farming operations
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12 mt-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Crop Management</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  AI-powered insights for optimal planting, growth monitoring, and harvest timing.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Data Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Comprehensive data analysis and reporting for informed decision-making.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Disease Prevention</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Early detection and prevention of crop diseases using advanced AI models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">Why Choose Our Platform?</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Our platform is designed to help farmers of all sizes improve their operations and increase profitability.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Increase crop yields by up to 30%</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Reduce water and fertilizer usage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Early detection of crop diseases</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>Real-time monitoring and alerts</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="aspect-video w-full max-w-2xl rounded-lg bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to transform your farming?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of farmers who are already using our platform to improve their yields and reduce costs.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Try Demo
                    <Zap className="ml-2 h-4 w-4" />
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