"use client"

import TransactionTrends from "./transaction-trends"
import VolumeAnalytics from "./volume-analytics"
import ModelAccuracy from "./model-accuracy"
import ChannelDistribution from "./channel-distribution"
import CustomerSegmentation from "./customer-segmentation"
import PredictionMetrics from "./prediction-metrics"

export default function AnalyticsDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TransactionTrends />
        <VolumeAnalytics />
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ModelAccuracy />
        <ChannelDistribution />
        <CustomerSegmentation />
      </div>

      {/* Bottom */}
      <PredictionMetrics />
    </div>
  )
}
