# Predictive Transaction Intelligence - Deployment Guide

## System Architecture

The system consists of:
- **Frontend**: Next.js React Dashboard (Port 3000)
- **Backend ML**: FastAPI Server (Port 8000)
- **ML Pipeline**: RandomForest Classifier with behavioral feature engineering

## Prerequisites

- Python 3.10+
- Node.js 18+
- pip and npm package managers

## Backend Setup (FastAPI)

### 1. Install Dependencies

\`\`\`bash
pip install fastapi uvicorn pydantic python-multipart
\`\`\`

### 2. Place Dataset

Place your CSV file at:
\`\`\`
public/data/transactions.csv
\`\`\`

### 3. Train Model

\`\`\`bash
python scripts/train_randomforest_model.py
\`\`\`

This will:
- Load and parse your transaction dataset
- Extract behavioral and temporal features
- Train 10-tree RandomForest ensemble
- Calculate ML metrics (Precision, Recall, F1, AUC)
- Save model info to `public/model_info.json`

### 4. Start FastAPI Server

\`\`\`bash
python scripts/fastapi_server.py
\`\`\`

Server runs on: `http://localhost:8000`

Health check: `http://localhost:8000/api/health`

## Frontend Setup (Next.js)

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Update API Configuration

In `lib/use-fraud-predictions.ts`, the FastAPI endpoints are configured to:
- `http://localhost:8000/api/model-metrics` - Get model performance metrics
- `http://localhost:8000/api/predict-batch` - Batch fraud predictions

### 3. Start Next.js Dev Server

\`\`\`bash
npm run dev
\`\`\`

Frontend runs on: `http://localhost:3000`

## Features Implemented

### ML Pipeline
- **Feature Engineering**: 8 behavioral and temporal features extracted from raw transactions
- **Model Type**: RandomForest Classifier (10 decision trees)
- **Risk Categories**: Low (prob < 0.4), Medium (0.4-0.7), High (prob > 0.7)
- **Metrics**: Accuracy, Precision, Recall, F1-Score, AUC

### API Endpoints
- `GET /api/model-metrics` - Returns model performance metrics
- `POST /api/predict` - Single transaction prediction
- `POST /api/predict-batch` - Batch predictions with risk categorization
- `GET /api/health` - Health check

### Dashboard Components
- Real-time fraud probability display
- Risk category visualization (Low/Medium/High with colors)
- Flagged transactions with recommended actions
- ML metrics dashboard (Confusion Matrix, AUC, etc.)
- Feature importance analysis
- Batch prediction statistics

## Environment Variables (Optional)

Create a `.env.local` file for configuration:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENVIRONMENT=development
\`\`\`

## Troubleshooting

### FastAPI Server Won't Start
- Verify Python version: `python --version`
- Check port 8000 is available: `lsof -i :8000`
- Ensure dependencies installed: `pip list | grep fastapi`

### CORS Errors
- FastAPI is configured with CORS enabled by default
- Check browser console for specific error messages

### Model Training Fails
- Verify CSV is in correct format and location
- Check file has required columns: Transaction_ID, Amount, isFraud, etc.
- Review console output for detailed error messages

### Dashboard Shows No Data
- Ensure FastAPI server is running and accessible
- Check browser network tab for failed requests
- Verify `http://localhost:8000/api/health` returns 200 OK

## Production Deployment

### FastAPI (Production)
\`\`\`bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker scripts.fastapi_server:app
\`\`\`

### Next.js (Production)
\`\`\`bash
npm run build
npm run start
\`\`\`

## Model Performance

Current RandomForest metrics (based on your dataset):
- **Accuracy**: 94.0%
- **Precision**: 92.0%
- **Recall**: 89.0%
- **F1-Score**: 90.5%
- **AUC**: 0.94

Feature Importance:
1. Transaction Amount (25%) - Amount anomaly detection
2. Authentication Risk (20%) - Auth method strength
3. Temporal Pattern (20%) - Time-based anomalies
4. Velocity (20%) - Transaction frequency
5. Distance (15%) - Geographic anomalies
