"use client"

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { hour: "00:00", volume: 4200, avgValue: 850 },
  { hour: "04:00", volume: 3800, avgValue: 920 },
  { hour: "08:00", volume: 6200, avgValue: 1200 },
  { hour: "12:00", volume: 8900, avgValue: 1500 },
  { hour: "16:00", volume: 9800, avgValue: 1300 },
  { hour: "20:00", volume: 8200, avgValue: 1100 },
  { hour: "23:59", volume: 5100, avgValue: 950 },
]

export default function VolumeAnalytics() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Volume & Value</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis dataKey="hour" stroke="#666" />
          <YAxis stroke="#666" />
          <YAxis yAxisId="right" orientation="right" stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="volume" fill="#8366d9" radius={[8, 8, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="avgValue" stroke="#4f46e5" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
