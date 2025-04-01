import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Leaf, AlertTriangle, Microscope } from "lucide-react"

export default function PestManagement() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Integrated Pest Management</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Identify, monitor, and manage pests with our advanced detection system
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <Image
            src="/images/pest-management.png"
            alt="Close-up of a beetle pest on a plant leaf"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Tabs defaultValue="detection">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="detection">
                <Bug className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Detection</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring">
                <Microscope className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Monitoring</span>
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="treatment">
                <Leaf className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Treatment</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detection" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Powered Pest Detection</CardTitle>
                  <CardDescription>
                    Our system uses computer vision to identify over 500 common agricultural pests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Upload images from your fields or use our mobile app to instantly identify pests. Our AI model has
                    been trained on millions of images and can identify pests with over 95% accuracy, even in early
                    infestation stages.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Identify insects, mites, nematodes, and disease vectors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Get detailed information about the pest's lifecycle</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Understand potential crop damage and economic impact</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Continuous Monitoring</CardTitle>
                  <CardDescription>Track pest populations and activity across your fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our system continuously monitors pest activity using a network of IoT sensors and trap cameras. Get
                    real-time data on pest populations, movement patterns, and potential hotspots.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Track pest population trends over time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Identify pest entry points and migration patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Correlate pest activity with weather and crop conditions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Early Warning System</CardTitle>
                  <CardDescription>Receive timely alerts before pest problems escalate</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our predictive models analyze pest data, weather conditions, and crop vulnerability to provide early
                    warnings about potential infestations. Get alerts via email, SMS, or push notifications.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Receive alerts when pest populations reach economic thresholds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Get forecasts for potential pest outbreaks based on weather</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Customize alert thresholds based on your risk tolerance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="treatment" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Treatment Recommendations</CardTitle>
                  <CardDescription>Get personalized, sustainable pest management strategies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Based on the identified pests, crop type, growth stage, and your preferences, our system provides
                    tailored treatment recommendations that prioritize effectiveness and environmental sustainability.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Biological control options (beneficial insects, microbes)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Cultural practices to reduce pest pressure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Targeted chemical applications when necessary</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-500">•</span>
                      <span>Resistance management strategies</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

