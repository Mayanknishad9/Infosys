import StatCard from "./stat-card"
import RiskMeter from "./risk-meter"
import TransactionFlow from "./transaction-flow"
import AlertsList from "./alerts-list"
import RiskHeatmap from "./risk-heatmap"
import PredictionChart from "./prediction-chart"

export default function DashboardGrid() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Active Transactions" value="12,847" change="+5.2%" trend="up" color="chart-1" />
        <StatCard label="Fraud Cases" value="23" change="-12.3%" trend="down" color="chart-2" />
        <StatCard label="Risk Score" value="42.5%" change="+2.1%" trend="up" color="chart-3" />
        <StatCard label="Model Accuracy" value="96.8%" change="+0.3%" trend="up" color="chart-5" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PredictionChart />
        </div>
        <div>
          <RiskMeter />
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TransactionFlow />
        <RiskHeatmap />
      </div>

      {/* Alerts */}
      <AlertsList />
    </div>
  )
}
