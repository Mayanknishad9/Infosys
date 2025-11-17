"use client"

import FraudSuspicionScore from "./fraud-suspicion-score"
import AnomalyDetector from "./anomaly-detector"
import FraudPatterns from "./fraud-patterns"
import RiskSignatures from "./risk-signatures"
import FlaggedTransactions from "./flagged-transactions"

export default function FraudDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Row - Suspicion Score and Anomalies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <FraudSuspicionScore />
        <div className="lg:col-span-2">
          <AnomalyDetector />
        </div>
      </div>

      {/* Middle Row - Patterns and Signatures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <FraudPatterns />
        <RiskSignatures />
      </div>

      {/* Bottom - Flagged Transactions */}
      <FlaggedTransactions />
    </div>
  )
}
