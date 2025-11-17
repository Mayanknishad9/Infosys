"use client"

import { Database, TrendingUp, RefreshCw } from "lucide-react"

const dataSources = [
  {
    name: "Production Database",
    status: "connected",
    records: "12.4M",
    icon: Database,
  },
  {
    name: "Historical Archive",
    status: "connected",
    records: "45.2M",
    icon: TrendingUp,
  },
  {
    name: "Real-Time Stream",
    status: "active",
    records: "847K/day",
    icon: RefreshCw,
  },
]

export default function DataSourcesPanel() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Data Sources</h3>

      <div className="space-y-3">
        {dataSources.map((source) => (
          <div key={source.name} className="p-4 bg-secondary rounded-lg">
            <div className="flex items-start gap-3 mb-3">
              <source.icon className="w-5 h-5 text-primary mt-1" />
              <div className="flex-1">
                <p className="font-medium text-sm">{source.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      source.status === "active" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {source.status === "active" ? "Active" : "Connected"}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{source.records}</span> records
            </p>
          </div>
        ))}
      </div>

      {/* Connection Status */}
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-green-400">All sources connected</p>
            <p className="text-xs text-green-400/70">Last sync: 2 minutes ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
