"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Download, FileText, Layers, Map, Printer } from "lucide-react"
import { FieldHealthMap } from "@/components/charts/field-health-map"

// Mock field data
const fieldData = {
  "north-field": {
    name: "North Field",
    crop: "Corn",
    acres: 245,
    plantingDate: "Apr 15, 2023",
    yieldForecast: "195 bu/ac",
    soilType: "Silty Clay Loam",
    healthStatus: "Good",
    soilHealth: {
      ph: 6.8,
      organicMatter: "3.2%",
      nitrogen: "Medium",
      phosphorus: "High",
      potassium: "Medium",
    },
    history: [
      { year: 2022, crop: "Soybeans", yield: "62 bu/ac" },
      { year: 2021, crop: "Corn", yield: "188 bu/ac" },
      { year: 2020, crop: "Soybeans", yield: "58 bu/ac" },
    ],
  },
  "south-valley": {
    name: "South Valley",
    crop: "Soybeans",
    acres: 180,
    plantingDate: "May 5, 2023",
    yieldForecast: "58 bu/ac",
    soilType: "Sandy Loam",
    healthStatus: "Fair",
    soilHealth: {
      ph: 6.2,
      organicMatter: "2.1%",
      nitrogen: "Low",
      phosphorus: "Medium",
      potassium: "Low",
    },
    history: [
      { year: 2022, crop: "Corn", yield: "175 bu/ac" },
      { year: 2021, crop: "Wheat", yield: "68 bu/ac" },
      { year: 2020, crop: "Corn", yield: "168 bu/ac" },
    ],
  },
  "east-ridge": {
    name: "East Ridge",
    crop: "Wheat",
    acres: 320,
    plantingDate: "Oct 10, 2022",
    yieldForecast: "75 bu/ac",
    soilType: "Clay Loam",
    healthStatus: "Excellent",
    soilHealth: {
      ph: 7.1,
      organicMatter: "4.0%",
      nitrogen: "High",
      phosphorus: "High",
      potassium: "High",
    },
    history: [
      { year: 2022, crop: "Soybeans", yield: "60 bu/ac" },
      { year: 2021, crop: "Corn", yield: "192 bu/ac" },
      { year: 2020, crop: "Alfalfa", yield: "5.5 tons/ac" },
    ],
  },
}

export default function FieldDetailPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const fieldId = params.id

  // Get field data or redirect if not found
  const field = fieldData[fieldId]
  if (!field) {
    router.push("/fields")
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="flex flex-1">
        <DashboardSidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 md:ml-64">
          <div className="container p-4 md:p-6 lg:p-8">
            <div className="flex flex-col gap-4 md:gap-8">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push("/fields")}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{field.name}</h1>
                  <p className="text-muted-foreground">
                    {field.crop} - {field.acres} acres
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Layers className="mr-2 h-4 w-4" />
                    Create Prescription
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Planting Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{field.plantingDate}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Yield Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{field.yieldForecast}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Health Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div
                        className={`mr-2 h-3 w-3 rounded-full ${
                          field.healthStatus === "Excellent"
                            ? "bg-green-500"
                            : field.healthStatus === "Good"
                              ? "bg-green-400"
                              : field.healthStatus === "Fair"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                      ></div>
                      <span>{field.healthStatus}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
                  <TabsTrigger value="history">Field History</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Field Map</CardTitle>
                        <CardDescription>Satellite view with field boundaries</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] w-full bg-muted/30 rounded-lg flex items-center justify-center">
                          <Map className="h-16 w-16 text-muted" />
                          <span className="ml-2 text-muted">Field satellite view</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Field Health</CardTitle>
                        <CardDescription>Current vegetation health index</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <FieldHealthMap />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Field Details</CardTitle>
                        <CardDescription>Basic information about this field</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <dl className="grid grid-cols-2 gap-4">
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Field Name</dt>
                            <dd>{field.name}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Crop</dt>
                            <dd>{field.crop}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Size</dt>
                            <dd>{field.acres} acres</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Soil Type</dt>
                            <dd>{field.soilType}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Planting Date</dt>
                            <dd>{field.plantingDate}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-muted-foreground">Yield Forecast</dt>
                            <dd>{field.yieldForecast}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="soil" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Soil Health Analysis</CardTitle>
                      <CardDescription>Latest soil test results</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Soil Composition</h3>
                          <dl className="space-y-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Soil Type</dt>
                              <dd className="text-lg">{field.soilType}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">pH Level</dt>
                              <dd className="text-lg">{field.soilHealth.ph}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Organic Matter</dt>
                              <dd className="text-lg">{field.soilHealth.organicMatter}</dd>
                            </div>
                          </dl>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">Nutrient Levels</h3>
                          <dl className="space-y-4">
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Nitrogen (N)</dt>
                              <dd className="flex items-center">
                                <div
                                  className={`mr-2 h-3 w-3 rounded-full ${
                                    field.soilHealth.nitrogen === "High"
                                      ? "bg-green-500"
                                      : field.soilHealth.nitrogen === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                {field.soilHealth.nitrogen}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Phosphorus (P)</dt>
                              <dd className="flex items-center">
                                <div
                                  className={`mr-2 h-3 w-3 rounded-full ${
                                    field.soilHealth.phosphorus === "High"
                                      ? "bg-green-500"
                                      : field.soilHealth.phosphorus === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                {field.soilHealth.phosphorus}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-muted-foreground">Potassium (K)</dt>
                              <dd className="flex items-center">
                                <div
                                  className={`mr-2 h-3 w-3 rounded-full ${
                                    field.soilHealth.potassium === "High"
                                      ? "bg-green-500"
                                      : field.soilHealth.potassium === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                ></div>
                                {field.soilHealth.potassium}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Recommendations</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {field.soilHealth.nitrogen === "Low" && (
                            <li>Apply additional nitrogen fertilizer to improve crop growth.</li>
                          )}
                          {field.soilHealth.phosphorus === "Low" && (
                            <li>Increase phosphorus levels to promote root development.</li>
                          )}
                          {field.soilHealth.potassium === "Low" && (
                            <li>Add potassium to enhance crop quality and disease resistance.</li>
                          )}
                          {field.soilHealth.ph < 6.0 && (
                            <li>Apply lime to raise soil pH for better nutrient availability.</li>
                          )}
                          {field.soilHealth.ph > 7.5 && <li>Consider adding sulfur to lower soil pH.</li>}
                          {field.soilHealth.organicMatter < "3.0%" && (
                            <li>Incorporate cover crops or organic matter to improve soil structure.</li>
                          )}
                          {field.soilHealth.nitrogen !== "Low" &&
                            field.soilHealth.phosphorus !== "Low" &&
                            field.soilHealth.potassium !== "Low" &&
                            field.soilHealth.ph >= 6.0 &&
                            field.soilHealth.ph <= 7.5 &&
                            field.soilHealth.organicMatter >= "3.0%" && (
                              <li>Soil conditions are optimal. Maintain current management practices.</li>
                            )}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Field History</CardTitle>
                      <CardDescription>Previous crops and yields</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Year</th>
                              <th className="text-left py-3 px-4">Crop</th>
                              <th className="text-left py-3 px-4">Yield</th>
                              <th className="text-left py-3 px-4">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {field.history.map((record, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-3 px-4">{record.year}</td>
                                <td className="py-3 px-4">{record.crop}</td>
                                <td className="py-3 px-4">{record.yield}</td>
                                <td className="py-3 px-4">{record.notes || "No additional notes"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="prescriptions" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Field Prescriptions</h3>
                    <Link href="/prescriptions/create">
                      <Button>
                        <Layers className="mr-2 h-4 w-4" />
                        Create Prescription
                      </Button>
                    </Link>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Active Prescriptions</CardTitle>
                      <CardDescription>Current and upcoming prescriptions for this field</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4">Name</th>
                              <th className="text-left py-3 px-4">Type</th>
                              <th className="text-left py-3 px-4">Created</th>
                              <th className="text-left py-3 px-4">Status</th>
                              <th className="text-left py-3 px-4">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 px-4">{field.name} Seeding Plan</td>
                              <td className="py-3 px-4">Seeding</td>
                              <td className="py-3 px-4">Apr 1, 2023</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  Active
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4">{field.name} Fertilizer Plan</td>
                              <td className="py-3 px-4">Fertilizer</td>
                              <td className="py-3 px-4">May 10, 2023</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                                  Pending
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  Download
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

