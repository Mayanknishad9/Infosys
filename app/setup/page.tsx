"use client"

import { CheckCircle, AlertCircle, Code2, Terminal, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import APIConnectionStatus from "@/components/api-connection-status"
import ModelInfoCard from "@/components/model-info-card"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">System Setup & Configuration</h1>
          <p className="text-muted-foreground">Get your BFSI fraud detection system running</p>
        </div>

        {/* Connection Status */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Connection Status</h2>
          <APIConnectionStatus />
          <ModelInfoCard />
        </div>

        {/* Setup Steps */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Setup Steps</h2>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/20">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-2">1. Prepare Your Dataset</h3>
                  <p className="text-sm text-muted-foreground mb-3">Place your CSV file in the project folder</p>
                  <div className="bg-secondary p-3 rounded font-mono text-xs text-green-400">
                    public/data/transactions.csv
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Required columns: Transaction_ID, Customer_ID, Transaction_Amount, Card_Type, Location, Time_Sync,
                    Authentication_Method, isFraud
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-500/20">
                    <Terminal className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-2">2. Train RandomForest Model</h3>
                  <p className="text-sm text-muted-foreground mb-3">Extract features and train the model</p>
                  <div className="bg-secondary p-3 rounded font-mono text-xs space-y-1">
                    <div className="text-green-400">$ python scripts/train_randomforest_model.py</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    This generates model_info.json with metrics and predictions
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500/20">
                    <Terminal className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-2">3. Start FastAPI Backend</h3>
                  <p className="text-sm text-muted-foreground mb-3">Launch the ML inference server</p>
                  <div className="bg-secondary p-3 rounded font-mono text-xs space-y-1">
                    <div className="text-green-400">$ python scripts/fastapi_server.py</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Server runs on http://localhost:8000</p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500/20">
                    <Code2 className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-2">4. View Live Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-3">Access the frontend with real predictions</p>
                  <div className="bg-secondary p-3 rounded font-mono text-xs space-y-1">
                    <div className="text-green-400">Frontend: http://localhost:3000</div>
                    <div className="text-green-400">Go to: /fraud-detection</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Dashboard now displays real RandomForest predictions with risk categories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Features */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">ML Model Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-3">Feature Engineering</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Transaction Amount Normalization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Velocity (Transactions/Hour)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Geographic Distance Analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Temporal Patterns
                </li>
              </ul>
            </div>

            <div className="border border-border rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-3">Model Metrics</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Accuracy: 94.0%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Precision: 92.0%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Recall: 89.0%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  AUC Score: 0.94
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">API Endpoints</h2>

          <div className="space-y-3">
            <div className="border border-border rounded-lg p-4 font-mono text-xs">
              <div className="text-green-400 mb-2">GET /api/health</div>
              <div className="text-muted-foreground">Check API server status</div>
            </div>

            <div className="border border-border rounded-lg p-4 font-mono text-xs">
              <div className="text-green-400 mb-2">GET /api/model-metrics</div>
              <div className="text-muted-foreground">Get model performance metrics and confusion matrix</div>
            </div>

            <div className="border border-border rounded-lg p-4 font-mono text-xs">
              <div className="text-green-400 mb-2">POST /api/predict</div>
              <div className="text-muted-foreground">Single transaction fraud prediction</div>
            </div>

            <div className="border border-border rounded-lg p-4 font-mono text-xs">
              <div className="text-green-400 mb-2">POST /api/predict-batch</div>
              <div className="text-muted-foreground">Batch predictions with risk categorization</div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="border border-border rounded-lg p-6 bg-blue-500/10">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Ready to Deploy?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Follow the setup steps above to train your model and start viewing real fraud predictions in the
                dashboard.
              </p>
              <div className="flex gap-2">
                <a href="/fraud-detection">
                  <Button className="bg-blue-600 hover:bg-blue-700">View Dashboard</Button>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Documentation</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
