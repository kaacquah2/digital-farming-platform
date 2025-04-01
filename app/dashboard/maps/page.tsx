"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Layers, Compass, Ruler } from "lucide-react"

export default function MapsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Field Maps</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="border-terrabit-700 text-white hover:bg-terrabit-800">
            <Layers className="mr-2 h-4 w-4" />
            Layer Control
          </Button>
          <Button className="bg-terrabit-600 hover:bg-terrabit-700">
            <Map className="mr-2 h-4 w-4" />
            New Map
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Fields</CardTitle>
            <Map className="h-4 w-4 text-terrabit-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-terrabit-400">Active fields</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Area</CardTitle>
            <Ruler className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">450 ha</div>
            <p className="text-xs text-terrabit-400">Mapped area</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Last Updated</CardTitle>
            <Compass className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2h ago</div>
            <p className="text-xs text-terrabit-400">Satellite imagery</p>
          </CardContent>
        </Card>
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Active Layers</CardTitle>
            <Layers className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">5</div>
            <p className="text-xs text-terrabit-400">Visible layers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Field Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex items-center justify-center text-terrabit-400">
              Interactive field map will be displayed here
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">Field List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">North Field</p>
                  <span className="text-xs text-terrabit-400">45 ha</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Crop</span>
                    <span className="text-white">Corn</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Status</span>
                    <span className="text-white">Growing</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Last Survey</span>
                    <span className="text-white">3 days ago</span>
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-terrabit-800/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">South Field</p>
                  <span className="text-xs text-terrabit-400">38 ha</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Crop</span>
                    <span className="text-white">Soybeans</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Status</span>
                    <span className="text-white">Growing</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-terrabit-400">Last Survey</span>
                    <span className="text-white">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 