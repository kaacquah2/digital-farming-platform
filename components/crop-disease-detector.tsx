"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface DiseaseInfo {
  name: string
  description: string
  recommendations: string[]
  severity: string
  confidence: number
}

export function CropDiseaseDetector() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<DiseaseInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
      setResult(null)
      setError(null)
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
      const formData = new FormData()
      formData.append("image", image)

      const response = await fetch("/api/detect-disease", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to detect disease")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Crop Disease Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Crop Image</Label>
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

          {result && (
            <div className="space-y-4">
              <Alert variant={result.severity === "None" ? "default" : "destructive"}>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>{result.name}</AlertTitle>
                <AlertDescription>
                  {result.description}
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Severity</Label>
                  <Badge variant={result.severity === "None" ? "default" : "destructive"}>
                    {result.severity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Confidence</Label>
                  <Badge variant="outline">
                    {(result.confidence * 100).toFixed(1)}%
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Recommendations</Label>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 