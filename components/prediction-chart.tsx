"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", predicted: 8400, actual: 8200, fraudRisk: 12 },
  { time: "04:00", predicted: 7200, actual: 7100, fraudRisk: 15 },
  { time: "08:00", predicted: 9800, actual: 9600, fraudRisk: 8 },
  { time: "12:00", predicted: 11200, actual: 11500, fraudRisk: 18 },
  { time: "16:00", predicted: 10800, actual: 10900, fraudRisk: 22 },
  { time: "20:00", predicted: 12400, actual: 12200, fraudRisk: 19 },
]

export default function PredictionChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Predictions vs Actual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis dataKey="time" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="predicted" stroke="#8366d9" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="actual" stroke="#4f46e5" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="fraudRisk" stroke="#dc2626" strokeWidth={2} dot={false} yAxisId="right" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
