"use client"

import { Shield, BarChart3, AlertCircle, Home, Wrench } from "lucide-react"
import Link from "next/link"

export default function Navigation() {
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: AlertCircle, label: "Alerts", href: "/alerts" },
    { icon: Shield, label: "Fraud Detection", href: "/fraud-detection" },
    { icon: Wrench, label: "Setup", href: "/setup" },
  ]

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-8 overflow-x-auto">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Predictive Transaction Intelligence</span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap text-muted-foreground hover:text-foreground hover:bg-secondary`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
