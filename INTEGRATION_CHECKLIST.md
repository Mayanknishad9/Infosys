# BFSI Fraud Detection - Integration Checklist

## Pre-Deployment Verification

### 1. Dataset Setup
- [ ] CSV file placed at: `public/data/transactions.csv`
- [ ] File contains all required columns:
  - [ ] Transaction_ID
  - [ ] Customer_ID
  - [ ] Transaction_Amount
  - [ ] Card_Type
  - [ ] Location
  - [ ] Previous_Location
  - [ ] Time_Sync
  - [ ] Authentication_Method
  - [ ] isFraud
  - [ ] Latitude / Longitude
- [ ] CSV has minimum 500+ transactions for meaningful training

### 2. Backend Preparation
- [ ] Python 3.10+ installed: `python --version`
- [ ] Required packages installed: `pip install fastapi uvicorn pydantic`
- [ ] Model training script verified: `scripts/train_randomforest_model.py`
- [ ] FastAPI server script verified: `scripts/fastapi_server.py`
- [ ] Port 8000 is available: `lsof -i :8000`

### 3. Frontend Preparation
- [ ] Node.js 18+ installed: `node --version`
- [ ] npm packages installed: `npm install`
- [ ] React hook connects to correct API: `lib/use-fraud-predictions.ts`
- [ ] API URL configured: `http://localhost:8000`
- [ ] Port 3000 is available: `lsof -i :3000`

## Deployment Steps

### Step 1: Train RandomForest Model
\`\`\`bash
cd /path/to/project
python scripts/train_randomforest_model.py
\`\`\`

**Expected Output:**
- Model training starts
- Features extracted for all transactions
- RandomForest ensemble trained (10 trees)
- Metrics calculated: Accuracy, Precision, Recall, F1, AUC
- File created: `public/model_info.json`

**Verification:**
\`\`\`bash
ls -la public/model_info.json
cat public/model_info.json | head -20
\`\`\`

### Step 2: Start FastAPI Backend
\`\`\`bash
python scripts/fastapi_server.py
\`\`\`

**Expected Output:**
\`\`\`
INFO:     Uvicorn running on http://0.0.0.0:8000
\`\`\`

**Health Check:**
\`\`\`bash
curl http://localhost:8000/api/health
# Expected response:
# {"status":"healthy","model":"RandomForest Fraud Detection","version":"1.0"}
\`\`\`

**Get Model Metrics:**
\`\`\`bash
curl http://localhost:8000/api/model-metrics
\`\`\`

### Step 3: Start React Frontend
Open new terminal:
\`\`\`bash
npm run dev
\`\`\`

**Expected Output:**
\`\`\`
> ready - started server on 0.0.0.0:3000
\`\`\`

### Step 4: Access Dashboard

**Homepage:**
\`\`\`
http://localhost:3000
\`\`\`

**Fraud Detection Dashboard:**
\`\`\`
http://localhost:3000/fraud-detection
\`\`\`

**Setup & Configuration:**
\`\`\`
http://localhost:3000/setup
\`\`\`

**Analytics:**
\`\`\`
http://localhost:3000/analytics
\`\`\`

## Runtime Verification

### 1. API Connection
- [ ] Dashboard shows "FastAPI Connected" in setup page
- [ ] API Connection Status: Green indicator
- [ ] Model info displays: "RandomForest Model - 10-Tree Ensemble"

### 2. Fraud Predictions
- [ ] Dashboard displays fraud probabilities (0-100%)
- [ ] Risk categories show: Low (green), Medium (yellow), High (red)
- [ ] Recommended actions appear: Allow, Review, Block
- [ ] Confidence scores display correctly

### 3. Model Metrics
- [ ] Prediction Metrics chart shows all 5 metrics
- [ ] Confusion matrix displays: TP, TN, FP, FN
- [ ] Accuracy, Precision, Recall, F1, AUC all > 0.85

### 4. Flagged Transactions
- [ ] High-risk transactions display with red badge
- [ ] Medium-risk transactions display with yellow badge
- [ ] Each transaction shows: ID, Amount, Location, Probability
- [ ] Action buttons: Block & Review, Whitelist, Override

### 5. Real-Time Updates
- [ ] Dashboard refreshes data every 30 seconds
- [ ] New predictions appear without page reload
- [ ] Statistics update in real-time
- [ ] No console errors in browser dev tools

## Performance Testing

### Load Testing
Test with batch predictions:
\`\`\`bash
curl -X POST http://localhost:8000/api/predict-batch \
  -H "Content-Type: application/json" \
  -d '{
    "transactions": [
      {"amount": 5000, "velocity": 3, ...},
      {"amount": 2500, "velocity": 1, ...}
    ]
  }'
\`\`\`

### Response Time Targets
- Single prediction: < 50ms
- Batch prediction (50 txns): < 500ms
- API health check: < 10ms

## Troubleshooting

### Issue: "API Disconnected" Message
\`\`\`bash
# Check if FastAPI server is running
ps aux | grep fastapi_server

# Check port 8000
lsof -i :8000

# Restart server
python scripts/fastapi_server.py
\`\`\`

### Issue: "No Data in Dashboard"
\`\`\`bash
# Verify model_info.json exists
ls public/model_info.json

# Check it's valid JSON
cat public/model_info.json | python -m json.tool

# If missing, retrain model
python scripts/train_randomforest_model.py
\`\`\`

### Issue: CORS Errors
- Check browser console for exact error
- Verify FastAPI CORS middleware is enabled
- Restart FastAPI server with debug output

### Issue: High Latency
- Check CPU/RAM usage: `top`, `ps aux`
- Reduce batch size in requests
- Check network latency: `ping localhost`

## Post-Deployment Monitoring

### Daily Checks
- [ ] Fraud detection accuracy remains > 90%
- [ ] API response times < 500ms
- [ ] No error logs in console
- [ ] Dashboard loads without delays

### Weekly Checks
- [ ] Model metrics haven't degraded
- [ ] False positive rate acceptable
- [ ] No memory leaks in backend
- [ ] Database/file storage clean

### Monthly Tasks
- [ ] Retrain model with new data
- [ ] Update feature engineering if needed
- [ ] Archive old predictions
- [ ] Review and adjust thresholds

## Scaling Guidelines

### For Production:
1. **Backend**: Deploy FastAPI with Gunicorn/Uvicorn on dedicated server
2. **Model**: Add model caching or quantization for speed
3. **Database**: Store predictions in PostgreSQL/MongoDB
4. **Frontend**: Deploy Next.js on Vercel or similar
5. **Monitoring**: Add Prometheus/Grafana for metrics

### Environment Variables
\`\`\`env
# Backend
API_HOST=0.0.0.0
API_PORT=8000
ENVIRONMENT=production
MODEL_PATH=./public/model_info.json

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_ENVIRONMENT=production
\`\`\`

## Rollback Procedure

If issues occur:

1. **Stop Frontend**: Kill npm process
2. **Stop Backend**: Kill Python process
3. **Restore Previous Model**: Backup model_info.json if available
4. **Check Logs**: Review error messages
5. **Restart Services**: Follow deployment steps again

## Success Criteria

System is ready for production when:
- [ ] API responds to all endpoints < 100ms
- [ ] Dashboard loads all components without errors
- [ ] Model accuracy metrics > 90%
- [ ] No memory leaks after 1 hour runtime
- [ ] All risk categories display correctly
- [ ] Flagged transactions update in real-time
- [ ] Setup page shows "FastAPI Connected"
\`\`\`

\`\`\`

Now let me create one final comprehensive summary document:
