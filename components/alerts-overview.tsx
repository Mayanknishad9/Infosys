"use client"

import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react"

const alertStats = [
  {
    label: "Critical",
    count: "12",
    icon: AlertTriangle,
    color: "text-red-500 bg-red-500/10",
  },
  {
    label: "Warnings",
    count: "34",
    icon: AlertCircle,
    color: "text-yellow-500 bg-yellow-500/10",
  },
  {
    label: "Resolved",
    count: "187",
    icon: CheckCircle2,
    color: "text-green-500 bg-green-500/10",
  },
]

export default function AlertsOverview() {
  return (
    <div className="lg:col-span-2 grid grid-cols-3 gap-4">
      {alertStats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
          <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-muted-foreground text-sm">{stat.label}</p>
          <p className="text-2xl font-bold mt-1">{stat.count}</p>
        </div>
      ))}
    </div>
  )
}
