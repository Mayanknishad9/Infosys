"use client"

export default function RiskMeter() {
  const riskLevel = 42
  const getRiskColor = (level: number) => {
    if (level < 30) return "text-green-500"
    if (level < 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getRiskBgColor = (level: number) => {
    if (level < 30) return "bg-green-500/20"
    if (level < 60) return "bg-yellow-500/20"
    return "bg-red-500/20"
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${(riskLevel / 100) * 282.7} 282.7`}
              className={`${getRiskColor(riskLevel)} transition-all duration-500`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${getRiskColor(riskLevel)}`}>{riskLevel}%</span>
          </div>
        </div>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${getRiskBgColor(riskLevel)} ${getRiskColor(riskLevel)}`}
        >
          {riskLevel < 30 ? "Low Risk" : riskLevel < 60 ? "Medium Risk" : "High Risk"}
        </span>
      </div>
    </div>
  )
}
