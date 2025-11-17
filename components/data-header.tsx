"use client"

import { Database, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DataHeader() {
  return (
    <div className="border-b border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Data Management</h1>
            </div>
            <p className="text-muted-foreground">
              Collect, preprocess, and normalize transaction data for model training
            </p>
          </div>
          <Button className="gap-2">
            <FileUp className="w-4 h-4" />
            Import CSV
          </Button>
        </div>
      </div>
    </div>
  )
}
