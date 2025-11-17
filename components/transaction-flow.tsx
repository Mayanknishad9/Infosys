"use client"

import { ArrowRight } from "lucide-react"

const transactions = [
  { id: "TXN001", amount: "$5,240", from: "NYC", to: "LAX", risk: "Low", status: "Complete" },
  { id: "TXN002", amount: "$12,890", from: "Chicago", to: "Miami", risk: "Medium", status: "Pending" },
  { id: "TXN003", amount: "$8,450", from: "Boston", to: "Denver", risk: "High", status: "Flagged" },
  { id: "TXN004", amount: "$3,120", from: "Seattle", to: "Austin", risk: "Low", status: "Complete" },
  { id: "TXN005", amount: "$15,670", from: "Phoenix", to: "Portland", risk: "Medium", status: "Pending" },
]

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "text-green-500 bg-green-500/10"
    case "Medium":
      return "text-yellow-500 bg-yellow-500/10"
    case "High":
      return "text-red-500 bg-red-500/10"
    default:
      return "text-gray-500 bg-gray-500/10"
  }
}

export default function TransactionFlow() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-sm">{tx.id}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <span>{tx.from}</span>
                <ArrowRight className="w-3 h-3" />
                <span>{tx.to}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm">{tx.amount}</p>
              <p className={`text-xs font-medium mt-1 px-2 py-1 rounded ${getRiskColor(tx.risk)}`}>{tx.risk}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
