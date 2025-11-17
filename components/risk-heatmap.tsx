"use client"

export default function RiskHeatmap() {
  const regions = [
    { name: "North America", risk: 35, transactions: 4250 },
    { name: "Europe", risk: 28, transactions: 2840 },
    { name: "Asia Pacific", risk: 52, transactions: 3120 },
    { name: "South America", risk: 41, transactions: 1637 },
  ]

  const getRiskBgColor = (risk: number) => {
    if (risk < 30) return "bg-green-500/30"
    if (risk < 45) return "bg-yellow-500/30"
    return "bg-red-500/30"
  }

  const getRiskTextColor = (risk: number) => {
    if (risk < 30) return "text-green-400"
    if (risk < 45) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Regional Risk Analysis</h3>
      <div className="space-y-3">
        {regions.map((region) => (
          <div key={region.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{region.name}</span>
              <span className={`text-sm font-semibold ${getRiskTextColor(region.risk)}`}>{region.risk}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getRiskBgColor(region.risk)}`}
                style={{ width: `${region.risk}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{region.transactions.toLocaleString()} transactions</p>
          </div>
        ))}
      </div>
    </div>
  )
}
