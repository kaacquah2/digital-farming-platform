import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Thermometer, CloudRain, Wind } from "lucide-react"

export default function ClimateWaterManagement() {
  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Climate & Water Management</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Optimize water usage and adapt to changing climate conditions
        </p>
      </div>

      <div className="mb-16">
        <Image
          src="/images/climate-water-management.png"
          alt="Climate and water management in agriculture"
          width={1200}
          height={400}
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <Thermometer className="h-8 w-8 text-orange-500 mb-2" />
            <CardTitle>Climate Monitoring</CardTitle>
            <CardDescription>Track temperature, humidity, and other climate variables</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Real-time weather station data</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Historical climate trends</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Seasonal forecasting</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Climate change projections</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Droplet className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>Water Management</CardTitle>
            <CardDescription>Optimize irrigation and water conservation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Soil moisture monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Precision irrigation scheduling</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Water use efficiency metrics</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Drought early warning</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CloudRain className="h-8 w-8 text-indigo-500 mb-2" />
            <CardTitle>Precipitation Analysis</CardTitle>
            <CardDescription>Monitor rainfall patterns and forecast precipitation</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Rainfall tracking and history</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Precipitation forecasts</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Flood risk assessment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Runoff and erosion modeling</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <Wind className="h-8 w-8 text-teal-500 mb-2" />
            <CardTitle>Climate Adaptation</CardTitle>
            <CardDescription>Strategies to adapt to changing climate conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Crop variety recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Planting date optimization</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Resilient farming practices</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-500">•</span>
                <span>Carbon sequestration options</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

