import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tractor, Map, Cpu, BarChart3 } from "lucide-react"

export default function PrecisionAgriculture() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Precision Agriculture</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Optimize your farming operations with data-driven precision technology
        </p>
      </div>

      <div className="mb-16">
        <Image
          src="/images/precision-agriculture.png"
          alt="Tractor applying treatments with precision agriculture technology"
          width={1200}
          height={500}
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <Map className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Field Mapping</CardTitle>
            <CardDescription>Create detailed maps of your fields</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>High-resolution satellite imagery</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Drone mapping services</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Topography and elevation data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Field boundary management</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Tractor className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Variable Rate Application</CardTitle>
            <CardDescription>Apply inputs precisely where needed</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Prescription map generation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Variable rate seeding</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Targeted fertilizer application</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Spot spraying for pest control</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Cpu className="h-8 w-8 text-purple-500 mb-2" />
            <CardTitle>Smart Equipment Integration</CardTitle>
            <CardDescription>Connect your machinery to our platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Equipment performance monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Automatic data collection</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Remote diagnostics</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Maintenance scheduling</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <BarChart3 className="h-8 w-8 text-orange-500 mb-2" />
            <CardTitle>ROI Analysis</CardTitle>
            <CardDescription>Measure the impact of precision agriculture</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Input cost reduction tracking</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Yield improvement analysis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Environmental impact assessment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Long-term profitability projections</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

