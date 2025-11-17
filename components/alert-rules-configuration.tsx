"use client"

import { useState } from "react"
import { Settings, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const defaultRules = [
  {
    id: "rule1",
    name: "High-Value Transaction",
    condition: "Amount > $50,000",
    enabled: true,
  },
  {
    id: "rule2",
    name: "Geographic Velocity",
    condition: "Distance > 500mi in 2hrs",
    enabled: true,
  },
  {
    id: "rule3",
    name: "Multiple Failed Auth",
    condition: "5+ failures in 1hr",
    enabled: true,
  },
  {
    id: "rule4",
    name: "New Device Alert",
    condition: "Unknown device detected",
    enabled: false,
  },
]

export default function AlertRulesConfiguration() {
  const [rules, setRules] = useState(defaultRules)

  const toggleRule = (id: string) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const deleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id))
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary" />
        Alert Rules
      </h3>

      <div className="space-y-2 mb-4">
        {rules.map((rule) => (
          <div key={rule.id} className="p-3 bg-secondary rounded-lg">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={rule.enabled}
                onChange={() => toggleRule(rule.id)}
                className="w-4 h-4 mt-1 accent-primary cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{rule.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{rule.condition}</p>
              </div>
              <button
                onClick={() => deleteRule(rule.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full gap-2 bg-primary/20 text-primary hover:bg-primary/30">
        <Plus className="w-4 h-4" />
        Add New Rule
      </Button>

      <div className="mt-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-xs text-primary font-medium">
          <span className="font-semibold">
            {rules.filter((r) => r.enabled).length}/{rules.length}
          </span>{" "}
          rules active
        </p>
      </div>
    </div>
  )
}
