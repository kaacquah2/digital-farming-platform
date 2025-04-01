"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  BarChart,
  Leaf,
  Droplets,
  Sprout,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  TrendingUp,
  Zap,
  Calendar,
  Tractor,
  Droplet,
} from "lucide-react"
import { predictCropYield, assessCropHealth, optimizeResources } from "@/lib/ai-model"
import { demoFields } from "@/lib/demo-mode"

export default function AIPredictions() {
  const [selectedField, setSelectedField] = useState(demoFields[0])
  const [activeTab, setActiveTab] = useState("yield")
  const [isLoading, setIsLoading] = useState(false)
  const [yieldPrediction, setYieldPrediction] = useState(null)
  const [healthAssessment, setHealthAssessment] = useState(null)
  const [resourceOptimization, setResourceOptimization] = useState(null)

  const generatePredictions = () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate yield prediction
      const prediction = predictCropYield({
        fieldId: selectedField.id,
        crop: selectedField.crop,
        soilType: selectedField.soilType,
        area: selectedField.area,
        plantingDate: selectedField.plantingDate,
        previousYields: [156, 162, 170, 175],
      })
      setYieldPrediction(prediction)

      // Generate health assessment
      const health = assessCropHealth(selectedField.id, selectedField.crop, selectedField.plantingDate)
      setHealthAssessment(health)

      // Generate resource optimization
      const optimization = optimizeResources(selectedField.id, selectedField.crop, {})
      setResourceOptimization(optimization)

      setIsLoading(false)
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-terrabit-500" />
          AI-Powered Insights
        </CardTitle>
        <CardDescription>Leverage artificial intelligence to optimize your farming operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full sm:w-1/3">
            <div className="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <h3 className="font-medium">Select Field</h3>
              <div className="space-y-2">
                {demoFields.map((field) => (
                  <Button
                    key={field.id}
                    variant={selectedField.id === field.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedField(field)
                      setYieldPrediction(null)
                      setHealthAssessment(null)
                      setResourceOptimization(null)
                    }}
                  >
                    {field.name}
                  </Button>
                ))}
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Crop:</span>
                  <span>{selectedField.crop}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Area:</span>
                  <span>{selectedField.area} acres</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Soil:</span>
                  <span>{selectedField.soilType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Planted:</span>
                  <span>{new Date(selectedField.plantingDate).toLocaleDateString()}</span>
                </div>
              </div>
              <Button className="w-full" onClick={generatePredictions} disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Generate Insights"}
              </Button>
            </div>
          </div>

          <div className="w-full sm:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="yield" className="flex items-center gap-1">
                  <BarChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Yield Prediction</span>
                  <span className="inline sm:hidden">Yield</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center gap-1">
                  <Leaf className="h-4 w-4" />
                  <span className="hidden sm:inline">Crop Health</span>
                  <span className="inline sm:hidden">Health</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  <span className="hidden sm:inline">Resource Optimization</span>
                  <span className="inline sm:hidden">Resources</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="yield" className="mt-4">
                {!yieldPrediction && !isLoading ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                    <BarChart className="mb-2 h-10 w-10 text-gray-400 dark:text-gray-600" />
                    <h3 className="mb-1 text-lg font-medium">No Yield Prediction</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate insights to see AI-powered yield predictions for this field.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="flex h-64 flex-col items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-terrabit-500"></div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Analyzing field data and generating predictions...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-medium">Predicted Yield</h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <span>Confidence:</span>
                          <span>{Math.round(yieldPrediction.confidence * 100)}%</span>
                        </Badge>
                      </div>

                      <div className="mb-6 text-center">
                        <div className="text-4xl font-bold text-terrabit-500">
                          {yieldPrediction.predictedYield}
                          <span className="ml-1 text-lg font-normal text-gray-500 dark:text-gray-400">
                            {selectedField.crop === "Corn" ||
                            selectedField.crop === "Soybeans" ||
                            selectedField.crop === "Wheat"
                              ? "bu/acre"
                              : selectedField.crop === "Cotton"
                                ? "bales/acre"
                                : "units/acre"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Range: {yieldPrediction.yieldRange.min} - {yieldPrediction.yieldRange.max}{" "}
                          {selectedField.crop === "Corn" ||
                          selectedField.crop === "Soybeans" ||
                          selectedField.crop === "Wheat"
                            ? "bu/acre"
                            : selectedField.crop === "Cotton"
                              ? "bales/acre"
                              : "units/acre"}
                        </p>
                      </div>

                      <h4 className="mb-2 font-medium">Key Factors</h4>
                      <div className="space-y-3">
                        {yieldPrediction.factors.map((factor, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {factor.impact === "positive" ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                              ) : factor.impact === "negative" ? (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                              ) : (
                                <Sprout className="h-4 w-4 text-blue-500" />
                              )}
                              <span>{factor.name}</span>
                            </div>
                            <Badge
                              variant={
                                factor.impact === "positive"
                                  ? "success"
                                  : factor.impact === "negative"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {factor.impact === "positive" ? "+" : factor.impact === "negative" ? "-" : ""}
                              {Math.round(factor.strength * 100)}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <h3 className="mb-3 text-lg font-medium">Recommendations</h3>
                      <div className="space-y-3">
                        {yieldPrediction.recommendations.map((rec, index) => (
                          <div key={index} className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                            <div className="mb-1 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{rec.type}</Badge>
                                <Badge
                                  variant={
                                    rec.priority === "high"
                                      ? "destructive"
                                      : rec.priority === "medium"
                                        ? "default"
                                        : "outline"
                                  }
                                >
                                  {rec.priority}
                                </Badge>
                              </div>
                              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                +{rec.potentialImpact}% yield
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="health" className="mt-4">
                {!healthAssessment && !isLoading ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                    <Leaf className="mb-2 h-10 w-10 text-gray-400 dark:text-gray-600" />
                    <h3 className="mb-1 text-lg font-medium">No Health Assessment</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate insights to see AI-powered crop health assessment for this field.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="flex h-64 flex-col items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-terrabit-500"></div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Analyzing crop health data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-medium">Crop Health Status</h3>
                        <Badge
                          variant={
                            healthAssessment.overallHealth === "excellent" || healthAssessment.overallHealth === "good"
                              ? "success"
                              : healthAssessment.overallHealth === "fair"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {healthAssessment.overallHealth.charAt(0).toUpperCase() +
                            healthAssessment.overallHealth.slice(1)}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm">Health Score</span>
                          <span className="text-sm font-medium">{healthAssessment.score}/100</span>
                        </div>
                        <Progress
                          value={healthAssessment.score}
                          className={`h-2 ${
                            healthAssessment.score >= 80
                              ? "bg-green-100 dark:bg-green-900"
                              : healthAssessment.score >= 60
                                ? "bg-yellow-100 dark:bg-yellow-900"
                                : "bg-red-100 dark:bg-red-900"
                          }`}
                          indicatorClassName={
                            healthAssessment.score >= 80
                              ? "bg-green-500"
                              : healthAssessment.score >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        />
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>Growth Stage</span>
                          </div>
                          <div className="font-medium">{healthAssessment.growthStage}</div>
                        </div>
                        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Tractor className="h-4 w-4" />
                            <span>Est. Maturity</span>
                          </div>
                          <div className="font-medium">
                            {new Date(healthAssessment.estimatedMaturity).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <h3 className="mb-3 text-lg font-medium">Detected Issues</h3>
                      {healthAssessment.issues.length === 0 ? (
                        <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>No significant issues detected in this field.</span>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {healthAssessment.issues.map((issue, index) => (
                            <div key={index} className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle
                                    className={`h-4 w-4 ${
                                      issue.severity === "high"
                                        ? "text-red-500"
                                        : issue.severity === "medium"
                                          ? "text-yellow-500"
                                          : "text-blue-500"
                                    }`}
                                  />
                                  <span className="font-medium">{issue.type}</span>
                                </div>
                                <Badge
                                  variant={
                                    issue.severity === "high"
                                      ? "destructive"
                                      : issue.severity === "medium"
                                        ? "default"
                                        : "outline"
                                  }
                                >
                                  {issue.severity} severity
                                </Badge>
                              </div>
                              <p className="mb-1 text-sm text-gray-700 dark:text-gray-300">{issue.description}</p>
                              <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Affected area:</span>
                                <span className="font-medium">{issue.affectedArea}% of field</span>
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                                  Recommendations
                                </h4>
                                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                  {issue.recommendations.map((rec, recIndex) => (
                                    <li key={recIndex}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                {!resourceOptimization && !isLoading ? (
                  <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                    <Droplets className="mb-2 h-10 w-10 text-gray-400 dark:text-gray-600" />
                    <h3 className="mb-1 text-lg font-medium">No Resource Optimization</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Generate insights to see AI-powered resource optimization for this field.
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="flex h-64 flex-col items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-terrabit-500"></div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Analyzing resource usage and generating optimizations...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-medium">Resource Optimization</h3>
                        <Badge variant="success" className="flex items-center gap-1">
                          <span>Potential Savings:</span>
                          <span>{resourceOptimization.overallSavings}%</span>
                        </Badge>
                      </div>

                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="rounded-md bg-gray-50 p-3 dark:bg-gray-800">
                          <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Droplet className="h-4 w-4" />
                            <span>Carbon Footprint Reduction</span>
                          </div>
                          <div className="font-medium text-green-600 dark:text-green-400">
                            {resourceOptimization.carbonFootprint.reduction}% reduction
                          </div>
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {resourceOptimization.carbonFootprint.current} →{" "}
                            {resourceOptimization.carbonFootprint.potential} kg CO₂/acre
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                        <h3 className="mb-3 font-medium">Water Usage</h3>
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
                            <div className="font-medium">{resourceOptimization.water.currentUsage} gal/acre</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Savings</div>
                            <div className="font-medium text-green-600 dark:text-green-400">
                              {resourceOptimization.water.savings}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Recommended</div>
                            <div className="font-medium">{resourceOptimization.water.recommendedUsage} gal/acre</div>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <div>
                          <h4 className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                            Recommendations
                          </h4>
                          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            {resourceOptimization.water.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                        <h3 className="mb-3 font-medium">Fertilizer Usage</h3>
                        <div className="mb-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="w-1/3">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Nutrient</div>
                            </div>
                            <div className="w-1/3 text-center">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
                            </div>
                            <div className="w-1/3 text-right">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Recommended</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="w-1/3 font-medium">Nitrogen (N)</div>
                            <div className="w-1/3 text-center">
                              {resourceOptimization.fertilizer.currentUsage.nitrogen} lbs/acre
                            </div>
                            <div className="w-1/3 text-right">
                              {resourceOptimization.fertilizer.recommendedUsage.nitrogen} lbs/acre
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="w-1/3 font-medium">Phosphorus (P)</div>
                            <div className="w-1/3 text-center">
                              {resourceOptimization.fertilizer.currentUsage.phosphorus} lbs/acre
                            </div>
                            <div className="w-1/3 text-right">
                              {resourceOptimization.fertilizer.recommendedUsage.phosphorus} lbs/acre
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="w-1/3 font-medium">Potassium (K)</div>
                            <div className="w-1/3 text-center">
                              {resourceOptimization.fertilizer.currentUsage.potassium} lbs/acre
                            </div>
                            <div className="w-1/3 text-right">
                              {resourceOptimization.fertilizer.recommendedUsage.potassium} lbs/acre
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <div className="w-1/3 font-medium">Total Savings</div>
                            <div className="w-2/3 text-right font-medium text-green-600 dark:text-green-400">
                              {resourceOptimization.fertilizer.savings}%
                            </div>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <div>
                          <h4 className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                            Recommendations
                          </h4>
                          <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            {resourceOptimization.fertilizer.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                          <h3 className="mb-3 font-medium">Pesticide Usage</h3>
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
                              <div className="font-medium">{resourceOptimization.pesticides.currentUsage} oz/acre</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Savings</div>
                              <div className="font-medium text-green-600 dark:text-green-400">
                                {resourceOptimization.pesticides.savings}%
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Recommended</div>
                              <div className="font-medium">
                                {resourceOptimization.pesticides.recommendedUsage} oz/acre
                              </div>
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <div>
                            <h4 className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                              Recommendations
                            </h4>
                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {resourceOptimization.pesticides.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                          <h3 className="mb-3 font-medium">Labor Optimization</h3>
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">Current</div>
                              <div className="font-medium">{resourceOptimization.labor.currentHours} hrs/acre</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Savings</div>
                              <div className="font-medium text-green-600 dark:text-green-400">
                                {resourceOptimization.labor.savings}%
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500 dark:text-gray-400">Recommended</div>
                              <div className="font-medium">{resourceOptimization.labor.recommendedHours} hrs/acre</div>
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <div>
                            <h4 className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                              Recommendations
                            </h4>
                            <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
                              {resourceOptimization.labor.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Powered by TerraBit AI</p>
        <Button variant="outline" size="sm" asChild>
          <a href="/documentation" target="_blank" rel="noreferrer">
            Learn More
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

