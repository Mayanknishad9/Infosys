import Navigation from "@/components/navigation"
import Header from "@/components/header"
import DashboardGrid from "@/components/dashboard-grid"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col">
        <Header />
        <DashboardGrid />
      </div>
    </div>
  )
}
