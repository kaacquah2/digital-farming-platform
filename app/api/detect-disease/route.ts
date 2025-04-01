import { NextResponse } from "next/server"
import { spawn } from "child_process"
import { writeFile } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"
import { unlink } from "fs/promises"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400 }
      )
    }

    // Create a temporary file to store the uploaded image
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tempPath = join(tmpdir(), `disease-${Date.now()}.jpg`)
    await writeFile(tempPath, buffer)

    // Run the Python script
    const result = await new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        "scripts/detect_disease.py",
        tempPath
      ])

      let output = ""

      pythonProcess.stdout.on("data", (data) => {
        output += data.toString()
      })

      pythonProcess.stderr.on("data", (data) => {
        console.error(`Python Error: ${data}`)
        reject(new Error("Failed to process image"))
      })

      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}`))
          return
        }

        try {
          const result = JSON.parse(output)
          resolve(result)
        } catch (error) {
          reject(new Error("Failed to parse Python output"))
        }
      })
    })

    // Clean up the temporary file
    await unlink(tempPath)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Disease detection error:", error)
    return NextResponse.json(
      { error: "Failed to detect disease" },
      { status: 500 }
    )
  }
} 