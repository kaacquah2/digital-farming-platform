import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function SoilHealth() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Soil Health Management</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Monitor and improve your soil quality for optimal crop production
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src="/images/soil-health.png"
            alt="Hands examining soil quality"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Soil Analysis</CardTitle>
              <CardDescription>Get detailed insights into your soil composition and health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Organic Matter</span>
                    <span className="text-sm text-muted-foreground">4.2%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">pH Level</span>
                    <span className="text-sm text-muted-foreground">6.8</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Nitrogen (N)</span>
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Phosphorus (P)</span>
                    <span className="text-sm text-muted-foreground">High</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">Potassium (K)</span>
                    <span className="text-sm text-muted-foreground">Medium-High</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soil Health Recommendations</CardTitle>
              <CardDescription>Personalized strategies to improve your soil quality</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <span>Add compost to increase organic matter content</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <span>Consider cover crops to prevent erosion and add nutrients</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <span>Implement crop rotation to improve soil structure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">•</span>
                  <span>Monitor soil moisture to prevent compaction</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

