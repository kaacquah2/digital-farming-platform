import { CropDiseaseDetector } from "@/components/crop-disease-detector"

export default function DiseaseDetectionPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Disease Detection</h1>
          <p className="text-muted-foreground">
            Upload an image of your crop to detect potential diseases and get recommendations.
          </p>
        </div>

        <CropDiseaseDetector />
      </div>
    </div>
  )
} 