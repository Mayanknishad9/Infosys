"use client"

import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react"

const alerts = [
  {
    id: 1,
    type: "Critical",
    title: "Unusual Transaction Pattern Detected",
    description: "Customer #5847 exceeded spending limit by 340%",
    time: "2 minutes ago",
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: "Warning",
    title: "Multiple Failed Authentication Attempts",
    description: "Account #9203 - 5 failed attempts from unknown IP",
    time: "15 minutes ago",
    icon: AlertCircle,
  },
  {
    id: 3,
    type: "Info",
    title: "Model Accuracy Improved",
    description: "Predictive model accuracy increased to 96.8%",
    time: "1 hour ago",
    icon: CheckCircle,
  },
]

const getAlertStyles = (type: string) => {
  switch (type) {
    case "Critical":
      return "bg-red-500/10 border-red-500/30"
    case "Warning":
      return "bg-yellow-500/10 border-yellow-500/30"
    case "Info":
      return "bg-green-500/10 border-green-500/30"
    default:
      return "bg-blue-500/10 border-blue-500/30"
  }
}

const getIconColor = (type: string) => {
  switch (type) {
    case "Critical":
      return "text-red-500"
    case "Warning":
      return "text-yellow-500"
    case "Info":
      return "text-green-500"
    default:
      return "text-blue-500"
  }
}

export default function AlertsList() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-lg border ${getAlertStyles(alert.type)}`}>
            <alert.icon className={`w-5 h-5 mt-1 flex-shrink-0 ${getIconColor(alert.type)}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold text-sm">{alert.title}</p>
                <span className={`text-xs font-medium px-2 py-1 rounded ${getIconColor(alert.type)}`}>
                  {alert.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
              <p className="text-xs text-muted-foreground">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
