"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { date: "Mon", successful: 8400, failed: 240, fraudulent: 120 },
  { date: "Tue", successful: 8200, failed: 280, fraudulent: 150 },
  { date: "Wed", successful: 9100, failed: 220, fraudulent: 95 },
  { date: "Thu", successful: 9800, failed: 320, fraudulent: 210 },
  { date: "Fri", successful: 10200, failed: 350, fraudulent: 145 },
  { date: "Sat", successful: 7400, failed: 180, fraudulent: 75 },
  { date: "Sun", successful: 6800, failed: 190, fraudulent: 88 },
]

export default function TransactionTrends() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Transaction Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSuccessful" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorFraudulent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#222" />
          <XAxis dataKey="date" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Area type="monotone" dataKey="successful" stroke="#4f46e5" fillOpacity={1} fill="url(#colorSuccessful)" />
          <Area type="monotone" dataKey="failed" stroke="#f59e0b" fillOpacity={1} fill="url(#colorFailed)" />
          <Area type="monotone" dataKey="fraudulent" stroke="#ef4444" fillOpacity={1} fill="url(#colorFraudulent)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
