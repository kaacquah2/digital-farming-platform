import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { spawn } from 'child_process'
import { unlink } from 'fs/promises'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'uploads')
    const fileName = `${uuidv4()}-${file.name}`
    const filePath = join(uploadsDir, fileName)
    
    // Save the file
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()))

    // Run Python script for prediction
    const prediction = await new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['ai_model.py', filePath])
      
      let result = ''
      let error = ''

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString()
      })

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString()
      })

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Python process exited with code ${code}: ${error}`))
        } else {
          try {
            resolve(JSON.parse(result))
          } catch (e) {
            reject(new Error('Failed to parse prediction result'))
          }
        }
      })
    })

    // Clean up the uploaded file
    await unlink(filePath)

    return NextResponse.json({ prediction })
  } catch (error) {
    console.error('Error processing prediction:', error)
    return NextResponse.json(
      { 
        error: 'Error processing prediction',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 