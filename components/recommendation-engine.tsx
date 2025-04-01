"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Droplets,
  Leaf,
  SproutIcon as Seedling,
  Sprout,
  Tractor,
  Wind,
  CloudRain,
  Sun,
  Thermometer,
  Users,
} from "lucide-react"

export function RecommendationEngine() {
  const [selectedTab, setSelectedTab] = useState("crops")
  const [cropType, setCropType] = useState("corn")
  const [soilType, setSoilType] = useState("clay-loam")
  const [climate, setClimate] = useState("temperate")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showRecommendations, setShowRecommendations] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setProgress(0)
    setShowRecommendations(false)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setShowRecommendations(true)
          return 100
        }
        return prev + 5
      })
    }, 150)
  }

  return (
    <Card className="bg-terrabit-900/60 border-terrabit-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl text-white">AI Recommendation Engine</CardTitle>
        <CardDescription className="text-terrabit-200">
          Get personalized recommendations based on your land data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="soil-type" className="text-terrabit-100">
              Soil Type
            </Label>
            <Select value={soilType} onValueChange={setSoilType}>
              <SelectTrigger className="border-terrabit-700 bg-terrabit-800/50 text-white">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                <SelectItem value="sandy">Sandy</SelectItem>
                <SelectItem value="loamy">Loamy</SelectItem>
                <SelectItem value="clay-loam">Clay Loam</SelectItem>
                <SelectItem value="silty">Silty</SelectItem>
                <SelectItem value="peaty">Peaty</SelectItem>
                <SelectItem value="chalky">Chalky</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="climate" className="text-terrabit-100">
              Climate Zone
            </Label>
            <Select value={climate} onValueChange={setClimate}>
              <SelectTrigger className="border-terrabit-700 bg-terrabit-800/50 text-white">
                <SelectValue placeholder="Select climate" />
              </SelectTrigger>
              <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                <SelectItem value="tropical">Tropical</SelectItem>
                <SelectItem value="subtropical">Subtropical</SelectItem>
                <SelectItem value="temperate">Temperate</SelectItem>
                <SelectItem value="continental">Continental</SelectItem>
                <SelectItem value="polar">Polar</SelectItem>
                <SelectItem value="arid">Arid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="land-size" className="text-terrabit-100">
              Land Size (acres)
            </Label>
            <Select defaultValue="100-500">
              <SelectTrigger className="border-terrabit-700 bg-terrabit-800/50 text-white">
                <SelectValue placeholder="Select land size" />
              </SelectTrigger>
              <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                <SelectItem value="<10">Less than 10</SelectItem>
                <SelectItem value="10-100">10 - 100</SelectItem>
                <SelectItem value="100-500">100 - 500</SelectItem>
                <SelectItem value="500-1000">500 - 1,000</SelectItem>
                <SelectItem value="1000+">More than 1,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-terrabit-100">Soil pH Level</Label>
          <div className="flex items-center gap-4">
            <Slider defaultValue={[6.5]} max={14} min={0} step={0.1} className="flex-1" />
            <span className="w-12 text-center text-terrabit-200">6.5</span>
          </div>
          <div className="flex justify-between text-xs text-terrabit-400">
            <span>Acidic (0)</span>
            <span>Neutral (7)</span>
            <span>Alkaline (14)</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-terrabit-100">Annual Rainfall (inches)</Label>
          <div className="flex items-center gap-4">
            <Slider defaultValue={[35]} max={100} min={0} step={1} className="flex-1" />
            <span className="w-12 text-center text-terrabit-200">35"</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-terrabit-100">Temperature Range</Label>
            <div className="flex items-center gap-4">
              <Slider defaultValue={[40, 85]} max={120} min={-20} step={1} className="flex-1" />
              <span className="w-20 text-center text-terrabit-200">40°F - 85°F</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-terrabit-100">Growing Season (days)</Label>
            <div className="flex items-center gap-4">
              <Slider defaultValue={[180]} max={365} min={30} step={1} className="flex-1" />
              <span className="w-12 text-center text-terrabit-200">180</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="irrigation" className="data-[state=checked]:bg-terrabit-500" />
            <Label htmlFor="irrigation" className="text-terrabit-200">
              Irrigation Available
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="organic" className="data-[state=checked]:bg-terrabit-500" />
            <Label htmlFor="organic" className="text-terrabit-200">
              Organic Farming
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="mechanized" defaultChecked className="data-[state=checked]:bg-terrabit-500" />
            <Label htmlFor="mechanized" className="text-terrabit-200">
              Mechanized Equipment
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="historical" defaultChecked className="data-[state=checked]:bg-terrabit-500" />
            <Label htmlFor="historical" className="text-terrabit-200">
              Use Historical Data
            </Label>
          </div>
        </div>

        {isGenerating && (
          <div className="space-y-2">
            <Label className="text-terrabit-100">Analyzing Data & Generating Recommendations</Label>
            <Progress value={progress} className="h-2 bg-terrabit-800" indicatorClassName="bg-terrabit-500" />
            <p className="text-sm text-terrabit-300 text-center">{progress}% Complete</p>
          </div>
        )}

        {showRecommendations && (
          <div className="space-y-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-terrabit-800">
                <TabsTrigger
                  value="crops"
                  className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                >
                  Crops
                </TabsTrigger>
                <TabsTrigger
                  value="practices"
                  className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                >
                  Practices
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                >
                  Resources
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
                >
                  Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="crops" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Corn (Primary)</CardTitle>
                        <Seedling className="h-5 w-5 text-terrabit-400" />
                      </div>
                      <CardDescription className="text-terrabit-300">95% compatibility with your land</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <p>Recommended varieties:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Pioneer P1234 (High yield)</li>
                        <li>DeKalb DK5678 (Drought resistant)</li>
                        <li>AgriGold A6544 (Disease resistant)</li>
                      </ul>
                      <div className="mt-2">
                        <p className="text-terrabit-300 font-medium">Expected yield: 195-210 bu/acre</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Soybeans (Rotation)</CardTitle>
                        <Sprout className="h-5 w-5 text-terrabit-400" />
                      </div>
                      <CardDescription className="text-terrabit-300">90% compatibility with your land</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <p>Recommended varieties:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Asgrow AG3832 (High protein)</li>
                        <li>Pioneer P94Y82 (Early maturity)</li>
                        <li>NK S29-K1 (Cyst nematode resistant)</li>
                      </ul>
                      <div className="mt-2">
                        <p className="text-terrabit-300 font-medium">Expected yield: 58-65 bu/acre</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Cover Crops</CardTitle>
                        <Leaf className="h-5 w-5 text-terrabit-400" />
                      </div>
                      <CardDescription className="text-terrabit-300">Soil health improvement</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <p>Recommended varieties:</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Cereal Rye (Erosion control)</li>
                        <li>Crimson Clover (Nitrogen fixation)</li>
                        <li>Radish (Compaction reduction)</li>
                      </ul>
                      <div className="mt-2">
                        <p className="text-terrabit-300 font-medium">
                          Benefits: Improved soil structure, reduced erosion
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="practices" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Soil Management</CardTitle>
                        <Droplets className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Implement no-till or reduced tillage practices to preserve soil structure</li>
                        <li>Apply lime at 2 tons/acre to adjust pH to optimal range (6.5-7.0)</li>
                        <li>Incorporate cover crops in rotation to improve organic matter</li>
                        <li>Implement controlled traffic farming to reduce compaction</li>
                        <li>Consider precision soil sampling every 2.5 acres for variable rate applications</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Fertilization Strategy</CardTitle>
                        <Leaf className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Apply nitrogen in split applications: 30% at planting, 70% at V6 stage</li>
                        <li>Recommended rates: 180-220 lbs N/acre for corn</li>
                        <li>Apply phosphorus and potassium based on soil test results</li>
                        <li>Consider micronutrient applications, especially zinc for corn</li>
                        <li>Implement variable rate technology for optimized nutrient placement</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Pest Management</CardTitle>
                        <Wind className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Implement Integrated Pest Management (IPM) practices</li>
                        <li>Monitor for corn rootworm and European corn borer</li>
                        <li>Scout fields weekly during growing season</li>
                        <li>Rotate modes of action to prevent resistance development</li>
                        <li>Consider biological controls where appropriate</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Water Management</CardTitle>
                        <CloudRain className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Install soil moisture sensors at 12", 24", and 36" depths</li>
                        <li>Implement variable rate irrigation if available</li>
                        <li>Schedule irrigation based on crop water use and soil moisture</li>
                        <li>Consider drainage improvements in low-lying areas</li>
                        <li>Implement water conservation practices during critical growth stages</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Equipment Needs</CardTitle>
                        <Tractor className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>GPS-guided planter with variable rate capability</li>
                        <li>No-till drill for cover crop seeding</li>
                        <li>Sprayer with section control</li>
                        <li>Combine with yield mapping</li>
                        <li>Soil sampling equipment</li>
                      </ul>
                      <div className="mt-2">
                        <p className="text-terrabit-300 font-medium">Estimated investment: $350,000 - $500,000</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Input Requirements</CardTitle>
                        <Seedling className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Seed: 32,000 seeds/acre for corn</li>
                        <li>Fertilizer: 180-220 lbs N/acre</li>
                        <li>Herbicides: Pre-emergence and post-emergence</li>
                        <li>Insecticides: As needed based on IPM scouting</li>
                        <li>Lime: 2 tons/acre (based on soil pH)</li>
                      </ul>
                      <div className="mt-2">
                        <p className="text-terrabit-300 font-medium">Estimated cost: $280-350/acre</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-terrabit-800/50 border-terrabit-700">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-md text-white">Labor & Expertise</CardTitle>
                        <Users className="h-5 w-5 text-terrabit-400" />
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-terrabit-200">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Farm manager with precision ag experience</li>
                        <li>Equipment operators (2-3)</li>
                        <li>Seasonal labor for planting and harvest</li>
                        <li>Agronomist consultant (quarterly visits)</li>
                        <li>Data analyst for farm management software</li>
                      </ul>
                      <div className="mt-2">
                        <p className="text-terrabit-300 font-medium">Estimated annual labor cost: $120,000-$180,000</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-4 space-y-4">
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-terrabit-700"></div>
                  <ul className="space-y-6">
                    <li className="relative pl-10">
                      <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-terrabit-800 border-2 border-terrabit-600 flex items-center justify-center">
                        <Sun className="h-4 w-4 text-terrabit-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Spring (March-May)</h4>
                        <ul className="list-disc pl-5 space-y-1 mt-1 text-sm text-terrabit-200">
                          <li>Soil testing and analysis</li>
                          <li>Apply lime if needed (March)</li>
                          <li>Pre-plant fertilizer application</li>
                          <li>Plant corn when soil temperatures reach 50°F</li>
                          <li>Apply pre-emergence herbicides</li>
                        </ul>
                      </div>
                    </li>

                    <li className="relative pl-10">
                      <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-terrabit-800 border-2 border-terrabit-600 flex items-center justify-center">
                        <Thermometer className="h-4 w-4 text-terrabit-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Summer (June-August)</h4>
                        <ul className="list-disc pl-5 space-y-1 mt-1 text-sm text-terrabit-200">
                          <li>Side-dress nitrogen application (V6 stage)</li>
                          <li>Post-emergence weed control</li>
                          <li>Regular pest scouting</li>
                          <li>Irrigation management during critical growth stages</li>
                          <li>Tissue sampling for nutrient analysis</li>
                        </ul>
                      </div>
                    </li>

                    <li className="relative pl-10">
                      <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-terrabit-800 border-2 border-terrabit-600 flex items-center justify-center">
                        <CloudRain className="h-4 w-4 text-terrabit-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Fall (September-November)</h4>
                        <ul className="list-disc pl-5 space-y-1 mt-1 text-sm text-terrabit-200">
                          <li>Harvest corn at optimal moisture content</li>
                          <li>Collect yield data and create yield maps</li>
                          <li>Soil sampling after harvest</li>
                          <li>Plant cover crops</li>
                          <li>Fall fertilizer application if needed</li>
                        </ul>
                      </div>
                    </li>

                    <li className="relative pl-10">
                      <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-terrabit-800 border-2 border-terrabit-600 flex items-center justify-center">
                        <Wind className="h-4 w-4 text-terrabit-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">Winter (December-February)</h4>
                        <ul className="list-disc pl-5 space-y-1 mt-1 text-sm text-terrabit-200">
                          <li>Analyze yield data and soil test results</li>
                          <li>Develop crop plan for next season</li>
                          <li>Equipment maintenance and calibration</li>
                          <li>Order inputs (seed, fertilizer, chemicals)</li>
                          <li>Attend agricultural education events</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          className="bg-terrabit-500 text-white hover:bg-terrabit-600"
          disabled={isGenerating}
          onClick={handleGenerate}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Analyzing Data...
            </span>
          ) : showRecommendations ? (
            "Regenerate Recommendations"
          ) : (
            "Generate Recommendations"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

