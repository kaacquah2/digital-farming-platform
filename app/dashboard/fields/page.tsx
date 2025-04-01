"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function FieldsPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Fields</h1>
        <Button className="bg-terrabit-600 hover:bg-terrabit-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Field
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">North Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-terrabit-400">Size</span>
                <span className="text-white">50 acres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terrabit-400">Crop</span>
                <span className="text-white">Wheat</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terrabit-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">South Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-terrabit-400">Size</span>
                <span className="text-white">75 acres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terrabit-400">Crop</span>
                <span className="text-white">Corn</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terrabit-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-terrabit-900 border-terrabit-800">
          <CardHeader>
            <CardTitle className="text-white">East Field</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-terrabit-400">Size</span>
                <span className="text-white">30 acres</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terrabit-400">Crop</span>
                <span className="text-white">Soybeans</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terrabit-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 