import { writeFileSync, readFileSync } from "fs"
import { join } from "path"

// Training script for fraud detection model
// This script processes the CSV data and builds a model

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split("\t").map((h) => h.trim())
  const data = lines.slice(1).map((line) => {
    const values = line.split("\t")
    const obj = {}
    headers.forEach((header, i) => {
      const value = values[i]?.trim()
      obj[header] = isNaN(value) ? value : Number.parseFloat(value)
    })
    return obj
  })
  return { headers, data }
}

function extractFeatures(transaction) {
  return {
    amount: Math.log(transaction.Transaction_Amount + 1),
    velocity: transaction.Transaction_Velocity || 0,
    distance: transaction.Distance_Between_Transactions_km || 0,
    timeSinceLastTx: transaction.Time_Since_Last_Transaction_min || 0,
    previousTxCount: transaction.Previous_Transaction_Count || 0,
    velocityDistanceInteract: transaction.Velocity_Distance_Interact || 0,
    isFraud: transaction.isFraud || 0,
  }
}

function trainFraudDetectionModel(data) {
  console.log("[v0] Training fraud detection model...")

  const features = data.map(extractFeatures)

  // Calculate statistics for anomaly detection
  const stats = {
    amountMean: features.reduce((a, b) => a + b.amount, 0) / features.length,
    amountStd: Math.sqrt(
      features.reduce(
        (a, b) => a + Math.pow(b.amount - features.reduce((c, d) => c + d.amount, 0) / features.length, 2),
        0,
      ) / features.length,
    ),
    velocityMean: features.reduce((a, b) => a + b.velocity, 0) / features.length,
    distanceMean: features.reduce((a, b) => a + b.distance, 0) / features.length,
    distanceStd: Math.sqrt(
      features.reduce(
        (a, b) => a + Math.pow(b.distance - features.reduce((c, d) => c + d.distance, 0) / features.length, 2),
        0,
      ) / features.length,
    ),
    fraudRate: features.reduce((a, b) => a + b.isFraud, 0) / features.length,
  }

  // Train simple decision tree-like rules
  const rules = {
    highAmountThreshold: stats.amountMean + 2 * stats.amountStd,
    highVelocityThreshold: stats.velocityMean + 1,
    unusualDistanceThreshold: stats.distanceMean + 1.5 * stats.distanceStd,
    lowTimeThreshold: 60, // Less than 1 hour between transactions
  }

  // Calculate feature importance based on correlation with fraud
  const fraudTransactions = features.filter((f) => f.isFraud === 1)
  const legitimateTransactions = features.filter((f) => f.isFraud === 0)

  const featureImportance = {
    amount: Math.abs(
      fraudTransactions.reduce((a, b) => a + b.amount, 0) / fraudTransactions.length -
        legitimateTransactions.reduce((a, b) => a + b.amount, 0) / legitimateTransactions.length,
    ),
    velocity: Math.abs(
      fraudTransactions.reduce((a, b) => a + b.velocity, 0) / fraudTransactions.length -
        legitimateTransactions.reduce((a, b) => a + b.velocity, 0) / legitimateTransactions.length,
    ),
    distance: Math.abs(
      fraudTransactions.reduce((a, b) => a + b.distance, 0) / fraudTransactions.length -
        legitimateTransactions.reduce((a, b) => a + b.distance, 0) / legitimateTransactions.length,
    ),
  }

  return {
    stats,
    rules,
    featureImportance,
    modelType: "hybrid-anomaly-detection",
    trainingDataSize: features.length,
    fraudCount: fraudTransactions.length,
    legitimateCount: legitimateTransactions.length,
  }
}

function predictFraud(transaction, model) {
  const features = extractFeatures(transaction)
  let fraudScore = 0

  // Amount anomaly
  const amountZScore = Math.abs((features.amount - model.stats.amountMean) / (model.stats.amountStd || 1))
  if (amountZScore > 2) fraudScore += 25

  // High velocity
  if (features.velocity > model.rules.highVelocityThreshold) fraudScore += 15

  // Unusual distance
  if (features.distance > model.rules.unusualDistanceThreshold) fraudScore += 20

  // Low time between transactions
  if (features.timeSinceLastTx < model.rules.lowTimeThreshold && features.timeSinceLastTx > 0) {
    fraudScore += 15
  }

  // High interaction feature
  if (features.velocityDistanceInteract > model.stats.amountMean * 50) fraudScore += 15

  return {
    fraudScore: Math.min(100, fraudScore),
    prediction: fraudScore > 50 ? 1 : 0,
    confidence: Math.min(100, fraudScore / 2),
  }
}

// Main execution
try {
  const csvFile = process.argv[2] || "user_read_only_context/text_attachments/pasted-text-3TVwD.txt"
  const csvText = readFileSync(csvFile, "utf-8")

  const { data } = parseCSV(csvText)
  console.log(`[v0] Loaded ${data.length} transactions`)

  const model = trainFraudDetectionModel(data)
  console.log("[v0] Model trained:", {
    stats: model.stats,
    fraudRate: (model.fraudRate * 100).toFixed(2) + "%",
  })

  // Generate predictions for all transactions
  const predictions = data.map((tx, idx) => {
    const pred = predictFraud(tx, model)
    return {
      id: idx,
      amount: tx.Transaction_Amount,
      location: tx.Transaction_Location,
      status: tx.Transaction_Status,
      actualFraud: tx.isFraud,
      ...pred,
    }
  })

  // Save model metadata and predictions
  const modelMetadata = {
    model,
    predictions,
    accuracy: calculateAccuracy(predictions),
    timestamp: new Date().toISOString(),
  }

  writeFileSync(join(process.cwd(), "public", "fraud-model.json"), JSON.stringify(modelMetadata, null, 2))

  console.log("[v0] Model saved to public/fraud-model.json")
  console.log("[v0] Training complete!")
} catch (error) {
  console.error("[v0] Training failed:", error)
  process.exit(1)
}

function calculateAccuracy(predictions) {
  const correct = predictions.filter((p) => p.prediction === p.actualFraud).length
  return ((correct / predictions.length) * 100).toFixed(2)
}
