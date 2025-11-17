"use client"

import { AlertTriangle } from "lucide-react"
import { useFraudPredictions } from "@/lib/use-fraud-predictions"

export default function FraudSuspicionScore() {
  const { predictions, stats, loading } = useFraudPredictions()

  const avgFraudProb = loading
    ? 0
    : Math.round(
        (predictions.reduce((sum, p) => sum + (p.fraud_probability || 0), 0) / Math.max(predictions.length, 1)) * 100,
      )

  const getRiskColor = (prob: number) => {
    if (prob < 33) return { bg: "bg-green-500/20", text: "text-green-400", label: "Low Risk" }
    if (prob < 66) return { bg: "bg-yellow-500/20", text: "text-yellow-400", label: "Medium Risk" }
    return { bg: "bg-red-500/20", text: "text-red-400", label: "High Risk" }
  }

  const colors = getRiskColor(avgFraudProb)
  const highRiskCount = stats?.high_risk || 0
  const totalTxns = stats?.total || Math.max(predictions.length, 1)
  const riskPercentage = ((highRiskCount / totalTxns) * 100).toFixed(1)

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        Fraud Probability & Risk
      </h3>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(avgFraudProb / 100) * 282.7} 282.7`}
              className={`${colors.text} transition-all duration-500`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${colors.text}`}>{avgFraudProb}%</span>
          </div>
        </div>

        <p className={`text-sm font-medium px-4 py-2 rounded-full ${colors.bg} ${colors.text} text-center`}>
          {colors.label}
        </p>

        <div className="mt-6 w-full pt-6 border-t border-border space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">High Risk Count</span>
            <span className="font-medium text-red-400">{highRiskCount}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">High Risk Rate</span>
            <span className="font-medium">{riskPercentage}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Model AUC Score</span>
            <span className="font-medium text-blue-400">{stats?.auc}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
