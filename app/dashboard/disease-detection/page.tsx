"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, AlertCircle, CheckCircle2, History, Camera } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface DiseaseInfo {
  name: string
  description: string
  recommendations: string[]
  severity: string
  confidence: number
}

interface DetectionHistory {
  id: string
  date: string
  image: string
  disease: DiseaseInfo
}

export default function DiseaseDetectionPage() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [diseaseInfo, setDiseaseInfo] = useState<DiseaseInfo | null>(null)
  const [activeTab, setActiveTab] = useState("detect")
  const [detectionHistory, setDetectionHistory] = useState<DetectionHistory[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setError(null)
      setDiseaseInfo(null)
    }
  }

  const handleSubmit = async () => {
    if (!image) {
      setError("Please select an image first")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock response
      const mockDiseaseInfo: DiseaseInfo = {
        name: "Early Blight",
        description: "A fungal disease that affects tomato plants, causing dark spots on leaves and stems.",
        recommendations: [
          "Remove and destroy infected leaves",
          "Apply fungicide treatment",
          "Improve air circulation",
          "Water plants at the base to avoid wetting leaves"
        ],
        severity: "moderate",
        confidence: 92
      }

      setDiseaseInfo(mockDiseaseInfo)

      // Add to history
      const newDetection: DetectionHistory = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        image: preview!,
        disease: mockDiseaseInfo
      }

      setDetectionHistory([newDetection, ...detectionHistory])
      toast.success("Disease detected successfully")
    } catch (error) {
      setError("Failed to analyze image. Please try again.")
      toast.error("Failed to analyze image")
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-500/20 text-green-400"
      case "moderate":
        return "bg-yellow-500/20 text-yellow-400"
      case "high":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Disease Detection</h1>
          <p className="text-muted-foreground">
            Upload an image of your crop to detect potential diseases and get recommendations.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="detect" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span>Detect Disease</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>Detection History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detect" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Crop Image</CardTitle>
                <CardDescription>
                  Upload a clear image of your crop to detect potential diseases.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Select Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSubmit}
                      disabled={!image || loading}
                      className="w-[120px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Analyze
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {preview && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                    <img
                      src={preview}
                      alt="Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {diseaseInfo && (
                  <div className="space-y-4">
                    <Alert>
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertTitle>Disease Detected</AlertTitle>
                      <AlertDescription>
                        {diseaseInfo.name} with {diseaseInfo.confidence}% confidence
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Severity</span>
                        <Badge className={getSeverityColor(diseaseInfo.severity)}>
                          {diseaseInfo.severity.charAt(0).toUpperCase() + diseaseInfo.severity.slice(1)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Description</span>
                        <p className="text-sm text-muted-foreground">{diseaseInfo.description}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-medium">Recommendations</span>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {diseaseInfo.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection History</CardTitle>
                <CardDescription>
                  View your previous disease detections and recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {detectionHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <History className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No detection history yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {detectionHistory.map((detection) => (
                      <Card key={detection.id} className="bg-muted">
                        <CardContent className="pt-6">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Date</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(detection.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Disease</span>
                                <span className="text-sm text-muted-foreground">
                                  {detection.disease.name}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Severity</span>
                                <Badge className={getSeverityColor(detection.disease.severity)}>
                                  {detection.disease.severity.charAt(0).toUpperCase() + detection.disease.severity.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="relative aspect-video overflow-hidden rounded-lg border">
                              <img
                                src={detection.image}
                                alt="Detection"
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 