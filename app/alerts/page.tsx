"use client"

import Navigation from "@/components/navigation"
import AlertsHeader from "@/components/alerts-header"
import AlertsCenter from "@/components/alerts-center"

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col">
        <AlertsHeader />
        <AlertsCenter />
      </div>
    </div>
  )
}
