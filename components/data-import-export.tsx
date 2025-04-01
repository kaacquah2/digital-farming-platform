"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { demoMode } from "@/firebase/config"

export function DataImportExport() {
  const [importStatus, setImportStatus] = useState<{ status: "idle" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  })
  const [exportStatus, setExportStatus] = useState<{ status: "idle" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  })
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Function to handle file import
  const handleImport = async () => {
    setIsImporting(true)
    setImportStatus({ status: "idle", message: "" })

    try {
      // If in demo mode, simulate a file picker and import process
      if (demoMode) {
        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setImportStatus({
          status: "success",
          message: "Demo data imported successfully! 3 fields, 2 crop seasons, and 5 prescriptions were imported.",
        })
      } else {
        // Create a file input element
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = ".json, .csv"

        // Handle file selection
        fileInput.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (!file) {
            setImportStatus({ status: "error", message: "No file selected" })
            setIsImporting(false)
            return
          }

          try {
            // Read the file
            const reader = new FileReader()
            reader.onload = async (event) => {
              try {
                // Process the file content
                const content = event.target?.result as string

                // In a real app, you would process the file data here
                // For demo purposes, we'll just simulate success
                await new Promise((resolve) => setTimeout(resolve, 1500))

                setImportStatus({
                  status: "success",
                  message: `File "${file.name}" imported successfully!`,
                })
              } catch (err) {
                setImportStatus({
                  status: "error",
                  message: `Error processing file: ${err.message}`,
                })
              } finally {
                setIsImporting(false)
              }
            }

            reader.onerror = () => {
              setImportStatus({
                status: "error",
                message: "Error reading file",
              })
              setIsImporting(false)
            }

            reader.readAsText(file)
          } catch (err) {
            setImportStatus({
              status: "error",
              message: `Error processing file: ${err.message}`,
            })
            setIsImporting(false)
          }
        }

        // Trigger file selection dialog
        fileInput.click()
      }
    } catch (err) {
      setImportStatus({
        status: "error",
        message: `Error during import: ${err.message}`,
      })
    } finally {
      if (demoMode) {
        setIsImporting(false)
      }
    }
  }

  // Function to handle data export
  const handleExport = async () => {
    setIsExporting(true)
    setExportStatus({ status: "idle", message: "" })

    try {
      // Simulate exporting data
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create sample export data
      const exportData = {
        farms: [
          {
            id: "farm-123",
            name: "Green Valley Farm",
            location: "Midwest, USA",
            size: "150 acres",
            crops: ["Corn", "Soybeans", "Wheat"],
          },
        ],
        fields: [
          {
            id: "field-1",
            name: "North Field",
            size: "45 acres",
            soilType: "Loam",
            cropHistory: [
              { year: 2023, crop: "Corn", yield: "180 bu/acre" },
              { year: 2022, crop: "Soybeans", yield: "55 bu/acre" },
            ],
          },
          {
            id: "field-2",
            name: "South Field",
            size: "65 acres",
            soilType: "Clay Loam",
            cropHistory: [
              { year: 2023, crop: "Wheat", yield: "75 bu/acre" },
              { year: 2022, crop: "Corn", yield: "165 bu/acre" },
            ],
          },
        ],
        prescriptions: [
          {
            id: "rx-123",
            fieldId: "field-1",
            date: "2023-04-15",
            type: "Fertilizer",
            recommendations: [
              { zone: "Zone A", product: "Nitrogen", rate: "180 lbs/acre" },
              { zone: "Zone B", product: "Nitrogen", rate: "150 lbs/acre" },
            ],
          },
        ],
      }

      // Convert to JSON string
      const jsonData = JSON.stringify(exportData, null, 2)

      // Create a blob from the JSON data
      const blob = new Blob([jsonData], { type: "application/json" })

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a link element
      const link = document.createElement("a")
      link.href = url
      link.download = "terrabit-farm-data.json"

      // Append the link to the body
      document.body.appendChild(link)

      // Click the link to trigger the download
      link.click()

      // Remove the link from the body
      document.body.removeChild(link)

      // Revoke the URL
      URL.revokeObjectURL(url)

      setExportStatus({
        status: "success",
        message: "Data exported successfully! File downloaded as terrabit-farm-data.json",
      })
    } catch (err) {
      setExportStatus({
        status: "error",
        message: `Error during export: ${err.message}`,
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-terrabit-800/40 border-terrabit-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-terrabit-100">
              <Upload className="mr-2 h-5 w-5 text-terrabit-400" />
              Import Data
            </CardTitle>
            <CardDescription className="text-terrabit-300">
              Import your field boundaries, soil tests, and yield data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {importStatus.status === "success" && (
              <Alert className="bg-green-900/40 border-green-700">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-300">{importStatus.message}</AlertDescription>
              </Alert>
            )}

            {importStatus.status === "error" && (
              <Alert variant="destructive" className="bg-red-900/40 border-red-700">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-300">{importStatus.message}</AlertDescription>
              </Alert>
            )}

            <div className="text-sm text-terrabit-300">
              <p>Supported file types:</p>
              <ul className="list-disc list-inside mt-1">
                <li>Shapefiles (.shp, .zip)</li>
                <li>CSV files (.csv)</li>
                <li>JSON data (.json)</li>
              </ul>
            </div>

            <Button
              onClick={handleImport}
              className="w-full bg-terrabit-700 hover:bg-terrabit-600 text-white"
              disabled={isImporting}
            >
              {isImporting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Import Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-terrabit-800/40 border-terrabit-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-terrabit-100">
              <Download className="mr-2 h-5 w-5 text-terrabit-400" />
              Export Data
            </CardTitle>
            <CardDescription className="text-terrabit-300">
              Export your field data, prescriptions, and analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {exportStatus.status === "success" && (
              <Alert className="bg-green-900/40 border-green-700">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-300">{exportStatus.message}</AlertDescription>
              </Alert>
            )}

            {exportStatus.status === "error" && (
              <Alert variant="destructive" className="bg-red-900/40 border-red-700">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-300">{exportStatus.message}</AlertDescription>
              </Alert>
            )}

            <div className="text-sm text-terrabit-300">
              <p>Available export formats:</p>
              <ul className="list-disc list-inside mt-1">
                <li>JSON data (.json)</li>
                <li>CSV files (.csv)</li>
                <li>PDF reports (.pdf)</li>
              </ul>
            </div>

            <Button
              onClick={handleExport}
              className="w-full bg-terrabit-700 hover:bg-terrabit-600 text-white"
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <svg
                    className="mr-2 h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-terrabit-800/40 border-terrabit-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-terrabit-100">
            <FileText className="mr-2 h-5 w-5 text-terrabit-400" />
            Data Management Tips
          </CardTitle>
          <CardDescription className="text-terrabit-300">Best practices for managing your farm data</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-terrabit-200">
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 rounded-full bg-terrabit-700 p-1">
                <CheckCircle className="h-3 w-3 text-terrabit-400" />
              </span>
              <span>Regularly export your data as a backup</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 rounded-full bg-terrabit-700 p-1">
                <CheckCircle className="h-3 w-3 text-terrabit-400" />
              </span>
              <span>Organize your field boundaries by season and crop type</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 rounded-full bg-terrabit-700 p-1">
                <CheckCircle className="h-3 w-3 text-terrabit-400" />
              </span>
              <span>Import yield data soon after harvest for best analysis results</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5 rounded-full bg-terrabit-700 p-1">
                <CheckCircle className="h-3 w-3 text-terrabit-400" />
              </span>
              <span>Use consistent naming conventions for fields and seasons</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

