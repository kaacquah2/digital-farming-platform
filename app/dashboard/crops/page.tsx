"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, Leaf, Droplets, Sun, Thermometer } from "lucide-react"
import { useState } from "react"
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
}

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([])
  const [showAddCrop, setShowAddCrop] = useState(false)
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
  })

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
    })
    toast.success("Crop added successfully")
  }

  const handleDeleteCrop = (cropId: string) => {
    setCrops(crops.filter(crop => crop.id !== cropId))
    toast.success("Crop deleted successfully")
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
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Crop Name</Label>
                <Input
                  id="name"
                  value={newCrop.name}
                  onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="variety" className="text-white">Variety</Label>
                <Input
                  id="variety"
                  value={newCrop.variety}
                  onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plantingDate" className="text-white">Planting Date</Label>
                  <Input
                    id="plantingDate"
                    type="date"
                    value={newCrop.plantingDate}
                    onChange={(e) => setNewCrop({ ...newCrop, plantingDate: e.target.value })}
                    className="bg-terrabit-800 border-terrabit-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedHarvest" className="text-white">Expected Harvest</Label>
                  <Input
                    id="expectedHarvest"
                    type="date"
                    value={newCrop.expectedHarvest}
                    onChange={(e) => setNewCrop({ ...newCrop, expectedHarvest: e.target.value })}
                    className="bg-terrabit-800 border-terrabit-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">Notes</Label>
                <Textarea
                  id="notes"
                  value={newCrop.notes}
                  onChange={(e) => setNewCrop({ ...newCrop, notes: e.target.value })}
                  className="bg-terrabit-800 border-terrabit-700 text-white"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="waterNeeds" className="text-white">Water Needs (%)</Label>
                  <Input
                    id="waterNeeds"
                    type="number"
                    min="0"
                    max="100"
                    value={newCrop.waterNeeds}
                    onChange={(e) => setNewCrop({ ...newCrop, waterNeeds: Number(e.target.value) })}
                    className="bg-terrabit-800 border-terrabit-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sunlightNeeds" className="text-white">Sunlight Needs (%)</Label>
                  <Input
                    id="sunlightNeeds"
                    type="number"
                    min="0"
                    max="100"
                    value={newCrop.sunlightNeeds}
                    onChange={(e) => setNewCrop({ ...newCrop, sunlightNeeds: Number(e.target.value) })}
                    className="bg-terrabit-800 border-terrabit-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperatureNeeds" className="text-white">Temperature (°C)</Label>
                  <Input
                    id="temperatureNeeds"
                    type="number"
                    value={newCrop.temperatureNeeds}
                    onChange={(e) => setNewCrop({ ...newCrop, temperatureNeeds: Number(e.target.value) })}
                    className="bg-terrabit-800 border-terrabit-700 text-white"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddCrop(false)}
                className="border-terrabit-700 text-white hover:bg-terrabit-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddCrop}
                className="bg-terrabit-600 hover:bg-terrabit-700"
              >
                Add Crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {crops.map((crop) => (
            <Card key={crop.id} className="bg-terrabit-900 border-terrabit-800">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{crop.name}</CardTitle>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(crop.status)}`}>
                    {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-terrabit-400">Variety</p>
                    <p className="text-white">{crop.variety || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-terrabit-400">Planting Date</p>
                    <p className="text-white">{crop.plantingDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-terrabit-400">Expected Harvest</p>
                    <p className="text-white">{crop.expectedHarvest}</p>
                  </div>
                  <div>
                    <p className="text-sm text-terrabit-400">Notes</p>
                    <p className="text-white">{crop.notes || "No notes"}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-white">{crop.waterNeeds}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-white">{crop.sunlightNeeds}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-white">{crop.temperatureNeeds}°C</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-terrabit-400 hover:text-terrabit-300"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                      onClick={() => handleDeleteCrop(crop.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {crops.length === 0 && (
            <Card className="col-span-full bg-terrabit-900 border-terrabit-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Leaf className="h-12 w-12 text-terrabit-400 mb-4" />
                <p className="text-terrabit-400">No crops added yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 