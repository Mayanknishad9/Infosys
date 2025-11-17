"use client"

import Navigation from "@/components/navigation"
import AnalyticsHeader from "@/components/analytics-header"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col">
        <AnalyticsHeader />
        <AnalyticsDashboard />
      </div>
    </div>
  )
}
