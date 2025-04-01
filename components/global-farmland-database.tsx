"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Globe, Filter, Download, MapIcon, BarChart3, ArrowUpDown, PieChart } from "lucide-react"

export function GlobalFarmlandDatabase() {
  const [activeTab, setActiveTab] = useState("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCrop, setSelectedCrop] = useState("all")
  const [selectedSoilType, setSelectedSoilType] = useState("all")
  const [sortColumn, setSortColumn] = useState("country")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Sample global farmland data
  const farmlandData = [
    {
      id: 1,
      country: "United States",
      region: "North America",
      totalArea: 157.7,
      arableLand: 152.2,
      mainCrops: "Corn, Soybeans, Wheat",
      soilTypes: "Loamy, Clay Loam",
      avgYield: "High",
    },
    {
      id: 2,
      country: "Brazil",
      region: "South America",
      totalArea: 81.5,
      arableLand: 75.3,
      mainCrops: "Soybeans, Sugarcane, Corn",
      soilTypes: "Oxisols, Ultisols",
      avgYield: "Medium-High",
    },
    {
      id: 3,
      country: "China",
      region: "Asia",
      totalArea: 135.6,
      arableLand: 119.5,
      mainCrops: "Rice, Wheat, Corn",
      soilTypes: "Loess, Paddy Soils",
      avgYield: "Medium",
    },
    {
      id: 4,
      country: "India",
      region: "Asia",
      totalArea: 179.8,
      arableLand: 156.1,
      mainCrops: "Rice, Wheat, Cotton",
      soilTypes: "Alluvial, Black Soils",
      avgYield: "Medium-Low",
    },
    {
      id: 5,
      country: "Russia",
      region: "Europe/Asia",
      totalArea: 123.4,
      arableLand: 115.7,
      mainCrops: "Wheat, Barley, Sunflower",
      soilTypes: "Chernozem, Podzols",
      avgYield: "Medium",
    },
    {
      id: 6,
      country: "Australia",
      region: "Oceania",
      totalArea: 47.0,
      arableLand: 31.2,
      mainCrops: "Wheat, Barley, Canola",
      soilTypes: "Sandy, Clay",
      avgYield: "Low-Medium",
    },
    {
      id: 7,
      country: "Argentina",
      region: "South America",
      totalArea: 38.0,
      arableLand: 33.5,
      mainCrops: "Soybeans, Corn, Wheat",
      soilTypes: "Mollisols, Vertisols",
      avgYield: "High",
    },
    {
      id: 8,
      country: "Canada",
      region: "North America",
      totalArea: 45.5,
      arableLand: 42.8,
      mainCrops: "Wheat, Canola, Barley",
      soilTypes: "Chernozem, Luvisols",
      avgYield: "Medium-High",
    },
    {
      id: 9,
      country: "France",
      region: "Europe",
      totalArea: 18.5,
      arableLand: 18.2,
      mainCrops: "Wheat, Corn, Barley",
      soilTypes: "Cambisols, Luvisols",
      avgYield: "High",
    },
    {
      id: 10,
      country: "Nigeria",
      region: "Africa",
      totalArea: 34.0,
      arableLand: 33.0,
      mainCrops: "Cassava, Yams, Corn",
      soilTypes: "Ferrasols, Lixisols",
      avgYield: "Low-Medium",
    },
  ]

  // Filter and sort data
  const filteredData = farmlandData
    .filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mainCrops.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.soilTypes.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRegion = selectedRegion === "all" || item.region === selectedRegion

      const matchesCrop = selectedCrop === "all" || item.mainCrops.toLowerCase().includes(selectedCrop.toLowerCase())

      const matchesSoilType =
        selectedSoilType === "all" || item.soilTypes.toLowerCase().includes(selectedSoilType.toLowerCase())

      return matchesSearch && matchesRegion && matchesCrop && matchesSoilType
    })
    .sort((a, b) => {
      let valueA, valueB

      switch (sortColumn) {
        case "country":
          valueA = a.country
          valueB = b.country
          break
        case "region":
          valueA = a.region
          valueB = b.region
          break
        case "totalArea":
          valueA = a.totalArea
          valueB = b.totalArea
          break
        case "arableLand":
          valueA = a.arableLand
          valueB = b.arableLand
          break
        case "avgYield":
          valueA = a.avgYield
          valueB = b.avgYield
          break
        default:
          valueA = a.country
          valueB = b.country
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })

  return (
    <Card className="bg-terrabit-900/60 border-terrabit-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Globe className="h-5 w-5 text-terrabit-400" />
          Global Farmland Database
        </CardTitle>
        <CardDescription className="text-terrabit-200">
          Access comprehensive data on farmland across the world (1990-2025)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-terrabit-800">
            <TabsTrigger value="search" className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white">
              Search & Filter
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white">
              Map View
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-terrabit-700 data-[state=active]:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4 mt-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-terrabit-400" />
                <Input
                  type="search"
                  placeholder="Search by country, crop, or soil type..."
                  className="pl-9 border-terrabit-700 bg-terrabit-800/50 text-white placeholder:text-terrabit-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="w-[140px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="South America">South America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Africa">Africa</SelectItem>
                    <SelectItem value="Oceania">Oceania</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-[140px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Crop Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="all">All Crops</SelectItem>
                    <SelectItem value="Corn">Corn</SelectItem>
                    <SelectItem value="Wheat">Wheat</SelectItem>
                    <SelectItem value="Rice">Rice</SelectItem>
                    <SelectItem value="Soybeans">Soybeans</SelectItem>
                    <SelectItem value="Cotton">Cotton</SelectItem>
                    <SelectItem value="Barley">Barley</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSoilType} onValueChange={setSelectedSoilType}>
                  <SelectTrigger className="w-[140px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Soil Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="all">All Soil Types</SelectItem>
                    <SelectItem value="Loamy">Loamy</SelectItem>
                    <SelectItem value="Clay">Clay</SelectItem>
                    <SelectItem value="Sandy">Sandy</SelectItem>
                    <SelectItem value="Alluvial">Alluvial</SelectItem>
                    <SelectItem value="Chernozem">Chernozem</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="rounded-md border border-terrabit-700 overflow-hidden">
              <Table>
                <TableHeader className="bg-terrabit-800">
                  <TableRow className="hover:bg-terrabit-700/50 border-terrabit-700">
                    <TableHead className="text-terrabit-200" onClick={() => handleSort("country")}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        Country
                        {sortColumn === "country" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-terrabit-200" onClick={() => handleSort("region")}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        Region
                        {sortColumn === "region" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-terrabit-200 text-right" onClick={() => handleSort("totalArea")}>
                      <div className="flex items-center justify-end gap-1 cursor-pointer">
                        Total Area (Mha)
                        {sortColumn === "totalArea" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-terrabit-200 text-right" onClick={() => handleSort("arableLand")}>
                      <div className="flex items-center justify-end gap-1 cursor-pointer">
                        Arable Land (Mha)
                        {sortColumn === "arableLand" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                    <TableHead className="text-terrabit-200">Main Crops</TableHead>
                    <TableHead className="text-terrabit-200">Soil Types</TableHead>
                    <TableHead className="text-terrabit-200" onClick={() => handleSort("avgYield")}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        Avg. Yield
                        {sortColumn === "avgYield" && <ArrowUpDown className="h-3 w-3" />}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow className="hover:bg-terrabit-800/50 border-terrabit-700">
                      <TableCell colSpan={7} className="text-center text-terrabit-300 py-4">
                        No matching farmland data found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-terrabit-800/50 border-terrabit-700">
                        <TableCell className="font-medium text-white">{item.country}</TableCell>
                        <TableCell className="text-terrabit-200">{item.region}</TableCell>
                        <TableCell className="text-right text-terrabit-200">{item.totalArea}</TableCell>
                        <TableCell className="text-right text-terrabit-200">{item.arableLand}</TableCell>
                        <TableCell className="text-terrabit-200">{item.mainCrops}</TableCell>
                        <TableCell className="text-terrabit-200">{item.soilTypes}</TableCell>
                        <TableCell className="text-terrabit-200">{item.avgYield}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center text-sm text-terrabit-300">
              <div>
                Showing {filteredData.length} of {farmlandData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="farmland">
                  <SelectTrigger className="w-[180px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Map Layer" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="farmland">Farmland Distribution</SelectItem>
                    <SelectItem value="soil">Soil Types</SelectItem>
                    <SelectItem value="crops">Crop Distribution</SelectItem>
                    <SelectItem value="yield">Yield Potential</SelectItem>
                    <SelectItem value="climate">Climate Zones</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="2023">
                  <SelectTrigger className="w-[120px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="1990">1990</SelectItem>
                    <SelectItem value="2000">2000</SelectItem>
                    <SelectItem value="2010">2010</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2025">2025 (Projected)</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-borders"
                    className="border-terrabit-500 data-[state=checked]:bg-terrabit-500"
                    defaultChecked
                  />
                  <Label htmlFor="show-borders" className="text-sm text-terrabit-200">
                    Show Borders
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-labels"
                    className="border-terrabit-500 data-[state=checked]:bg-terrabit-500"
                    defaultChecked
                  />
                  <Label htmlFor="show-labels" className="text-sm text-terrabit-200">
                    Show Labels
                  </Label>
                </div>
              </div>

              <div className="h-[500px] w-full bg-terrabit-800/50 rounded-lg border border-terrabit-700 flex items-center justify-center">
                <div className="text-center">
                  <MapIcon className="h-16 w-16 text-terrabit-700 mx-auto mb-4" />
                  <p className="text-terrabit-300">Interactive Global Farmland Map</p>
                  <p className="text-terrabit-400 text-sm mt-1">Click on regions to view detailed information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-terrabit-800/50 border-terrabit-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Global Farmland Area</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">1.56 billion hectares</div>
                    <p className="text-xs text-terrabit-300">11% of Earth's total land surface</p>
                  </CardContent>
                </Card>

                <Card className="bg-terrabit-800/50 border-terrabit-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Top Producing Region</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">Asia</div>
                    <p className="text-xs text-terrabit-300">34% of global agricultural output</p>
                  </CardContent>
                </Card>

                <Card className="bg-terrabit-800/50 border-terrabit-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Most Common Crop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">Wheat</div>
                    <p className="text-xs text-terrabit-300">Grown on 220 million hectares globally</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Select defaultValue="trends">
                  <SelectTrigger className="w-[180px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Analysis Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="trends">Historical Trends</SelectItem>
                    <SelectItem value="comparison">Regional Comparison</SelectItem>
                    <SelectItem value="correlation">Correlation Analysis</SelectItem>
                    <SelectItem value="prediction">Future Projections</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="area">
                  <SelectTrigger className="w-[180px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Data Metric" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="area">Farmland Area</SelectItem>
                    <SelectItem value="yield">Crop Yields</SelectItem>
                    <SelectItem value="production">Total Production</SelectItem>
                    <SelectItem value="soil">Soil Health</SelectItem>
                    <SelectItem value="water">Water Usage</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="1990-2025">
                  <SelectTrigger className="w-[180px] border-terrabit-700 bg-terrabit-800/50 text-white">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                    <SelectItem value="1990-2025">All Data (1990-2025)</SelectItem>
                    <SelectItem value="1990-2000">1990-2000</SelectItem>
                    <SelectItem value="2000-2010">2000-2010</SelectItem>
                    <SelectItem value="2010-2020">2010-2020</SelectItem>
                    <SelectItem value="2020-2025">2020-2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-[300px] w-full bg-terrabit-800/50 rounded-lg border border-terrabit-700 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-terrabit-700 mx-auto mb-2" />
                    <p className="text-terrabit-300">Historical Farmland Area Trends (1990-2025)</p>
                  </div>
                </div>

                <div className="h-[300px] w-full bg-terrabit-800/50 rounded-lg border border-terrabit-700 flex items-center justify-center">
                  <div className="text-center">
                    <PieChart className="h-12 w-12 text-terrabit-700 mx-auto mb-2" />
                    <p className="text-terrabit-300">Regional Distribution of Farmland (2023)</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-terrabit-800/50 border-terrabit-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Global Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-white">-0.7% Annual Decline</div>
                    <p className="text-xs text-terrabit-300">Farmland area decreasing since 2000</p>
                  </CardContent>
                </Card>

                <Card className="bg-terrabit-800/50 border-terrabit-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Highest Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-white">South America</div>
                    <p className="text-xs text-terrabit-300">+12.3% farmland expansion since 1990</p>
                  </CardContent>
                </Card>

                <Card className="bg-terrabit-800/50 border-terrabit-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Yield Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-white">+68% Global Average</div>
                    <p className="text-xs text-terrabit-300">Crop yields from 1990 to 2025</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button className="bg-terrabit-500 text-white hover:bg-terrabit-600">
                  <Download className="h-4 w-4 mr-2" />
                  Export Analysis
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

