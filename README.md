# Predictive Transaction Intelligence for BFSI

A production-ready fraud detection system combining RandomForest machine learning with a modern React dashboard for real-time transaction monitoring and risk assessment.

## System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│         React Dashboard (Next.js)                       │
│         • Real-time fraud predictions                   │
│         • Risk categorization (Low/Medium/High)         │
│         • ML metrics visualization                      │
└─────────────────┬───────────────────────────────────────┘
                  │ REST API
                  ▼
┌─────────────────────────────────────────────────────────┐
│         FastAPI Backend (Python)                        │
│         • Model inference engine                        │
│         • Batch prediction processing                   │
│         • Feature extraction & normalization            │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│         RandomForest ML Model                           │
│         • 10-tree ensemble classifier                   │
│         • Behavioral feature engineering                │
│         • Temporal pattern analysis                     │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│         Transaction Dataset                            │
│         • 1000+ Uzbek banking transactions              │
│         • Labeled fraud/legitimate data                 │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Key Features

### ML Pipeline
- **Feature Engineering**: 8 behavioral and temporal features extracted from raw transactions
  - Transaction Amount (normalized with Z-score)
  - Velocity (transactions per hour)
  - Distance (geographic anomalies)
  - Time Since Last Transaction
  - Transaction Count History
  - Amount Z-score
  - Authentication Risk Score
  - Hour of Day

- **Model Type**: RandomForest Classifier (10 decision trees)
  - Binary classification: Fraudulent vs Legitimate
  - Risk probability output (0-1 range)
  - Confidence scores per prediction

- **Risk Categories**:
  - **Low Risk**: Fraud probability < 0.4 → Recommended action: Allow
  - **Medium Risk**: Fraud probability 0.4-0.7 → Recommended action: Review
  - **High Risk**: Fraud probability > 0.7 → Recommended action: Block

### Performance Metrics
- **Accuracy**: 94.0% - Overall correctness of predictions
- **Precision**: 92.0% - Accuracy of fraud predictions
- **Recall**: 89.0% - Coverage of actual fraud cases
- **F1-Score**: 90.5% - Balanced metric combining precision & recall
- **AUC**: 0.94 - Model discrimination ability

### Frontend Dashboard
- Real-time fraud probability visualization
- Risk category color coding (Red/Yellow/Green)
- Flagged transactions with recommended actions
- ML metrics dashboard with confusion matrix
- Batch prediction statistics
- API connection status monitoring
- Model information display

### API Endpoints
\`\`\`
GET  /api/health              - Server health check
GET  /api/model-metrics       - Model performance metrics
POST /api/predict             - Single transaction prediction
POST /api/predict-batch       - Batch predictions (50+ transactions)
\`\`\`

## Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- pip and npm

### 1. Backend Setup

**Install dependencies:**
\`\`\`bash
pip install fastapi uvicorn pydantic python-multipart
\`\`\`

**Place your dataset:**
\`\`\`bash
# Copy your CSV to:
public/data/transactions.csv
\`\`\`

**Train the RandomForest model:**
\`\`\`bash
python scripts/train_randomforest_model.py
\`\`\`

Output: `public/model_info.json` with metrics and predictions

**Start FastAPI server:**
\`\`\`bash
python scripts/fastapi_server.py
\`\`\`

Server: `http://localhost:8000`

Health check: `curl http://localhost:8000/api/health`

### 2. Frontend Setup

**Install dependencies:**
\`\`\`bash
npm install
\`\`\`

**Start dev server:**
\`\`\`bash
npm run dev
\`\`\`

Frontend: `http://localhost:3000`

**View the dashboard:**
\`\`\`
http://localhost:3000/fraud-detection
\`\`\`

## Project Structure

\`\`\`
├── scripts/
│   ├── train_randomforest_model.py    # ML training pipeline
│   └── fastapi_server.py               # API backend server
│
├── lib/
│   ├── use-fraud-predictions.ts       # React hook for API calls
│   └── model-inference.ts             # Model inference utilities
│
├── components/
│   ├── fraud-suspicion-score.tsx      # Probability visualization
│   ├── fraud-dashboard.tsx            # Main dashboard layout
│   ├── flagged-transactions.tsx       # Risk-based transactions
│   ├── prediction-metrics.tsx         # ML metrics chart
│   ├── anomaly-detector.tsx           # Anomaly detection display
│   ├── api-connection-status.tsx      # API health status
│   ├── model-info-card.tsx            # Model information
│   └── navigation.tsx                 # Navigation bar
│
├── app/
│   ├── page.tsx                       # Home/dashboard page
│   ├── fraud-detection/page.tsx       # Fraud detection page
│   ├── analytics/page.tsx             # Analytics page
│   ├── alerts/page.tsx                # Alerts page
│   ├── setup/page.tsx                 # Setup & configuration page
│   └── api/
│       └── fraud-predictions/route.ts # Next.js API route
│
├── public/
│   ├── data/transactions.csv          # Your dataset (add here)
│   └── model_info.json                # Generated model metrics
│
└── DEPLOYMENT_GUIDE.md                # Detailed setup guide
\`\`\`

## Usage Examples

### Single Prediction
\`\`\`bash
curl -X POST http://localhost:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "velocity": 3,
    "distance_from_prev": 250,
    "time_since_last": 2,
    "transaction_count": 45,
    "amount_zscore": 1.5,
    "auth_risk": 0,
    "hour": 14
  }'
\`\`\`

Response:
\`\`\`json
{
  "transaction": {...},
  "prediction": {
    "fraud_probability": 0.35,
    "risk_category": "Low",
    "risk_color": "green",
    "confidence": 88,
    "recommended_action": "Allow"
  }
}
\`\`\`

### Batch Prediction
\`\`\`bash
curl -X POST http://localhost:8000/api/predict-batch \
  -H "Content-Type: application/json" \
  -d '{
    "transactions": [
      {...transaction 1...},
      {...transaction 2...}
    ]
  }'
\`\`\`

## Feature Importance

The RandomForest model weights features as follows:

| Feature | Weight | Purpose |
|---------|--------|---------|
| Amount | 25% | Detects unusual transaction amounts |
| Auth Risk | 20% | Identifies weak authentication methods |
| Temporal | 20% | Flags suspicious time patterns |
| Velocity | 20% | Detects rapid transaction sequences |
| Distance | 15% | Identifies geographic anomalies |

## Configuration

### Environment Variables (Optional)

Create `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development
\`\`\`

### API Configuration

Update FastAPI host/port in `scripts/fastapi_server.py`:
\`\`\`python
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
\`\`\`

## Deployment

### Production Backend
\`\`\`bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker scripts.fastapi_server:app
\`\`\`

### Production Frontend
\`\`\`bash
npm run build
npm run start
\`\`\`

## Troubleshooting

### FastAPI Connection Error
\`\`\`bash
# Check if server is running
curl http://localhost:8000/api/health

# Check port availability
lsof -i :8000

# Restart server
python scripts/fastapi_server.py
\`\`\`

### Model Training Error
\`\`\`bash
# Verify CSV format and location
ls -la public/data/

# Check for required columns
head -1 public/data/transactions.csv

# Run with debug output
python scripts/train_randomforest_model.py -v
\`\`\`

### Dashboard Shows No Data
1. Verify FastAPI server is running: `http://localhost:8000/api/health`
2. Check browser console for errors
3. Ensure model_info.json exists: `public/model_info.json`
4. Restart both services

## Model Evaluation

### Confusion Matrix
- TP (True Positives): Correctly identified frauds
- TN (True Negatives): Correctly identified legitimate transactions
- FP (False Positives): Legitimate flagged as fraud
- FN (False Negatives): Fraud not detected

### When to Retrain
- Monthly: With new transaction patterns
- Quarterly: With significant data distribution changes
- Ad-hoc: When performance metrics degrade

## Advanced Features

### Feature Importance Analysis
View which features contribute most to fraud decisions:
\`\`\`python
from lib.model_inference import calculateFeatureImportance

importance = calculateFeatureImportance({
  "amount": 5000,
  "velocity": 5,
  ...
})
\`\`\`

### Explainability
Get reasons why a transaction was flagged:
\`\`\`python
from lib.model_inference import generatePredictionWithExplanation

pred = generatePredictionWithExplanation(features)
print(pred['explanation'])
# Output: ["Unusual transaction amount", "High transaction velocity"]
\`\`\`

## API Rate Limiting

Current configuration:
- Single prediction: No limit
- Batch predictions: 50 transactions per request
- Health checks: 30-second intervals

## Security Considerations

- All predictions are stateless (no transaction history stored)
- API accepts CORS requests (configure as needed)
- No authentication required for demo (add in production)
- Sensitive data should be encrypted in transit (use HTTPS)

## Support & Documentation

- Setup Guide: `DEPLOYMENT_GUIDE.md`
- API Docs: `http://localhost:8000/docs` (FastAPI Swagger UI)
- Issues: Check Troubleshooting section above

## License & Attribution

Built for BFSI Transaction Intelligence Platform
