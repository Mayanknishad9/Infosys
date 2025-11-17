"use client"

import { useEffect, useState } from "react"

export function useFraudPredictions() {
  const [predictions, setPredictions] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPredictions() {
      try {
        setLoading(true)

        // Fetch model metrics from FastAPI
        const metricsResponse = await fetch("http://localhost:8000/api/model-metrics")
        const metricsData = await metricsResponse.json()

        // Generate sample batch predictions for dashboard
        const sampleTransactions = Array.from({ length: 50 }, (_, i) => ({
          transaction_id: `TXN#${5000 + i}`,
          amount: Math.random() * 10000,
          velocity: Math.random() * 10,
          distance_from_prev: Math.random() * 1000,
          time_since_last: Math.random() * 24,
          transaction_count: Math.floor(Math.random() * 100),
          amount_zscore: (Math.random() - 0.5) * 4,
          auth_risk: Math.random() > 0.7 ? 1 : 0,
          hour: Math.floor(Math.random() * 24),
          card_type: Math.random() > 0.5 ? 1 : 0,
        }))

        const batchResponse = await fetch("http://localhost:8000/api/predict-batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactions: sampleTransactions }),
        })

        if (!batchResponse.ok) throw new Error("Failed to fetch predictions")

        const batchData = await batchResponse.json()

        // Transform predictions to include risk metadata
        const transformedPredictions = sampleTransactions.map((txn, idx) => {
          const pred = batchData.batch_predictions[idx]?.prediction || {}
          return {
            transaction_id: txn.transaction_id,
            amount: txn.amount,
            fraud_probability: pred.fraud_probability || 0,
            risk_category: pred.risk_category || "Low",
            risk_color: pred.risk_color || "green",
            confidence: pred.confidence || 0,
            recommended_action: pred.recommended_action || "Allow",
            location: ["Tashkent", "Bukhara", "Samarkand"][Math.floor(Math.random() * 3)],
            timestamp: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
          }
        })

        setPredictions(transformedPredictions)
        setStats({
          accuracy: (metricsData.metrics.accuracy * 100).toFixed(2),
          precision: (metricsData.metrics.precision * 100).toFixed(2),
          recall: (metricsData.metrics.recall * 100).toFixed(2),
          f1_score: (metricsData.metrics.f1_score * 100).toFixed(2),
          auc: (metricsData.metrics.auc * 100).toFixed(2),
          confusion_matrix: metricsData.metrics.confusion_matrix,
          high_risk: batchData.high_risk_count || 0,
          medium_risk: batchData.medium_risk_count || 0,
          low_risk: batchData.low_risk_count || 0,
          total: batchData.total || 0,
        })
        setError(null)
      } catch (err) {
        console.error("[v0] Fetch error:", err)
        setError(err instanceof Error ? err.message : "Unknown error")

        // Fallback mock data if API unavailable
        setPredictions([
          {
            transaction_id: "TXN#5000",
            fraud_probability: 0.75,
            risk_category: "High",
            risk_color: "red",
            confidence: 92,
            recommended_action: "Block",
          },
          {
            transaction_id: "TXN#5001",
            fraud_probability: 0.45,
            risk_category: "Medium",
            risk_color: "yellow",
            confidence: 85,
            recommended_action: "Review",
          },
          {
            transaction_id: "TXN#5002",
            fraud_probability: 0.15,
            risk_category: "Low",
            risk_color: "green",
            confidence: 88,
            recommended_action: "Allow",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  return { predictions, stats, loading, error }
}
