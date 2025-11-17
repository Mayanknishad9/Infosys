"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

const data = [
  { subject: "Velocity", A: 65 },
  { subject: "Amount", A: 42 },
  { subject: "Frequency", A: 78 },
  { subject: "Location Jump", A: 55 },
  { subject: "Device Switch", A: 72 },
  { subject: "Time Deviation", A: 48 },
]

export default function FraudPatterns() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Behavioral Pattern Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" stroke="#666" />
          <PolarRadiusAxis stroke="#666" />
          <Radar name="Fraud Indicators" dataKey="A" stroke="#8366d9" fill="#8366d9" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
