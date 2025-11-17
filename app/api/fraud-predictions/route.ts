import { readFileSync } from "fs"
import { join } from "path"
import { type NextRequest, NextResponse } from "next/server"

let cachedModel: any = null

function loadModel() {
  if (cachedModel) return cachedModel

  try {
    const modelPath = join(process.cwd(), "public", "fraud-model.json")
    const modelData = readFileSync(modelPath, "utf-8")
    cachedModel = JSON.parse(modelData)
    console.log("[v0] Fraud model loaded")
    return cachedModel
  } catch (error) {
    console.error("[v0] Failed to load fraud model:", error)
    throw new Error("Fraud model not available")
  }
}

export async function GET(request: NextRequest) {
  try {
    const model = loadModel()

    // Return model statistics and latest predictions
    return NextResponse.json({
      success: true,
      modelType: model.model.modelType,
      stats: model.model.stats,
      accuracy: model.accuracy,
      totalPredictions: model.predictions.length,
      fraudDetected: model.predictions.filter((p: any) => p.prediction === 1).length,
      predictions: model.predictions.slice(0, 100), // Return first 100 for dashboard
    })
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to retrieve predictions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const model = loadModel()
    const body = await request.json()

    // Return filtered predictions based on query
    let filtered = model.predictions

    if (body.status) {
      filtered = filtered.filter((p: any) => p.status === body.status)
    }

    if (body.fraudOnly) {
      filtered = filtered.filter((p: any) => p.prediction === 1)
    }

    if (body.location) {
      filtered = filtered.filter((p: any) => p.location === body.location)
    }

    return NextResponse.json({
      success: true,
      results: filtered.slice(0, body.limit || 50),
    })
  } catch (error) {
    console.error("[v0] Query error:", error)
    return NextResponse.json({ error: "Query failed" }, { status: 500 })
  }
}
