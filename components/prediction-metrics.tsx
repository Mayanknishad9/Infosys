"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useFraudPredictions } from "@/lib/use-fraud-predictions"

export default function PredictionMetrics() {
  const { stats, loading } = useFraudPredictions()

  const metricsData = [
    { metric: "Precision", value: Number.parseFloat(stats?.precision || 0) },
    { metric: "Recall", value: Number.parseFloat(stats?.recall || 0) },
    { metric: "Accuracy", value: Number.parseFloat(stats?.accuracy || 0) },
    { metric: "F1 Score", value: Number.parseFloat(stats?.f1_score || 0) },
    { metric: "AUC", value: Number.parseFloat(stats?.auc || 0) },
  ]

  const confusionMatrix = stats?.confusion_matrix || { tp: 0, tn: 0, fp: 0, fn: 0 }
  const totalPredictions = confusionMatrix.tp + confusionMatrix.tn + confusionMatrix.fp + confusionMatrix.fn || 1
  const correctPredictions = confusionMatrix.tp + confusionMatrix.tn

  if (loading) {
    return <div className="bg-card border border-border rounded-lg p-6">Loading metrics...</div>
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">RandomForest Model Metrics</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={metricsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis dataKey="metric" stroke="#666" />
          <YAxis stroke="#666" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
            formatter={(value) => `${value.toFixed(2)}%`}
          />
          <Bar dataKey="value" fill="#8366d9" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground">Total Predictions</p>
          <p className="text-lg font-bold text-blue-400">{totalPredictions}</p>
        </div>
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground">Correct Predictions</p>
          <p className="text-lg font-bold text-green-400">{correctPredictions}</p>
        </div>
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground">Confusion Matrix</p>
          <p className="text-xs text-muted-foreground mt-1">
            TP: {confusionMatrix.tp} | TN: {confusionMatrix.tn}
          </p>
          <p className="text-xs text-muted-foreground">
            FP: {confusionMatrix.fp} | FN: {confusionMatrix.fn}
          </p>
        </div>
        <div className="p-3 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground">Model Confidence</p>
          <p className="text-lg font-bold text-purple-400">{Number.parseFloat(stats?.accuracy || 0).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}
