"use client"

import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AlertsHeader() {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Alert Center</h1>
            </div>
            <p className="text-muted-foreground">Real-time notifications for fraud cases, risks, and system events</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Settings className="w-4 h-4" />
              Alert Rules
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
