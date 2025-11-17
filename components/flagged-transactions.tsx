"use client"

import { AlertTriangle, Clock, MapPin, DollarSign, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFraudPredictions } from "@/lib/use-fraud-predictions"

export default function FlaggedTransactions() {
  const { predictions, loading } = useFraudPredictions()

  const flaggedTxns = predictions
    .filter((p) => p.risk_category === "High" || p.risk_category === "Medium")
    .slice(0, 10)
    .map((txn, idx) => ({
      id: txn.transaction_id,
      customerId: `CUST#${5847 + idx}`,
      amount: `$${(txn.amount / 1000).toFixed(1)}K`,
      location: txn.location || "Unknown",
      timestamp: txn.timestamp || `${Math.floor(Math.random() * 60)} mins ago`,
      reason: txn.risk_category === "High" ? "High fraud probability detected" : "Medium risk pattern observed",
      severity: txn.risk_category === "High" ? "critical" : "high",
      fraudProb: (txn.fraud_probability * 100).toFixed(1),
      confidence: txn.confidence || 0,
      action: txn.recommended_action || "Review",
      riskColor: txn.risk_color || "red",
    }))

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Flagged Transactions
        </h3>
        <p className="text-muted-foreground">Loading predictions...</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Flagged Transactions (Risk-Based)
        </h3>
        <span className="text-sm text-muted-foreground">{flaggedTxns.length} flagged</span>
      </div>

      <div className="space-y-3">
        {flaggedTxns.map((txn) => (
          <div key={txn.id} className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-sm">
                  {txn.id} • {txn.customerId}
                </p>
                <p className="text-xs text-muted-foreground mt-1 max-w-lg">{txn.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    txn.riskColor === "red"
                      ? "bg-red-500/20 text-red-400"
                      : txn.riskColor === "yellow"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {txn.fraudProb}%
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                    txn.severity === "critical" ? "bg-red-500/20 text-red-400" : "bg-orange-500/20 text-orange-400"
                  }`}
                >
                  <Shield className="w-3 h-3" />
                  {txn.action}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm mb-4 pb-4 border-b border-border">
              <div className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="w-4 h-4" />
                {txn.amount}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {txn.location}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground ml-auto">
                <Clock className="w-4 h-4" />
                {txn.timestamp}
              </div>
              <div className="text-muted-foreground text-xs">Confidence: {txn.confidence}%</div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className={`flex-1 ${
                  txn.action === "Block"
                    ? "bg-red-600 hover:bg-red-700"
                    : txn.action === "Review"
                      ? "bg-yellow-600 hover:bg-yellow-700"
                      : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {txn.action === "Block" ? "Block & Review" : txn.action === "Review" ? "Review Transaction" : "Allow"}
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                {txn.action === "Block" ? "Override" : "Whitelist"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
