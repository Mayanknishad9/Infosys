"use client"

import { BarChart3, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalyticsHeader() {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Transaction Analytics</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Last 7 Days
            </Button>
            <Button size="sm">Generate Report</Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Comprehensive analysis of transaction patterns, trends, and predictive metrics
        </p>
      </div>
    </div>
  )
}
