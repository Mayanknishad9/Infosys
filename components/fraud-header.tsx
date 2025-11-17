"use client"

import { Shield, Activity } from "lucide-react"

export default function FraudHeader() {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-destructive" />
              <h1 className="text-3xl font-bold text-foreground">Fraud Detection Engine</h1>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              <p className="text-muted-foreground">Real-time analysis in progress</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-destructive">23</p>
            <p className="text-sm text-muted-foreground">Fraud cases today</p>
          </div>
        </div>
      </div>
    </div>
  )
}
