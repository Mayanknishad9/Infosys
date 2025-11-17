"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Activity } from "lucide-react"

export default function APIConnectionStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking")
  const [apiUrl, setApiUrl] = useState("http://localhost:8000")

  useEffect(() => {
    async function checkAPI() {
      try {
        const response = await fetch(`${apiUrl}/api/health`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        if (response.ok) {
          console.log("[v0] FastAPI server is healthy")
          setStatus("connected")
        } else {
          setStatus("disconnected")
        }
      } catch (error) {
        console.error("[v0] API connection failed:", error)
        setStatus("disconnected")
      }
    }

    checkAPI()
    const interval = setInterval(checkAPI, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [apiUrl])

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {status === "checking" && (
            <>
              <Activity className="w-5 h-5 text-yellow-500 animate-spin" />
              <div>
                <p className="text-sm font-semibold">Checking Connection</p>
                <p className="text-xs text-muted-foreground">{apiUrl}</p>
              </div>
            </>
          )}
          {status === "connected" && (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-semibold text-green-400">FastAPI Connected</p>
                <p className="text-xs text-muted-foreground">{apiUrl}</p>
              </div>
            </>
          )}
          {status === "disconnected" && (
            <>
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-red-400">API Disconnected</p>
                <p className="text-xs text-muted-foreground">Run: python scripts/fastapi_server.py</p>
              </div>
            </>
          )}
        </div>
        <div
          className={`w-3 h-3 rounded-full ${
            status === "connected" ? "bg-green-500" : status === "disconnected" ? "bg-red-500" : "bg-yellow-500"
          }`}
        />
      </div>
    </div>
  )
}
