import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file is CSV
    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ error: "Only CSV files are allowed" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create directory if it doesn't exist
    const uploadDir = join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    // Save file
    const filePath = join(uploadDir, file.name)
    await writeFile(filePath, buffer)

    // Parse CSV to get preview data
    const csvText = buffer.toString("utf-8")
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim())
    const rowCount = lines.length - 1

    console.log("[v0] CSV uploaded:", file.name, "Rows:", rowCount, "Columns:", headers.length)

    return NextResponse.json({
      success: true,
      filename: file.name,
      rows: rowCount,
      columns: headers,
    })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
