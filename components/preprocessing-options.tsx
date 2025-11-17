"use client"

import { useState } from "react"
import { Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const preprocessingSteps = [
  {
    id: "normalization",
    name: "Data Normalization",
    description: "Standardize transaction values and amounts",
    enabled: true,
  },
  {
    id: "cleaning",
    name: "Data Cleaning",
    description: "Remove duplicates and handle missing values",
    enabled: true,
  },
  {
    id: "tagging",
    name: "Fraud Tagging",
    description: "Tag known fraudulent and legitimate transactions",
    enabled: true,
  },
  {
    id: "feature",
    name: "Feature Engineering",
    description: "Extract behavioral and temporal features",
    enabled: false,
  },
  {
    id: "encoding",
    name: "Encoding",
    description: "Convert categorical data for LLM compatibility",
    enabled: true,
  },
  {
    id: "sampling",
    name: "Stratified Sampling",
    description: "Balance dataset for training",
    enabled: false,
  },
]

export default function PreprocessingOptions() {
  const [steps, setSteps] = useState(preprocessingSteps)

  const toggleStep = (id: string) => {
    setSteps(steps.map((step) => (step.id === id ? { ...step, enabled: !step.enabled } : step)))
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Data Preprocessing</h3>
        </div>
        <span className="text-sm text-muted-foreground">
          {steps.filter((s) => s.enabled).length} / {steps.length} steps enabled
        </span>
      </div>

      <div className="space-y-3 mb-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
            onClick={() => toggleStep(step.id)}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={step.enabled}
                onChange={() => toggleStep(step.id)}
                className="w-4 h-4 accent-primary"
              />
              <div>
                <p className="font-medium text-sm">{step.name}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
        <Zap className="w-4 h-4" />
        Start Processing
      </Button>
    </div>
  )
}
