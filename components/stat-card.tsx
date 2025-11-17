import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  change: string
  trend: "up" | "down"
  color: string
}

export default function StatCard({ label, value, change, trend, color }: StatCardProps) {
  const isPositive = trend === "up"
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-muted-foreground text-sm mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
          <p className={`text-sm flex items-center gap-1 ${isPositive ? "text-chart-2" : "text-chart-4"}`}>
            <TrendIcon className="w-3 h-3" />
            {change}
          </p>
        </div>
        <div className={`w-12 h-12 bg-${color}/10 rounded-lg`} />
      </div>
    </div>
  )
}
