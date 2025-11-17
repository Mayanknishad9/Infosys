"use client"

import AlertsOverview from "./alerts-overview"
import RealtimeAlertFeed from "./realtime-alert-feed"
import AlertRulesConfiguration from "./alert-rules-configuration"
import NotificationChannels from "./notification-channels"

export default function AlertsCenter() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <AlertsOverview />
        <NotificationChannels />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RealtimeAlertFeed />
        </div>
        <div>
          <AlertRulesConfiguration />
        </div>
      </div>
    </div>
  )
}
