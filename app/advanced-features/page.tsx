import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DiseaseDetection from "@/components/disease-detection"
import AdvancedWeather from "@/components/advanced-weather"
import SustainabilityTracker from "@/components/sustainability-tracker"
import { Leaf, Cloud, ScanLine } from "lucide-react"

export const metadata: Metadata = {
  title: "Advanced Features | TerraBit",
  description: "Explore TerraBit's cutting-edge AI-powered farming features",
}

export default function AdvancedFeaturesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Advanced AI-Powered Features</h1>

      <div className="mb-8 space-y-2">
        <p className="text-muted-foreground">
          TerraBit's advanced features leverage artificial intelligence, machine learning, and data science to provide
          unprecedented insights for modern farming operations.
        </p>
        <p className="text-muted-foreground">
          Explore these cutting-edge tools designed to optimize your farming operations and increase sustainability.
        </p>
      </div>

      <Tabs defaultValue="disease" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="disease" className="flex items-center gap-2">
            <ScanLine className="h-4 w-4" />
            <span>Disease Detection</span>
          </TabsTrigger>
          <TabsTrigger value="weather" className="flex items-center gap-2">
            <Cloud className="h-4 w-4" />
            <span>Advanced Weather</span>
          </TabsTrigger>
          <TabsTrigger value="sustainability" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span>Sustainability</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disease" className="mt-6">
          <DiseaseDetection />
        </TabsContent>

        <TabsContent value="weather" className="mt-6">
          <AdvancedWeather />
        </TabsContent>

        <TabsContent value="sustainability" className="mt-6">
          <SustainabilityTracker />
        </TabsContent>
      </Tabs>
    </div>
  )
}

