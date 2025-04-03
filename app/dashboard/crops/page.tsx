"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, Leaf, Droplets, Sun, Thermometer, Search, Filter } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Crop {
  id: string
  name: string
  variety: string
  plantingDate: string
  expectedHarvest: string
  status: "growing" | "harvested" | "failed"
  notes: string
  waterNeeds: number
  sunlightNeeds: number
  temperatureNeeds: number
  currentWater: number
  currentSunlight: number
  currentTemperature: number
}

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([])
  const [showAddCrop, setShowAddCrop] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [newCrop, setNewCrop] = useState<Partial<Crop>>({
    name: "",
    variety: "",
    plantingDate: "",
    expectedHarvest: "",
    status: "growing",
    notes: "",
    waterNeeds: 50,
    sunlightNeeds: 50,
    temperatureNeeds: 20,
    currentWater: 0,
    currentSunlight: 0,
    currentTemperature: 0,
  })

  useEffect(() => {
    // Simulate loading crops from API
    const loadCrops = async () => {
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockCrops: Crop[] = [
          {
            id: "1",
            name: "Tomatoes",
            variety: "Cherry",
            plantingDate: "2023-03-15",
            expectedHarvest: "2023-06-15",
            status: "growing",
            notes: "Planted in greenhouse section A",
            waterNeeds: 70,
            sunlightNeeds: 80,
            temperatureNeeds: 25,
            currentWater: 65,
            currentSunlight: 75,
            currentTemperature: 24,
          },
          {
            id: "2",
            name: "Lettuce",
            variety: "Romaine",
            plantingDate: "2023-04-01",
            expectedHarvest: "2023-05-15",
            status: "harvested",
            notes: "Harvested successfully",
            waterNeeds: 60,
            sunlightNeeds: 50,
            temperatureNeeds: 20,
            currentWater: 0,
            currentSunlight: 0,
            currentTemperature: 0,
          },
        ]
        setCrops(mockCrops)
      } catch (error) {
        toast.error("Failed to load crops")
      }
    }

    loadCrops()
  }, [])

  const handleAddCrop = () => {
    if (!newCrop.name || !newCrop.plantingDate || !newCrop.expectedHarvest) {
      toast.error("Please fill in all required fields")
      return
    }

    const crop: Crop = {
      id: Date.now().toString(),
      name: newCrop.name,
      variety: newCrop.variety || "",
      plantingDate: newCrop.plantingDate,
      expectedHarvest: newCrop.expectedHarvest,
      status: "growing",
      notes: newCrop.notes || "",
      waterNeeds: newCrop.waterNeeds || 50,
      sunlightNeeds: newCrop.sunlightNeeds || 50,
      temperatureNeeds: newCrop.temperatureNeeds || 20,
      currentWater: 0,
      currentSunlight: 0,
      currentTemperature: 0,
    }

    setCrops([...crops, crop])
    setShowAddCrop(false)
    setNewCrop({
      name: "",
      variety: "",
      plantingDate: "",
      expectedHarvest: "",
      status: "growing",
      notes: "",
      waterNeeds: 50,
      sunlightNeeds: 50,
      temperatureNeeds: 20,
      currentWater: 0,
      currentSunlight: 0,
      currentTemperature: 0,
    })
    toast.success("Crop added successfully")
  }

  const handleDeleteCrop = (cropId: string) => {
    setCrops(crops.filter(crop => crop.id !== cropId))
    toast.success("Crop deleted successfully")
  }

  const handleUpdateCropStatus = (cropId: string, newStatus: Crop["status"]) => {
    setCrops(crops.map(crop => 
      crop.id === cropId ? { ...crop, status: newStatus } : crop
    ))
    toast.success("Crop status updated")
  }

  const getStatusColor = (status: Crop["status"]) => {
    switch (status) {
      case "growing":
        return "bg-green-500/20 text-green-400"
      case "harvested":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
    }
  }

  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crop.variety.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || crop.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Crop Management</h1>
        <Dialog open={showAddCrop} onOpenChange={setShowAddCrop}>
          <DialogTrigger asChild>
            <Button className="bg-terrabit-600 hover:bg-terrabit-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Crop
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-terrabit-900 border-terrabit-800">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Crop</DialogTitle>
              <DialogDescription className="text-terrabit-400">
                Add a new crop to your farm.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-white">Crop Name</Label>
                <Input
                  id="name"
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="variety" className="text-white">Variety</Label>
                <Input
                  id="variety"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plantingDate" className="text-white">Planting Date</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={newCrop.plantingDate}
                  onChange={(e) => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expectedHarvest" className="text-white">Expected Harvest</Label>
                <Input
                  id="expectedHarvest"
                  type="date"
                  value={newCrop.expectedHarvest}
                  onChange={(e) => setNewCrop({ ...newCrop, expectedHarvest: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes" className="text-white">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCrop.notes}
                  onChange={(e) => setNewCrop({ ...newCrop, notes: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddCrop(false)}>Cancel</Button>
              <Button onClick={handleAddCrop}>Add Crop</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-terrabit-800 border-terrabit-700 text-white"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-terrabit-800 border-terrabit-700 text-white">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="growing">Growing</SelectItem>
            <SelectItem value="harvested">Harvested</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="bg-terrabit-900 border-terrabit-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{crop.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select
                      value={crop.status}
                      onValueChange={(value) => handleUpdateCropStatus(crop.id, value as Crop["status"])}
                    >
                      <SelectTrigger className="w-[120px] bg-terrabit-800 border-terrabit-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-terrabit-800 border-terrabit-700 text-white">
                        <SelectItem value="growing">Growing</SelectItem>
                        <SelectItem value="harvested">Harvested</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCrop(crop.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-terrabit-400">
                    {crop.variety}
                  </Badge>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(crop.status)}`}>
                    {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-terrabit-400">Planting Date</p>
                    <p className="text-white">{new Date(crop.plantingDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-terrabit-400">Expected Harvest</p>
                    <p className="text-white">{new Date(crop.expectedHarvest).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-terrabit-400">Notes</p>
                    <p className="text-white">{crop.notes || "No notes"}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-terrabit-400">Water</span>
                      </div>
                      <span className="text-sm text-white">{crop.currentWater}%</span>
                    </div>
                    <Progress value={crop.currentWater} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-terrabit-400">Sunlight</span>
                      </div>
                      <span className="text-sm text-white">{crop.currentSunlight}%</span>
                    </div>
                    <Progress value={crop.currentSunlight} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-terrabit-400">Temperature</span>
                      </div>
                      <span className="text-sm text-white">{crop.currentTemperature}°C</span>
                    </div>
                    <Progress value={crop.currentTemperature} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 