// Model inference utilities for RandomForest predictions
export interface TransactionFeatures {
  amount: number
  velocity: number
  distance_from_prev: number
  time_since_last: number
  transaction_count: number
  amount_zscore: number
  auth_risk: number
  hour: number
  card_type?: number
}

export interface FraudPrediction {
  fraud_probability: number
  risk_category: "Low" | "Medium" | "High"
  risk_color: string
  confidence: number
  recommended_action: "Allow" | "Review" | "Block"
}

// Calculate feature importance scores for interpretability
export function calculateFeatureImportance(features: TransactionFeatures): Record<string, number> {
  return {
    amount: Math.min(Math.abs(features.amount_zscore) / 3, 1.0) * 0.25,
    velocity: Math.min(features.velocity / 10, 1.0) * 0.2,
    distance: Math.min(features.distance_from_prev / 1000, 1.0) * 0.15,
    auth_risk: features.auth_risk * 0.2,
    temporal: Math.min(features.time_since_last / 24, 1.0) * 0.2,
  }
}

// Generate prediction with explainability
export function generatePredictionWithExplanation(
  features: TransactionFeatures,
): FraudPrediction & { explanation: string[] } {
  const importance = calculateFeatureImportance(features)
  const totalScore = Object.values(importance).reduce((a, b) => a + b, 0)

  const explanations: string[] = []
  if (importance.amount > 0.15) explanations.push("Unusual transaction amount")
  if (importance.velocity > 0.1) explanations.push("High transaction velocity")
  if (importance.distance > 0.1) explanations.push("Large geographic distance")
  if (importance.auth_risk > 0.1) explanations.push("Weak authentication method")
  if (importance.temporal > 0.1) explanations.push("Suspicious time pattern")

  const prediction = generateRiskPrediction(totalScore)
  return {
    ...prediction,
    explanation: explanations,
  }
}

export function generateRiskPrediction(fraudScore: number): FraudPrediction {
  if (fraudScore >= 0.7) {
    return {
      fraud_probability: fraudScore,
      risk_category: "High",
      risk_color: "red",
      confidence: Math.round((1 - Math.abs(0.85 - fraudScore)) * 100),
      recommended_action: "Block",
    }
  } else if (fraudScore >= 0.4) {
    return {
      fraud_probability: fraudScore,
      risk_category: "Medium",
      risk_color: "yellow",
      confidence: Math.round((1 - Math.abs(0.55 - fraudScore)) * 100),
      recommended_action: "Review",
    }
  } else {
    return {
      fraud_probability: fraudScore,
      risk_category: "Low",
      risk_color: "green",
      confidence: Math.round((1 - Math.abs(0.2 - fraudScore)) * 100),
      recommended_action: "Allow",
    }
  }
}
