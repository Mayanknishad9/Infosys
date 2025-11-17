"use client"

import { Users } from "lucide-react"

const segments = [
  { name: "High-Value", customers: "2,847", transactions: "48.2%" },
  { name: "Regular", customers: "8,932", transactions: "35.6%" },
  { name: "At-Risk", customers: "1,240", transactions: "12.1%" },
  { name: "Inactive", customers: "4,156", transactions: "4.1%" },
]

export default function CustomerSegmentation() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Customer Segments
      </h3>

      <div className="space-y-3">
        {segments.map((segment) => (
          <div key={segment.name} className="p-3 bg-secondary rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">{segment.name}</span>
              <span className="text-xs text-muted-foreground">{segment.customers}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="h-2 rounded-full bg-primary" style={{ width: segment.transactions }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{segment.transactions} of transactions</p>
          </div>
        ))}
      </div>
    </div>
  )
}
