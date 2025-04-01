"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, BarChart3, Leaf, Cloud } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function DemoPage() {
  const [file, setFile] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file first")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze-data", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze data")
      }

      const data = await response.json()
      setAnalysis(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    if (!analysis) return

    const dataStr = JSON.stringify(analysis, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "farm-analysis.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farm Analysis Demo</h1>
          <p className="text-muted-foreground">
            Upload your farm data to get AI-powered insights and recommendations.
          </p>
        </div>

        <Tabs defaultValue="data" className="space-y-4">
          <TabsList>
            <TabsTrigger value="data">Data Analysis</TabsTrigger>
            <TabsTrigger value="disease">Disease Detection</TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Farm Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select Data File</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file"
                      type="file"
                      accept=".csv,.json,.xlsx"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <Button onClick={handleAnalyze} disabled={!file || loading}>
                      {loading ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {analysis && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">Analysis Results</h3>
                      <Button onClick={handleExport} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Yield Prediction</CardTitle>
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{analysis.yield} tons/acre</div>
                          <Progress value={parseInt(analysis.yield) * 10} className="mt-2" />
                          <p className="text-xs text-muted-foreground mt-2">
                            Based on current conditions
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Soil Health</CardTitle>
                          <Leaf className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{analysis.soilHealth}%</div>
                          <Progress value={parseInt(analysis.soilHealth)} className="mt-2" />
                          <p className="text-xs text-muted-foreground mt-2">
                            Optimal range: 60-80%
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Weather Impact</CardTitle>
                          <Cloud className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{analysis.weatherImpact}</div>
                          <Badge variant={analysis.weatherImpact === "Favorable" ? "default" : "destructive"} className="mt-2">
                            {analysis.weatherImpact}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            Current conditions
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Risks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {analysis.risks.map((risk: any, index: number) => (
                              <li key={index} className="flex items-center justify-between">
                                <span>{risk.type}</span>
                                <Badge variant={risk.severity === "Low" ? "default" : "destructive"}>
                                  {risk.severity}
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disease">
            <Card>
              <CardHeader>
                <CardTitle>Disease Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground">
                  Upload a crop image to detect potential diseases.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 