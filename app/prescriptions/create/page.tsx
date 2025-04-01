"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"

export default function CreatePrescriptionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [prescriptionType, setPrescriptionType] = useState("seeding")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    router.push("/prescriptions")
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
                <Button variant="outline" size="icon" onClick={() => router.push("/prescriptions")}>
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Create Prescription</h1>
                  <p className="text-muted-foreground">Create a new prescription for your fields</p>
                </div>
              </div>

              <Tabs defaultValue="seeding" onValueChange={setPrescriptionType}>
                <TabsList className="mb-4">
                  <TabsTrigger value="seeding">Seeding</TabsTrigger>
                  <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
                  <TabsTrigger value="pesticide">Pesticide</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Enter the basic details for your prescription</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Prescription Name</Label>
                          <Input id="name" placeholder="Enter a name for this prescription" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="field">Field</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="north">North Field</SelectItem>
                              <SelectItem value="south">South Valley</SelectItem>
                              <SelectItem value="east">East Ridge</SelectItem>
                              <SelectItem value="west">West Plains</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date">Application Date</Label>
                          <Input id="date" type="date" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="notes">Notes</Label>
                          <Textarea id="notes" placeholder="Add any additional notes or instructions" />
                        </div>
                      </CardContent>
                    </Card>

                    <TabsContent value="seeding" className="mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Seeding Parameters</CardTitle>
                          <CardDescription>Configure your seeding prescription</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="seed-type">Seed Type</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select seed type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="corn-p1234">Corn - Pioneer P1234</SelectItem>
                                <SelectItem value="corn-d5678">Corn - Dekalb D5678</SelectItem>
                                <SelectItem value="soy-a1234">Soybeans - Asgrow A1234</SelectItem>
                                <SelectItem value="wheat-w5678">Wheat - W5678</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Base Seeding Rate (seeds/acre)</Label>
                            <div className="flex items-center gap-4">
                              <Slider defaultValue={[32000]} max={40000} min={20000} step={1000} />
                              <span className="w-12 text-center">32k</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Variable Rate</Label>
                            <div className="flex items-center gap-2">
                              <Switch id="variable-rate" />
                              <Label htmlFor="variable-rate">Enable variable rate seeding</Label>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Planting Depth (inches)</Label>
                            <div className="flex items-center gap-4">
                              <Slider defaultValue={[1.5]} max={3} min={0.5} step={0.25} />
                              <span className="w-12 text-center">1.5"</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="fertilizer" className="mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Fertilizer Parameters</CardTitle>
                          <CardDescription>Configure your fertilizer prescription</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="fertilizer-type">Fertilizer Type</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select fertilizer type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="nitrogen">Nitrogen (N)</SelectItem>
                                <SelectItem value="phosphorus">Phosphorus (P)</SelectItem>
                                <SelectItem value="potassium">Potassium (K)</SelectItem>
                                <SelectItem value="npk">NPK Blend</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Application Rate (lbs/acre)</Label>
                            <div className="flex items-center gap-4">
                              <Slider defaultValue={[180]} max={300} min={50} step={10} />
                              <span className="w-12 text-center">180</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Variable Rate</Label>
                            <div className="flex items-center gap-2">
                              <Switch id="variable-rate-fert" />
                              <Label htmlFor="variable-rate-fert">Enable variable rate application</Label>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="application-method">Application Method</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="broadcast">Broadcast</SelectItem>
                                <SelectItem value="banded">Banded</SelectItem>
                                <SelectItem value="foliar">Foliar</SelectItem>
                                <SelectItem value="injected">Injected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="pesticide" className="mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Pesticide Parameters</CardTitle>
                          <CardDescription>Configure your pesticide prescription</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="pesticide-type">Pesticide Type</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select pesticide type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="herbicide">Herbicide</SelectItem>
                                <SelectItem value="insecticide">Insecticide</SelectItem>
                                <SelectItem value="fungicide">Fungicide</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="product">Product</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select product" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="roundup">Roundup PowerMAX</SelectItem>
                                <SelectItem value="liberty">Liberty</SelectItem>
                                <SelectItem value="warrior">Warrior II</SelectItem>
                                <SelectItem value="headline">Headline</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Application Rate (oz/acre)</Label>
                            <div className="flex items-center gap-4">
                              <Slider defaultValue={[32]} max={64} min={8} step={1} />
                              <span className="w-12 text-center">32</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Water Volume (gal/acre)</Label>
                            <div className="flex items-center gap-4">
                              <Slider defaultValue={[15]} max={30} min={5} step={1} />
                              <span className="w-12 text-center">15</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Variable Rate</Label>
                            <div className="flex items-center gap-2">
                              <Switch id="variable-rate-pest" />
                              <Label htmlFor="variable-rate-pest">Enable variable rate application</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => router.push("/prescriptions")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        "Creating..."
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Create Prescription
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

