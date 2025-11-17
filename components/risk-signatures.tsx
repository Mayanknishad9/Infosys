"use client"

import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

const signatures = [
  { name: "Known Fraud IP", status: "matched", confidence: 92 },
  { name: "Card Testing Pattern", status: "matched", confidence: 87 },
  { name: "Account Takeover", status: "not_matched", confidence: 5 },
  { name: "Money Mule Network", status: "suspicious", confidence: 34 },
  { name: "Chargeback History", status: "matched", confidence: 78 },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "matched":
      return XCircle
    case "suspicious":
      return AlertCircle
    default:
      return CheckCircle
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "matched":
      return "text-red-500 bg-red-500/10"
    case "suspicious":
      return "text-yellow-500 bg-yellow-500/10"
    default:
      return "text-green-500 bg-green-500/10"
  }
}

export default function RiskSignatures() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Risk Signatures</h3>
      <div className="space-y-3">
        {signatures.map((sig) => {
          const Icon = getStatusIcon(sig.status)
          const colors = getStatusColor(sig.status)

          return (
            <div key={sig.name} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3 flex-1">
                <Icon className={`w-5 h-5 ${colors}`} />
                <div>
                  <p className="text-sm font-medium">{sig.name}</p>
                  <div className="w-24 bg-muted rounded-full h-1 mt-1">
                    <div
                      className={`h-1 rounded-full ${colors.split(" ")[0]}`}
                      style={{ width: `${sig.confidence}%` }}
                    />
                  </div>
                </div>
              </div>
              <span className={`text-sm font-semibold ${colors}`}>{sig.confidence}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
