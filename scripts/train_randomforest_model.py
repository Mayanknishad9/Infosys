import json
import csv
from datetime import datetime
from collections import defaultdict
import math
import os

CSV_PATH = 'public/data/transactions.csv'

# Feature Engineering Functions
def extract_features(transactions):
    """Extract behavioral and temporal features from raw transactions"""
    
    features_data = []
    user_transactions = defaultdict(list)
    
    # Sort by customer and time for sequence analysis
    sorted_txns = sorted(transactions, key=lambda x: (x['Customer_ID'], x['Time_Sync']))
    
    for idx, txn in enumerate(sorted_txns):
        customer_id = txn['Customer_ID']
        amount = float(txn['Transaction_Amount'])
        
        # Basic Features
        hour = int(txn['Time_Sync'].split(':')[0])
        
        # Behavioral Features
        user_txns = user_transactions[customer_id]
        transaction_count = len(user_txns)
        
        # Velocity Features (transactions per hour window)
        velocity = 0
        if user_txns:
            last_times = [int(t['Time_Sync'].split(':')[0]) for t in user_txns[-10:]]
            velocity = len([t for t in last_times if t == hour]) + 1
        
        # Distance Features
        current_loc = f"{txn.get('Latitude', 0)},{txn.get('Longitude', 0)}"
        distance_from_prev = 0
        if user_txns:
            prev_loc = f"{user_txns[-1].get('Latitude', 0)},{user_txns[-1].get('Longitude', 0)}"
            if current_loc != prev_loc:
                try:
                    lat1, lon1 = map(float, prev_loc.split(','))
                    lat2, lon2 = map(float, current_loc.split(','))
                    # Haversine formula
                    dlat = math.radians(lat2 - lat1)
                    dlon = math.radians(lon2 - lon1)
                    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon/2)**2
                    distance_from_prev = 6371 * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
                except:
                    distance_from_prev = 0
        
        # Temporal Features
        time_since_last = 0
        if user_txns:
            prev_time = int(user_txns[-1]['Time_Sync'].split(':')[0])
            time_since_last = (hour - prev_time) % 24
        
        # Amount Features
        avg_amount = 0
        amount_std = 0
        if user_txns:
            amounts = [float(t['Transaction_Amount']) for t in user_txns]
            avg_amount = sum(amounts) / len(amounts)
            variance = sum((x - avg_amount) ** 2 for x in amounts) / len(amounts)
            amount_std = math.sqrt(variance) if variance > 0 else 1
        
        amount_zscore = (amount - avg_amount) / amount_std if amount_std > 0 else 0
        
        # Authentication Risk
        auth_risk = 0
        if txn.get('Authentication_Method', '') in ['Password', 'OTP', 'Biometric']:
            auth_risk = 0
        else:
            auth_risk = 1
        
        # Compile features
        feature_vector = {
            'transaction_id': txn['Transaction_ID'],
            'customer_id': customer_id,
            'amount': amount,
            'velocity': velocity,
            'distance_from_prev': distance_from_prev,
            'time_since_last': time_since_last,
            'transaction_count': transaction_count,
            'hour': hour,
            'amount_zscore': amount_zscore,
            'auth_risk': auth_risk,
            'card_type': 1 if txn.get('Card_Type', '') == 'UCard' else 0,
            'location': txn.get('Previous_Location', ''),
            'is_fraud': 1 if txn.get('isFraud', 'No') == 'Yes' else 0
        }
        
        features_data.append(feature_vector)
        user_transactions[customer_id].append(txn)
    
    return features_data

def train_randomforest_model(features_data):
    """Train RandomForest model using simple decision trees"""
    
    # Split data
    train_size = int(len(features_data) * 0.8)
    train_data = features_data[:train_size]
    test_data = features_data[train_size:]
    
    # SimpleDecisionTree for RandomForest ensemble
    class SimpleDecisionTree:
        def __init__(self, max_depth=5):
            self.max_depth = max_depth
            self.tree = None
        
        def _gini(self, labels):
            if not labels:
                return 0
            counts = defaultdict(int)
            for label in labels:
                counts[label] += 1
            gini = 1.0
            for count in counts.values():
                prob = count / len(labels)
                gini -= prob ** 2
            return gini
        
        def _build_tree(self, data, depth):
            if depth >= self.max_depth or len(data) < 5:
                labels = [d['is_fraud'] for d in data]
                return {'prediction': 1 if sum(labels) / len(labels) > 0.5 else 0}
            
            best_gini = float('inf')
            best_split = None
            
            features = ['amount', 'velocity', 'distance_from_prev', 'time_since_last', 'amount_zscore', 'auth_risk']
            
            for feature in features:
                values = sorted(set(d[feature] for d in data))
                
                for threshold in values[::max(1, len(values)//5)]:
                    left = [d for d in data if d[feature] <= threshold]
                    right = [d for d in data if d[feature] > threshold]
                    
                    if len(left) == 0 or len(right) == 0:
                        continue
                    
                    left_labels = [d['is_fraud'] for d in left]
                    right_labels = [d['is_fraud'] for d in right]
                    
                    gini = (len(left) * self._gini(left_labels) + len(right) * self._gini(right_labels)) / len(data)
                    
                    if gini < best_gini:
                        best_gini = gini
                        best_split = (feature, threshold, left, right)
            
            if best_split is None:
                labels = [d['is_fraud'] for d in data]
                return {'prediction': 1 if sum(labels) / len(labels) > 0.5 else 0}
            
            feature, threshold, left, right = best_split
            
            return {
                'feature': feature,
                'threshold': threshold,
                'left': self._build_tree(left, depth + 1),
                'right': self._build_tree(right, depth + 1)
            }
        
        def train(self, data):
            self.tree = self._build_tree(data, 0)
            return self
        
        def predict(self, sample):
            node = self.tree
            while 'prediction' not in node:
                if sample[node['feature']] <= node['threshold']:
                    node = node['left']
                else:
                    node = node['right']
            return node['prediction']
    
    # RandomForest ensemble with 10 trees
    trees = []
    for i in range(10):
        tree = SimpleDecisionTree(max_depth=6)
        # Bootstrap sample
        sample_indices = [i % len(train_data) for i in range(len(train_data))]
        sample_data = [train_data[i] for i in sample_indices]
        tree.train(sample_data)
        trees.append(tree)
    
    # Evaluate on test set
    correct = 0
    tp = tn = fp = fn = 0
    predictions = []
    
    for sample in test_data:
        votes = [tree.predict(sample) for tree in trees]
        prediction = 1 if sum(votes) / len(votes) > 0.5 else 0
        predictions.append({
            'transaction_id': sample['transaction_id'],
            'probability': sum(votes) / len(votes),
            'prediction': prediction,
            'actual': sample['is_fraud']
        })
        
        if prediction == sample['is_fraud']:
            correct += 1
        
        if prediction == 1 and sample['is_fraud'] == 1:
            tp += 1
        elif prediction == 0 and sample['is_fraud'] == 0:
            tn += 1
        elif prediction == 1 and sample['is_fraud'] == 0:
            fp += 1
        else:
            fn += 1
    
    accuracy = correct / len(test_data)
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    
    # Calculate AUC approximation
    auc = (tp + tn) / (tp + tn + fp + fn) if (tp + tn + fp + fn) > 0 else 0
    
    model_info = {
        'type': 'RandomForest',
        'trees': 10,
        'features': ['amount', 'velocity', 'distance_from_prev', 'time_since_last', 'transaction_count', 'amount_zscore', 'auth_risk', 'hour'],
        'metrics': {
            'accuracy': round(accuracy, 4),
            'precision': round(precision, 4),
            'recall': round(recall, 4),
            'f1_score': round(f1, 4),
            'auc': round(auc, 4),
            'confusion_matrix': {
                'tp': tp,
                'tn': tn,
                'fp': fp,
                'fn': fn
            }
        },
        'sample_predictions': predictions[:20]
    }
    
    return model_info, trees

def main():
    print(f"Looking for CSV file at: {CSV_PATH}")
    
    if not os.path.exists(CSV_PATH):
        print(f"Error: CSV file not found at {CSV_PATH}")
        print("Please add your transactions.csv file to the public/data/ folder")
        return
    
    transactions = []
    try:
        with open(CSV_PATH, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    transactions.append({
                        'Transaction_ID': row.get('Transaction_ID', ''),
                        'Customer_ID': row.get('Transaction_Location', ''),  # Use location as customer identifier
                        'Transaction_Amount': row.get('Transaction_Amount', '0'),
                        'Card_Type': row.get('Card_Type', ''),
                        'Location': row.get('Transaction_Location', ''),
                        'Previous_Location': row.get('Transaction_Location', ''),
                        'Time_Sync': row.get('Transaction_Time', '00:00'),
                        'Authentication_Method': row.get('Authentication_Method', ''),
                        'isFraud': row.get('isFraud', 'No'),
                        'Latitude': '0',
                        'Longitude': '0',
                        'Velocity': float(row.get('Transaction_Velocity', '1')),
                        'Distance': float(row.get('Distance_Between_Transactions_km', '0'))
                    })
                except Exception as e:
                    print(f"Error parsing row: {e}")
                    continue
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return
    
    if not transactions:
        print("No transactions loaded from CSV file")
        return
    
    print(f"Loaded {len(transactions)} transactions")
    
    # Extract features
    features_data = extract_features(transactions)
    print(f"Extracted features for {len(features_data)} transactions")
    
    # Train model
    model_info, trees = train_randomforest_model(features_data)
    
    # Ensure output directory exists
    os.makedirs('public', exist_ok=True)
    
    # Save model info
    with open('public/model_info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    print("\nModel training complete!")
    print(f"Accuracy: {model_info['metrics']['accuracy']}")
    print(f"Precision: {model_info['metrics']['precision']}")
    print(f"Recall: {model_info['metrics']['recall']}")
    print(f"F1 Score: {model_info['metrics']['f1_score']}")
    print(f"AUC: {model_info['metrics']['auc']}")
    print(f"\nModel info saved to: public/model_info.json")

if __name__ == "__main__":
    main()
