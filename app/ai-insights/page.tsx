import type { Metadata } from "next"
import AIPredictions from "@/components/ai-predictions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Cpu, Database, LineChart } from "lucide-react"

export const metadata: Metadata = {
  title: "AI Insights | TerraBit",
  description: "AI-powered insights and predictions for your farm",
}

export default function AIInsightsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">AI Insights & Predictions</h1>

      <div className="grid gap-6">
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Predictions</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>AI Models</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Data Sources</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>Model Training</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predictions" className="mt-6">
            <AIPredictions />
          </TabsContent>

          <TabsContent value="models" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Yield Prediction Model</CardTitle>
                  <CardDescription>Machine learning model for crop yield forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our yield prediction model uses historical yield data, weather patterns, soil conditions, and
                    management practices to forecast expected yields with up to 85% accuracy. The model is continuously
                    trained on new data to improve its predictions over time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Crop Health Assessment</CardTitle>
                  <CardDescription>Computer vision model for crop health monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This model analyzes satellite and drone imagery to detect early signs of crop stress, disease, and
                    pest infestations. It can identify issues up to 10 days earlier than visual inspection, allowing for
                    timely intervention and reduced crop loss.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Optimization</CardTitle>
                  <CardDescription>Reinforcement learning for resource management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Our resource optimization model uses reinforcement learning to determine the most efficient use of
                    water, fertilizer, pesticides, and labor. It adapts to changing conditions and has helped farmers
                    reduce input costs by an average of 15-20%.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weather Prediction</CardTitle>
                  <CardDescription>Localized weather forecasting model</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This model provides field-level weather forecasts with higher accuracy than general weather
                    services. It incorporates local topography, historical patterns, and real-time data to predict
                    conditions that affect farming operations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>Information used to train and improve our AI models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium">Farm-Specific Data</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>Historical yield records</li>
                      <li>Soil test results and field mapping</li>
                      <li>Planting and harvesting dates</li>
                      <li>Input application records (fertilizer, pesticides, etc.)</li>
                      <li>Equipment operation data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Environmental Data</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>Weather station networks</li>
                      <li>Satellite imagery (multispectral and thermal)</li>
                      <li>Drone imagery</li>
                      <li>Soil moisture sensors</li>
                      <li>Climate models and historical weather data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Research Data</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <li>University agricultural research</li>
                      <li>Crop variety performance trials</li>
                      <li>Pest and disease databases</li>
                      <li>Agronomic best practices</li>
                      <li>Global agricultural statistics</li>
                    </ul>
                  </div>

                  <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
                    <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-300">Data Privacy & Security</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      All farm-specific data is securely stored and used only to improve your farm's performance. Your
                      data is never shared with third parties without explicit permission. We use industry-leading
                      encryption and security practices to protect your information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Training & Improvement</CardTitle>
                <CardDescription>How our AI models learn and improve over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium">Continuous Learning</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Our AI models are continuously trained on new data, allowing them to adapt to changing conditions
                      and improve their accuracy over time. Each growing season provides valuable new data that helps
                      refine predictions for future seasons.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Feedback Loop</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      When you provide feedback on predictions or implement recommendations, our system learns from the
                      outcomes. This creates a virtuous cycle where the AI becomes increasingly tailored to your
                      specific farm conditions and practices.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Regional Calibration</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Models are calibrated for different agricultural regions to account for variations in climate,
                      soil types, and common practices. This regional specialization improves prediction accuracy
                      compared to one-size-fits-all approaches.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 font-medium">Model Validation</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      All models undergo rigorous validation against real-world outcomes before deployment. We
                      continuously monitor model performance and make adjustments to improve accuracy and reliability.
                    </p>
                  </div>

                  <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                    <h3 className="mb-2 font-medium text-green-800 dark:text-green-300">
                      Participate in Model Improvement
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      You can contribute to improving our AI models by providing feedback on predictions and sharing
                      outcomes of implemented recommendations. This helps not only your farm but the entire TerraBit
                      community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

