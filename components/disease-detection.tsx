"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface Prediction {
  disease: string
  confidence: number
  recommendations: string[]
}

export function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handlePredict = async () => {
    if (!file) {
      toast.error("Please select an image first")
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setPrediction(data.prediction)
      toast.success("Prediction completed successfully")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to get prediction")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crop Disease Detection</CardTitle>
        <CardDescription>
          Upload an image of your crop to detect potential diseases
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={preview}
              alt="Preview"
              className="object-cover"
            />
          </div>
        )}

        <Button
          onClick={handlePredict}
          disabled={!file || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Predict Disease"
          )}
        </Button>

        {prediction && (
          <div className="mt-4 space-y-2 rounded-lg bg-terrabit-900 p-4">
            <h3 className="text-lg font-semibold text-white">
              Prediction Results
            </h3>
            <div className="space-y-1">
              <p className="text-white">
                Disease: <span className="font-medium">{prediction.disease}</span>
              </p>
              <p className="text-white">
                Confidence:{" "}
                <span className="font-medium">
                  {(prediction.confidence * 100).toFixed(1)}%
                </span>
              </p>
              <div className="mt-2">
                <h4 className="font-medium text-white">Recommendations:</h4>
                <ul className="mt-1 list-inside list-disc space-y-1 text-white">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

