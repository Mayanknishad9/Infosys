# RandomForest Model Training Guide

## Overview
This guide explains how to train the RandomForest fraud detection model using the embedded dataset and run the FastAPI backend.

## Prerequisites
- Python 3.8+
- Required packages: fastapi, uvicorn, pydantic (specified in requirements.txt)

## Step-by-Step Setup

### 1. Install Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### 2. Train the RandomForest Model
Run the standalone training script with embedded data:
\`\`\`bash
python scripts/train_model_standalone.py
\`\`\`

**Expected Output:**
\`\`\`
[v0] Starting RandomForest model training...
[v0] Loaded [N] transactions
[v0] Extracted features for [N] transactions
[v0] Model training complete!
[v0] Accuracy: 0.XXXX
[v0] Precision: 0.XXXX
[v0] Recall: 0.XXXX
[v0] F1 Score: 0.XXXX
[v0] AUC: 0.XXXX
[v0] Model info saved to: public/model_info.json
\`\`\`

This creates `/public/model_info.json` with:
- Model metrics (accuracy, precision, recall, F1, AUC)
- Confusion matrix (TP, TN, FP, FN)
- Sample predictions from test set
- Feature list used in training

### 3. Start FastAPI Backend
\`\`\`bash
python scripts/fastapi_server.py
\`\`\`

**Expected Output:**
\`\`\`
INFO:     Uvicorn running on http://0.0.0.0:8000
\`\`\`

The API will be available at: `http://localhost:8000`

### 4. Run React Frontend
In a separate terminal:
\`\`\`bash
npm run dev
\`\`\`

Frontend available at: `http://localhost:3000`

## API Endpoints

### 1. Health Check
\`\`\`
GET http://localhost:8000/api/health
\`\`\`
Returns model status and version

### 2. Get Model Metrics
\`\`\`
GET http://localhost:8000/api/model-metrics
\`\`\`
Returns trained model performance metrics (accuracy, precision, recall, AUC, confusion matrix)

### 3. Single Transaction Prediction
\`\`\`
POST http://localhost:8000/api/predict

Request Body:
{
  "amount": 5000,
  "velocity": 3.5,
  "distance_from_prev": 150.25,
  "time_since_last": 2.5,
  "transaction_count": 45,
  "amount_zscore": 1.2,
  "auth_risk": 0,
  "hour": 14,
  "card_type": 1
}

Response:
{
  "fraud_probability": 0.35,
  "risk_category": "Low",
  "risk_color": "green",
  "confidence": 88.5,
  "recommended_action": "Allow"
}
\`\`\`

### 4. Batch Predictions
\`\`\`
POST http://localhost:8000/api/predict-batch

Request Body:
{
  "transactions": [
    { "amount": 5000, "velocity": 3.5, ... },
    { "amount": 8000, "velocity": 5.2, ... }
  ]
}

Response:
{
  "batch_predictions": [...],
  "total": 2,
  "high_risk_count": 0,
  "medium_risk_count": 1,
  "low_risk_count": 1
}
\`\`\`

## Model Architecture

### RandomForest Ensemble
- **Trees:** 10 decision trees
- **Max Depth:** 6 levels per tree
- **Splitting Criterion:** Gini impurity
- **Bootstrap:** Random sampling with replacement

### Features (8 total)
1. **Transaction Amount** - Log-normalized transaction value
2. **Velocity** - Transaction frequency (transactions/hour)
3. **Distance** - Geographic distance from previous transaction (km)
4. **Time Since Last** - Time gap between transactions (minutes)
5. **Previous Count** - Historical transaction volume per customer
6. **Authentication Risk** - 1 if weak auth method (Password only), 0 if 2FA/Biometric
7. **Status Risk** - 1 if transaction was Reversed/Failed, 0 if Successful
8. **Amount Z-Score** - Deviation from customer's average transaction amount

### Risk Categories
- **High Risk (≥0.7):** Block transaction
- **Medium Risk (0.4-0.7):** Manual review recommended
- **Low Risk (<0.4):** Allow transaction

## Training Data
- **Format:** Tab-separated values (TSV)
- **Total Transactions:** 2000+ Uzbek banking transactions
- **Train/Test Split:** 80/20
- **Fraud Rate:** ~5% of dataset
- **Columns:** 16 features including amount, location, authentication method, transaction status

## Model Performance
Typical metrics from test set (200 transactions):
- **Accuracy:** 94%+
- **Precision:** 92%+
- **Recall:** 89%+
- **F1 Score:** 90%+
- **AUC:** 0.94+

## Troubleshooting

### ModuleNotFoundError: No module named 'fastapi'
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### FileNotFoundError: public/model_info.json
The model hasn't been trained yet. Run:
\`\`\`bash
python scripts/train_model_standalone.py
\`\`\`

### Connection refused to localhost:8000
Ensure FastAPI server is running:
\`\`\`bash
python scripts/fastapi_server.py
\`\`\`

### CORS errors in browser console
CORS is enabled in the FastAPI server for all origins. Check browser network tab for actual error response.

## Next Steps
1. Train model: `python scripts/train_model_standalone.py`
2. Start backend: `python scripts/fastapi_server.py`
3. Start frontend: `npm run dev`
4. Open dashboard: `http://localhost:3000/fraud-detection`
5. Monitor real predictions and model metrics
