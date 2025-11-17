"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useFraudPredictions } from "@/lib/use-fraud-predictions"

export default function AnomalyDetector() {
  const { predictions, loading } = useFraudPredictions()

  const data = loading
    ? []
    : [
        {
          name: "Amount",
          anomalyScore: Math.round(
            (predictions.filter((p) => Number.parseFloat(p.amount) > 50000000).length / predictions.length) * 100,
          ),
        },
        {
          name: "Velocity",
          anomalyScore: Math.round((predictions.filter((p) => p.velocity > 5).length / predictions.length) * 100),
        },
        {
          name: "Distance",
          anomalyScore: Math.round((predictions.filter((p) => p.distance > 3000).length / predictions.length) * 100),
        },
        {
          name: "Time Gap",
          anomalyScore: Math.round(
            (predictions.filter((p) => p.timeSinceLastTx < 60 && p.timeSinceLastTx > 0).length / predictions.length) *
              100,
          ),
        },
        {
          name: "Location",
          anomalyScore: Math.round((predictions.filter((p) => p.prediction === 1).length / predictions.length) * 100),
        },
        {
          name: "Interaction",
          anomalyScore: Math.round(
            (predictions.filter((p) => p.velocityDistanceInteract > 50000).length / predictions.length) * 100,
          ),
        },
      ]

  const maxAnomaly = Math.max(...data.map((d) => d.anomalyScore))
  const highestAnomalyName = data.find((d) => d.anomalyScore === maxAnomaly)?.name || "Unknown"

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Anomaly Detection Score</h3>
      {loading ? (
        <p className="text-muted-foreground">Loading anomaly analysis...</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="anomalyScore" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400">
              <span className="font-semibold">High anomaly in {highestAnomalyName.toLowerCase()}</span> - Detected in{" "}
              {maxAnomaly}% of transactions
            </p>
          </div>
        </>
      )}
    </div>
  )
}
