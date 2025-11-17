"use client"

import Navigation from "@/components/navigation"
import FraudHeader from "@/components/fraud-header"
import FraudDashboard from "@/components/fraud-dashboard"

export default function FraudDetectionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col">
        <FraudHeader />
        <FraudDashboard />
      </div>
    </div>
  )
}
