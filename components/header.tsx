"use client"

import { Clock, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Real-Time Fraud Detection</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Live monitoring active • Last updated 2 minutes ago
            </p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  )
}
