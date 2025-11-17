"use client"

import { useState } from "react"
import { AlertTriangle, AlertCircle, Info, Clock, MapPin, DollarSign, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const alerts = [
  {
    id: "ALERT#001",
    type: "critical",
    title: "Unusual Transaction Pattern Detected",
    description: "Customer CUST#5847 exceeded spending limit by 340% in last 2 hours",
    timestamp: "30 seconds ago",
    details: {
      amount: "$89,240",
      location: "Tokyo, Japan",
      customer: "John Smith",
    },
  },
  {
    id: "ALERT#002",
    type: "critical",
    title: "Multiple Failed Authentication",
    description: "Account CUST#9203 - 7 failed login attempts from 3 different IPs",
    timestamp: "2 minutes ago",
    details: {
      amount: "N/A",
      location: "Unknown IP Blocks",
      customer: "Sarah Johnson",
    },
  },
  {
    id: "ALERT#003",
    type: "warning",
    title: "Risk Signature Match",
    description: 'Transaction matches known fraud merchant signature - "Suspicious Retail LLC"',
    timestamp: "5 minutes ago",
    details: {
      amount: "$5,240",
      location: "Miami, FL",
      customer: "Michael Chen",
    },
  },
  {
    id: "ALERT#004",
    type: "warning",
    title: "Geographic Velocity Anomaly",
    description: "Transaction from New York 2 hours after transaction in Los Angeles",
    timestamp: "12 minutes ago",
    details: {
      amount: "$12,890",
      location: "New York, NY",
      customer: "Emily Davis",
    },
  },
  {
    id: "ALERT#005",
    type: "info",
    title: "Model Accuracy Threshold Reached",
    description: "Predictive model achieved 96.8% accuracy - new record",
    timestamp: "1 hour ago",
    details: {
      amount: "N/A",
      location: "System",
      customer: "N/A",
    },
  },
]

const getAlertConfig = (type: string) => {
  switch (type) {
    case "critical":
      return {
        icon: AlertTriangle,
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        iconColor: "text-red-500",
        badge: "bg-red-500/20 text-red-400",
      }
    case "warning":
      return {
        icon: AlertCircle,
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        iconColor: "text-yellow-500",
        badge: "bg-yellow-500/20 text-yellow-400",
      }
    default:
      return {
        icon: Info,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        iconColor: "text-blue-500",
        badge: "bg-blue-500/20 text-blue-400",
      }
  }
}

export default function RealtimeAlertFeed() {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null)

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Real-Time Alert Feed</h3>
        <span className="text-sm text-muted-foreground px-2 py-1 bg-secondary rounded">Live</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => {
          const config = getAlertConfig(alert.type)
          const Icon = config.icon
          const isExpanded = expandedAlert === alert.id

          return (
            <div
              key={alert.id}
              className={`border rounded-lg transition-all ${config.borderColor} ${
                isExpanded ? config.bgColor : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <div className="p-4 cursor-pointer" onClick={() => setExpandedAlert(isExpanded ? null : alert.id)}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 mt-1 flex-shrink-0 ${config.iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="font-semibold text-sm">{alert.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.id}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${config.badge}`}>
                        {alert.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{alert.description}</p>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Amount</p>
                          <p className="font-medium text-sm">{alert.details.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium text-sm">{alert.details.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Customer</p>
                          <p className="font-medium text-sm">{alert.details.customer}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1">
                        Take Action
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        Suppress
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-4 py-2 bg-secondary/50 text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {alert.timestamp}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
