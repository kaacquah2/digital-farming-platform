import { BarChart3, Cloud, CropIcon, Layers, Map, Tractor } from "lucide-react"

export function FeatureHighlights() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to optimize your farming operations and maximize yields.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900">
              <Map className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Data Integration</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Integrate data from equipment, sensors, and satellite imagery into one platform.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Data Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Analyze field data to identify areas for improvement and understand crop performance.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900">
              <Tractor className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Equipment Integration</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Connect to farm equipment to collect and process data for planting, spraying, and harvesting maps.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900">
              <Layers className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Prescription Creation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Create customized fertility and seeding plans based on field variability.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900">
              <Cloud className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Field Health Monitoring</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Access high-quality satellite imagery to identify areas that need corrective actions.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-900">
              <CropIcon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Yield Analysis</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Evaluate crop performance by seed, soil type, and other factors to maximize returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

