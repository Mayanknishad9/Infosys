"use client"

import { useFraudPredictions } from "@/lib/use-fraud-predictions"
import { Cpu, TrendingUp } from "lucide-react"

export default function ModelInfoCard() {
  const { stats, loading } = useFraudPredictions()

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground">Loading model info...</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-semibold">RandomForest Model</p>
            <p className="text-xs text-muted-foreground">10-Tree Ensemble</p>
          </div>
        </div>
        <TrendingUp className="w-5 h-5 text-green-500" />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-secondary rounded">
          <p className="text-muted-foreground">Accuracy</p>
          <p className="font-bold text-blue-400">{stats?.accuracy}%</p>
        </div>
        <div className="p-2 bg-secondary rounded">
          <p className="text-muted-foreground">Precision</p>
          <p className="font-bold text-green-400">{stats?.precision}%</p>
        </div>
        <div className="p-2 bg-secondary rounded">
          <p className="text-muted-foreground">AUC Score</p>
          <p className="font-bold text-purple-400">{stats?.auc}%</p>
        </div>
      </div>
    </div>
  )
}
