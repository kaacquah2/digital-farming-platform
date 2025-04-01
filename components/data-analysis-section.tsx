import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bug, Droplets, FileSpreadsheet, LineChart, Microscope } from "lucide-react"

export function DataAnalysisSection() {
  return (
    <section id="data-analysis" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-800">
              Comprehensive Data Analysis
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              35 years of agricultural data at your fingertips, from 1990 to 2025
            </p>
          </div>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Microscope className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Soil Sample Analysis</h3>
                  <p className="text-gray-500 mt-1">
                    Track soil health metrics including pH, organic matter, and nutrient levels over decades
                  </p>
                </div>
              </div>
              <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <LineChart className="h-12 w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Bug className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pest & Disease Tracking</h3>
                  <p className="text-gray-500 mt-1">
                    Historical data on pest outbreaks and disease patterns to predict future risks
                  </p>
                </div>
              </div>
              <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart className="h-12 w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Droplets className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Climate Impact Analysis</h3>
                  <p className="text-gray-500 mt-1">
                    Correlate weather patterns with crop performance from 1990 to present day
                  </p>
                </div>
              </div>
              <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <LineChart className="h-12 w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FileSpreadsheet className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Yield Trend Analysis</h3>
                  <p className="text-gray-500 mt-1">
                    Compare crop yields across decades to identify long-term trends and improvements
                  </p>
                </div>
              </div>
              <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart className="h-12 w-12 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <LineChart className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Predictive Agricultural Intelligence</h3>
                  <p className="text-gray-500 mt-1">
                    AI-powered forecasting using 35 years of historical data to predict future farming conditions
                  </p>
                </div>
              </div>
              <div className="mt-6 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="font-medium">Predictive modeling visualization</p>
                  <p className="text-sm mt-2">Based on data from 1990-2025</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

