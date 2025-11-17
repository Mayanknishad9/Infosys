"use client"

import { TrendingUp } from "lucide-react"

export default function ModelAccuracy() {
  const metrics = [
    { label: "Precision", value: "94.2%", trend: "+2.1%" },
    { label: "Recall", value: "91.8%", trend: "+1.5%" },
    { label: "F1 Score", value: "92.9%", trend: "+1.8%" },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Model Performance
      </h3>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{metric.label}</span>
              <span className="text-sm font-semibold text-primary">{metric.value}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="h-2 rounded-full bg-primary" style={{ width: metric.value }} />
            </div>
            <p className="text-xs text-green-400 mt-1">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-xs text-primary font-medium">Model last retrained: 3 days ago</p>
      </div>
    </div>
  )
}
