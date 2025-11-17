"use client"

import { Mail, MessageSquare, Phone, Slack } from "lucide-react"
import { Button } from "@/components/ui/button"

const channels = [
  { icon: Mail, label: "Email", enabled: true, recipients: "3" },
  { icon: Phone, label: "SMS", enabled: true, recipients: "2" },
  { icon: Slack, label: "Slack", enabled: true, channel: "#fraud-alerts" },
  { icon: MessageSquare, label: "Webhook", enabled: false, recipients: "0" },
]

export default function NotificationChannels() {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Notification Channels</h3>

      <div className="space-y-3">
        {channels.map((channel) => {
          const Icon = channel.icon
          return (
            <div key={channel.label} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${channel.enabled ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <p className="font-medium text-sm">{channel.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {channel.enabled ? (
                      <>{("recipients" in channel ? channel.recipients : channel.channel) || "Active"}</>
                    ) : (
                      "Disabled"
                    )}
                  </p>
                </div>
              </div>
              <div className={`w-2 h-2 rounded-full ${channel.enabled ? "bg-green-500" : "bg-muted-foreground"}`} />
            </div>
          )
        })}
      </div>

      <Button variant="outline" className="w-full mt-4 bg-transparent">
        Configure Channels
      </Button>
    </div>
  )
}
