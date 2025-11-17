"use client"

import Navigation from "@/components/navigation"
import DataHeader from "@/components/data-header"
import DataUploadSection from "@/components/data-upload-section"
import DataSourcesPanel from "@/components/data-sources-panel"
import PreprocessingOptions from "@/components/preprocessing-options"

export default function DataPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex flex-col">
        <DataHeader />
        <div className="max-w-7xl mx-auto w-full px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Upload and Processing */}
            <div className="lg:col-span-2 space-y-6">
              <DataUploadSection />
              <PreprocessingOptions />
            </div>

            {/* Right Column - Data Sources */}
            <div>
              <DataSourcesPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
