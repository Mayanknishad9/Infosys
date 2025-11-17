"use client"

import type React from "react"

import { useState } from "react"
import { Upload, File, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadFile {
  name: string
  size: string
  status: "uploading" | "complete" | "error"
  file?: File
}

export default function DataUploadSection() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    processFiles(droppedFiles)
  }

  const processFiles = async (fileList: File[]) => {
    const validFiles = fileList.filter((file) => file.type === "text/csv" || file.name.endsWith(".csv"))

    if (validFiles.length === 0) {
      alert("Please upload CSV files only")
      return
    }

    const newFiles: UploadFile[] = validFiles.map((file) => ({
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      status: "uploading" as const,
      file,
    }))

    setFiles([...files, ...newFiles])
    setIsProcessing(true)

    for (let i = 0; i < newFiles.length; i++) {
      try {
        const formData = new FormData()
        formData.append("file", newFiles[i].file!)

        const response = await fetch("/api/upload-csv", {
          method: "POST",
          body: formData,
        })

        if (response.ok) {
          setFiles((prev) => prev.map((f) => (f.name === newFiles[i].name ? { ...f, status: "complete" } : f)))
        } else {
          setFiles((prev) => prev.map((f) => (f.name === newFiles[i].name ? { ...f, status: "error" } : f)))
        }
      } catch (error) {
        console.error("[v0] Upload error:", error)
        setFiles((prev) => prev.map((f) => (f.name === newFiles[i].name ? { ...f, status: "error" } : f)))
      }
    }

    setIsProcessing(false)
  }

  const handleBrowse = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        processFiles(Array.from(target.files))
      }
    }
    input.click()
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <h3 className="text-lg font-semibold mb-4">Upload Transaction Data</h3>

      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">Drag and drop your CSV here</p>
        <p className="text-muted-foreground mb-4">or click to browse</p>
        <Button variant="outline" onClick={handleBrowse} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Browse Files"}
        </Button>
        <p className="text-xs text-muted-foreground mt-4">Supported formats: CSV only (Max 500MB)</p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="w-4 h-4 text-muted-foreground" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                {file.status === "uploading" && (
                  <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                )}
                {file.status === "complete" && <CheckCircle className="w-5 h-5 text-green-500" />}
                {file.status === "error" && <AlertCircle className="w-5 h-5 text-red-500" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
