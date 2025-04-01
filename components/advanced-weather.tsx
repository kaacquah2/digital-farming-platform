"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getAdvancedWeatherPredictions, type WeatherPrediction } from "@/lib/ai-services"
import { Sun, Cloud, CloudRain, Wind, Droplets, AlertTriangle, Calendar, ChevronRight, ChevronLeft } from "lucide-react"

export default function AdvancedWeather() {
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherPrediction[]>([])
  const [selectedField, setSelectedField] = useState("north-field")
  const [forecastDays, setForecastDays] = useState(7)
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3

  useEffect(() => {
    loadWeatherData()
  }, [selectedField, forecastDays])

  const loadWeatherData = async () => {
    setIsLoading(true)
    try {
      // Use different coordinates for different fields
      let latitude = 41.8781
      let longitude = -87.6298

      if (selectedField === "south-valley") {
        latitude = 41.8681
        longitude = -87.6198
      } else if (selectedField === "east-ridge") {
        latitude = 41.8881
        longitude = -87.6198
      }

      const data = await getAdvancedWeatherPredictions(latitude, longitude, forecastDays)
      setWeatherData(data)
      setCurrentPage(0) // Reset to first page when data changes
    } catch (error) {
      console.error("Error loading weather data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getWeatherIcon = (conditions: string) => {
    switch (conditions.toLowerCase()) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-8 w-8 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const currentItems = weatherData.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)

  const totalPages = Math.ceil(weatherData.length / itemsPerPage)

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Advanced Weather Insights</CardTitle>
        <CardDescription>AI-enhanced weather forecasting tailored specifically for your fields</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="field-select">Select Field</Label>
            <Select value={selectedField} onValueChange={setSelectedField}>
              <SelectTrigger id="field-select">
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="north-field">North Field</SelectItem>
                <SelectItem value="south-valley">South Valley</SelectItem>
                <SelectItem value="east-ridge">East Ridge</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="forecast-days">Forecast Period</Label>
            <Select value={forecastDays.toString()} onValueChange={(value) => setForecastDays(Number.parseInt(value))}>
              <SelectTrigger id="forecast-days">
                <SelectValue placeholder="Select days" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 days</SelectItem>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="14">14 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
            <TabsTrigger value="agricultural">Agricultural Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : weatherData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No weather data available. Please try again.</div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  {currentItems.map((day, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-lg">
                              {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                            </CardTitle>
                            <CardDescription>
                              {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </CardDescription>
                          </div>
                          {getWeatherIcon(day.conditions)}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-500">Temperature</div>
                            <div className="font-medium">
                              {day.temperature.min}° - {day.temperature.max}°F
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Precipitation</div>
                            <div className="font-medium">{Math.round(day.precipitation.probability * 100)}% chance</div>
                            {day.precipitation.probability > 0.3 && (
                              <div className="text-sm text-gray-500">{day.precipitation.amount.toFixed(1)} mm</div>
                            )}
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <div className="text-sm text-gray-500">Humidity</div>
                              <div className="font-medium">{day.humidity}%</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Wind</div>
                              <div className="font-medium">{day.windSpeed} mph</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center mx-2 text-sm">
                      Page {currentPage + 1} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                      disabled={currentPage === totalPages - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="agricultural" className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : weatherData.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No weather data available. Please try again.</div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((day, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            <Calendar className="mr-2 h-5 w-5 text-gray-500" />
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </CardTitle>
                          <CardDescription>
                            {day.conditions}, {day.temperature.min}° - {day.temperature.max}°F
                          </CardDescription>
                        </div>
                        {getWeatherIcon(day.conditions)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <Droplets className="h-4 w-4 text-blue-500 mr-2" />
                              <span className="text-sm font-medium">Water Management</span>
                            </div>
                            <p className="text-sm">
                              {day.precipitation.probability > 0.5
                                ? `Natural rainfall expected (${day.precipitation.amount.toFixed(1)} mm). Reduce irrigation.`
                                : day.temperature.max > 85
                                  ? "High evaporation rate. Consider increasing irrigation."
                                  : "Standard irrigation protocol recommended."}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <Wind className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium">Field Operations</span>
                            </div>
                            <p className="text-sm">
                              {day.precipitation.probability > 0.3
                                ? "Spraying not recommended due to rain forecast."
                                : day.windSpeed > 10
                                  ? `Wind speed (${day.windSpeed} mph) may impact spraying operations.`
                                  : "Favorable conditions for field operations."}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center mb-1">
                              <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                              <span className="text-sm font-medium">Risk Factors</span>
                            </div>
                            <p className="text-sm">
                              {day.temperature.max > 90
                                ? "Heat stress risk. Monitor sensitive crops."
                                : day.precipitation.probability > 0.7 && day.precipitation.amount > 15
                                  ? "Flooding risk in low-lying areas."
                                  : day.humidity > 80 && day.temperature.max > 75
                                    ? "Disease favorable conditions. Monitor crops."
                                    : "No significant risk factors identified."}
                            </p>
                          </div>
                        </div>

                        {day.farmSpecificNotes && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-blue-800 mb-1">Field-Specific Recommendation</div>
                            <p className="text-sm text-blue-700">{day.farmSpecificNotes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {totalPages > 1 && (
                  <div className="flex justify-center space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center mx-2 text-sm">
                      Page {currentPage + 1} of {totalPages}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                      disabled={currentPage === totalPages - 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex justify-between">
        <p className="text-sm text-gray-500">
          Weather data is updated hourly and enhanced with AI for farm-specific insights.
        </p>
        <Button variant="outline" size="sm" onClick={loadWeatherData} disabled={isLoading}>
          Refresh Data
        </Button>
      </CardFooter>
    </Card>
  )
}

