"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getSustainabilityMetrics, type SustainabilityMetrics } from "@/lib/ai-services"
import { Leaf, Droplet, Bird, Sprout, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react"

export default function SustainabilityTracker() {
  const [isLoading, setIsLoading] = useState(false)
  const [metrics, setMetrics] = useState<SustainabilityMetrics | null>(null)
  const [selectedField, setSelectedField] = useState("north-field")

  useEffect(() => {
    loadSustainabilityData()
  }, [selectedField])

  const loadSustainabilityData = async () => {
    setIsLoading(true)
    try {
      const data = await getSustainabilityMetrics(selectedField)
      setMetrics(data)
    } catch (error) {
      console.error("Error loading sustainability data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600"
    if (score >= 60) return "bg-amber-600"
    return "bg-red-600"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Carbon & Sustainability Tracker</CardTitle>
        <CardDescription>
          Monitor your environmental impact and earn carbon credits with sustainable farming practices
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !metrics ? (
          <div className="text-center py-8 text-gray-500">No sustainability data available. Please try again.</div>
        ) : (
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Carbon Footprint</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{metrics.carbonFootprint}</div>
                      <div className="text-sm text-gray-500">kg CO₂e / acre</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Industry Average</span>
                        <span>1,200 kg CO₂e</span>
                      </div>
                      <Progress
                        value={(metrics.carbonFootprint / 1200) * 100}
                        className="h-2"
                        indicator={metrics.carbonFootprint < 1000 ? "bg-green-600" : "bg-amber-600"}
                      />

                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        {metrics.carbonFootprint < 1000 ? (
                          <>
                            <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                            <span className="text-green-600">
                              {Math.round((1 - metrics.carbonFootprint / 1200) * 100)}% below average
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-4 w-4 text-amber-600 mr-1" />
                            <span className="text-amber-600">
                              {Math.round((metrics.carbonFootprint / 1200 - 1) * 100)}% above average
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Carbon Credits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{metrics.carbonCredits}</div>
                      <div className="text-sm text-gray-500">credits earned</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Estimated Value</span>
                        <span>${(metrics.carbonCredits * 15).toFixed(2)} USD</span>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-sm">
                        <p>
                          Your sustainable farming practices have earned you carbon credits that can be sold on carbon
                          markets or used to offset your carbon footprint.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Droplet className="h-8 w-8 text-blue-500 mb-2" />
                      <div className="text-center">
                        <div className="text-sm font-medium">Water Usage</div>
                        <div className="text-2xl font-bold">{metrics.waterUsage}</div>
                        <div className="text-xs text-gray-500">liters/kg</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Leaf className="h-8 w-8 text-green-500 mb-2" />
                      <div className="text-center">
                        <div className="text-sm font-medium">Soil Health</div>
                        <div className="text-2xl font-bold">{metrics.soilHealthIndex}</div>
                        <div className="text-xs text-gray-500">out of 100</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Bird className="h-8 w-8 text-amber-500 mb-2" />
                      <div className="text-center">
                        <div className="text-sm font-medium">Biodiversity</div>
                        <div className="text-2xl font-bold">{metrics.biodiversityScore}</div>
                        <div className="text-xs text-gray-500">out of 100</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Sprout className="h-8 w-8 text-green-600 mb-2" />
                      <div className="text-center">
                        <div className="text-sm font-medium">Sustainability</div>
                        <div className="text-2xl font-bold">
                          {Math.round(
                            (metrics.soilHealthIndex +
                              metrics.biodiversityScore +
                              (100 - metrics.waterUsage / 20) +
                              (100 - metrics.carbonFootprint / 15)) /
                              4,
                          )}
                        </div>
                        <div className="text-xs text-gray-500">overall score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="mt-4 space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Carbon Emissions Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fertilizer Use</span>
                          <span>{Math.round(metrics.carbonFootprint * 0.35)} kg CO₂e</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fuel Consumption</span>
                          <span>{Math.round(metrics.carbonFootprint * 0.25)} kg CO₂e</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Soil Management</span>
                          <span>{Math.round(metrics.carbonFootprint * 0.2)} kg CO₂e</span>
                        </div>
                        <Progress value={20} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pesticide Use</span>
                          <span>{Math.round(metrics.carbonFootprint * 0.15)} kg CO₂e</span>
                        </div>
                        <Progress value={15} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Other Sources</span>
                          <span>{Math.round(metrics.carbonFootprint * 0.05)} kg CO₂e</span>
                        </div>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Water Usage Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-sm text-gray-500">Current Usage</div>
                            <div className="text-lg font-medium">{metrics.waterUsage} liters/kg</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Industry Average</div>
                            <div className="text-lg font-medium">1,000 liters/kg</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Efficiency Rating</span>
                            <span
                              className={
                                metrics.waterUsage < 900
                                  ? "text-green-600"
                                  : metrics.waterUsage < 1100
                                    ? "text-amber-600"
                                    : "text-red-600"
                              }
                            >
                              {metrics.waterUsage < 900
                                ? "Excellent"
                                : metrics.waterUsage < 1100
                                  ? "Average"
                                  : "Needs Improvement"}
                            </span>
                          </div>
                          <Progress
                            value={Math.max(0, 100 - (metrics.waterUsage - 500) / 10)}
                            className="h-2"
                            indicator={
                              metrics.waterUsage < 900
                                ? "bg-green-600"
                                : metrics.waterUsage < 1100
                                  ? "bg-amber-600"
                                  : "bg-red-600"
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Soil Health Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-medium">Overall Health Index</div>
                          <div className={`text-lg font-medium ${getScoreColor(metrics.soilHealthIndex)}`}>
                            {metrics.soilHealthIndex}/100
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Organic Matter</span>
                              <span>{Math.round(metrics.soilHealthIndex * 0.9)}/100</span>
                            </div>
                            <Progress
                              value={Math.round(metrics.soilHealthIndex * 0.9)}
                              className="h-2"
                              indicator={getProgressColor(Math.round(metrics.soilHealthIndex * 0.9))}
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Microbial Activity</span>
                              <span>{Math.round(metrics.soilHealthIndex * 1.1)}/100</span>
                            </div>
                            <Progress
                              value={Math.min(100, Math.round(metrics.soilHealthIndex * 1.1))}
                              className="h-2"
                              indicator={getProgressColor(Math.min(100, Math.round(metrics.soilHealthIndex * 1.1)))}
                            />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Soil Structure</span>
                              <span>{Math.round(metrics.soilHealthIndex * 0.95)}/100</span>
                            </div>
                            <Progress
                              value={Math.round(metrics.soilHealthIndex * 0.95)}
                              className="h-2"
                              indicator={getProgressColor(Math.round(metrics.soilHealthIndex * 0.95))}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations for Improvement</CardTitle>
                  <CardDescription>
                    Implement these practices to reduce your carbon footprint and earn more carbon credits
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.improvementSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm">{suggestion}</p>
                          {index === 0 && (
                            <div className="mt-2 text-xs text-green-700 bg-green-50 p-2 rounded">
                              <span className="font-medium">Potential Impact:</span> Reduce carbon footprint by up to
                              15% and earn 5-7 additional carbon credits annually.
                            </div>
                          )}
                          {index === 1 && (
                            <div className="mt-2 text-xs text-green-700 bg-green-50 p-2 rounded">
                              <span className="font-medium">Potential Impact:</span> Increase soil health index by 10-15
                              points and improve water retention.
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="border-t px-6 py-4 flex justify-between">
        <p className="text-sm text-gray-500">
          Data is updated monthly based on your farming practices and field conditions.
        </p>
        <Button variant="outline" size="sm" onClick={loadSustainabilityData} disabled={isLoading}>
          Refresh Data
        </Button>
      </CardFooter>
    </Card>
  )
}

