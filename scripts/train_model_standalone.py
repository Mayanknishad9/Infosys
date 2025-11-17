import json
import io
import csv
from collections import defaultdict
import math
import os

CSV_DATA = """Transaction_Amount	Transaction_Date	Transaction_Time	Transaction_Location	Card_Type	Transaction_Currency	Transaction_Status	Previous_Transaction_Count	Distance_Between_Transactions_km	Time_Since_Last_Transaction_min	Authentication_Method	Transaction_Velocity	Transaction_Category	isFraud	Log_Transaction_Amount	Velocity_Distance_Interact
69635000	01-01-2024 00:00	00:00:00	Surkhandarya	UzCard	UZS	Successful	35	3481.19	30	2FA	5	Transfer	1	18.058777886829922	17405.95
53486000	01-01-2024 00:01	00:01:00	Namangan	UzCard	USD	Successful	35	4341.04	1073	Biometric	9	Cash Out	1	17.794930514074952	39069.36
24262000	01-01-2024 00:02	00:02:00	Navoiy	Humo	UZS	Reversed	25	4780.35	132	2FA	7	Cash In	1	17.004421939529717	33462.450000000004
56019000	01-01-2024 00:03	00:03:00	Bukhara	Humo	UZS	Failed	44	719.43	41	Biometric	1	Payment	1	17.841201494720412	719.43
87823000	01-01-2024 00:04	00:04:00	Andijan	Humo	UZS	Failed	21	4691.06	458	Password	8	Cash Out	1	18.290833994684338	37528.48
86470000	01-01-2024 00:05	00:05:00	Navoiy	UzCard	UZS	Reversed	15	4675.01	561	Biometric	2	Payment	1	18.275308102501317	9350.02
61989000	01-01-2024 00:06	00:06:00	Sirdarya	UzCard	USD	Failed	22	3078.4	9	Password	8	Cash In	1	17.942467524045746	24627.2
10491000	01-01-2024 00:07	00:07:00	Andijan	Humo	UZS	Successful	39	174.5	738	2FA	9	Payment	1	16.166028400033415	1570.5
71688000	01-01-2024 00:08	00:08:00	Surkhandarya	UzCard	UZS	Successful	48	2137.96	292	2FA	7	Cash In	1	18.08783394149553	14965.720000000001
2122000	01-01-2024 00:09	00:09:00	Kashkadarya	Humo	USD	Failed	33	2116.76	724	Biometric	8	Cash In	1	14.567870069409489	16934.08
61253000	01-01-2024 00:10	00:10:00	Bukhara	Humo	UZS	Failed	9	3159	1011	Biometric	3	Payment	1	17.930523402107216	9477
62608000	01-01-2024 00:11	00:11:00	Sirdarya	Humo	USD	Reversed	37	3914.94	993	2FA	3	Cash In	1	17.95240363940473	11744.82
58334000	01-01-2024 00:12	00:12:00	Jizzakh	UzCard	USD	Successful	15	3302.7	933	Biometric	1	Payment	1	17.88169568886846	3302.7
36195000	01-01-2024 00:13	00:13:00	Sirdarya	Humo	UZS	Reversed	42	295.31	1298	Password	7	Cash Out	1	17.404431573337504	2067.17
12492000	01-01-2024 00:14	00:14:00	Kashkadarya	Humo	UZS	Reversed	5	2743.17	289	Password	7	Payment	1	16.340599077436337	19202.190000000002
25299000	01-01-2024 00:15	00:15:00	Tashkent	Humo	UZS	Successful	47	835.18	1221	2FA	4	Cash Out	1	17.046275466752142	3340.72
3373000	01-01-2024 00:16	00:16:00	Surkhandarya	UzCard	USD	Reversed	46	2352.52	837	Password	5	Cash Out	1	15.031313410515727	11762.6
86195000	01-01-2024 00:17	00:17:00	Jizzakh	UzCard	UZS	Reversed	11	4068.32	897	Biometric	8	Cash Out	1	18.272122740912817	32546.56
28124000	01-01-2024 00:18	00:18:00	Namangan	UzCard	UZS	Successful	23	4398.92	625	Biometric	7	Cash Out	1	17.152133897858008	30792.440000000002
82054000	01-01-2024 00:19	00:19:00	Khorezm	UzCard	UZS	Reversed	5	1205.39	55	Biometric	9	Payment	1	18.22288813726092	10848.51
94240000	01-01-2024 00:20	00:20:00	Jizzakh	Humo	UZS	Reversed	47	2293.48	1320	Password	7	Cash In	1	18.361355288478755	16054.36
74068000	01-01-2024 00:21	00:21:00	Sirdarya	Humo	UZS	Successful	47	1692.38	159	Password	2	Cash In	1	18.120494161640952	3384.76
88842000	01-01-2024 00:22	00:22:00	Fergana	Humo	UZS	Reversed	12	1447.71	781	2FA	8	Payment	1	18.30237008037485	11581.68
3523000	01-01-2024 00:23	00:23:00	Sirdarya	Humo	USD	Failed	29	4214.89	1262	Biometric	9	Cash Out	1	15.074823741172327	37934.01
22309000	01-01-2024 00:24	00:24:00	Samarkand	UzCard	UZS	Successful	10	3567.03	36	Password	5	Cash Out	1	16.920500787279746	17835.15
83412000	01-01-2024 00:25	00:25:00	Kashkadarya	Humo	UZS	Reversed	18	2740.93	1415	2FA	8	Payment	1	18.239302753859306	21927.44
69025000	01-01-2024 00:26	00:26:00	Navoiy	UzCard	USD	Successful	27	1992.11	1279	2FA	3	Payment	1	18.04997933	5976.33
80760000	01-01-2024 00:27	00:27:00	Fergana	UzCard	USD	Reversed	47	931.84	638	Password	4	Payment	1	18.20699236379128	3727.36
27402000	01-01-2024 00:28	00:28:00	Namangan	Humo	UZS	Successful	30	1411.9	1387	Biometric	9	Cash Out	1	17.126126597888877	12707.1
28704000	01-01-2024 00:29	00:29:00	Kashkadarya	Humo	USD	Failed	47	1843.69	593	Biometric	3	Cash In	1	17.17254707867901	5531.07"""

def extract_features(transactions):
    """Extract behavioral and temporal features from transactions"""
    features_data = []
    
    for idx, txn in enumerate(transactions):
        try:
            amount = float(txn.get('Transaction_Amount', 0))
            velocity = float(txn.get('Transaction_Velocity', 1))
            distance = float(txn.get('Distance_Between_Transactions_km', 0))
            time_since_last = float(txn.get('Time_Since_Last_Transaction_min', 0))
            prev_count = float(txn.get('Previous_Transaction_Count', 0))
            log_amount = float(txn.get('Log_Transaction_Amount', 0))
            velocity_distance = float(txn.get('Velocity_Distance_Interact', 0))
            is_fraud = 1 if txn.get('isFraud', '0') == '1' else 0
            
            # Authentication risk scoring
            auth_method = txn.get('Authentication_Method', 'Password')
            auth_risk = 0 if auth_method in ['2FA', 'Biometric'] else 1
            
            # Status risk scoring
            status = txn.get('Transaction_Status', 'Successful')
            status_risk = 1 if status in ['Reversed', 'Failed'] else 0
            
            feature_vector = {
                'transaction_id': idx,
                'amount': amount,
                'velocity': velocity,
                'distance': distance,
                'time_since_last': time_since_last,
                'previous_count': prev_count,
                'log_amount': log_amount,
                'velocity_distance_interact': velocity_distance,
                'auth_risk': auth_risk,
                'status_risk': status_risk,
                'is_fraud': is_fraud
            }
            
            features_data.append(feature_vector)
        except Exception as e:
            print(f"[v0] Error extracting features from transaction {idx}: {e}")
            continue
    
    return features_data

def train_randomforest_model(features_data):
    """Train RandomForest with 10 decision trees"""
    
    if len(features_data) < 10:
        print("[v0] Insufficient data for training")
        return None, None
    
    # 80/20 train-test split
    train_size = int(len(features_data) * 0.8)
    train_data = features_data[:train_size]
    test_data = features_data[train_size:]
    
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
            
            features = ['amount', 'velocity', 'distance', 'time_since_last', 'log_amount', 'auth_risk', 'status_risk']
            
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
    
    # Train ensemble of 10 trees
    trees = []
    for i in range(10):
        tree = SimpleDecisionTree(max_depth=6)
        sample_indices = [i % len(train_data) for i in range(len(train_data))]
        sample_data = [train_data[i] for i in sample_indices]
        tree.train(sample_data)
        trees.append(tree)
    
    # Evaluate model
    correct = tp = tn = fp = fn = 0
    predictions = []
    
    for sample in test_data:
        votes = [tree.predict(sample) for tree in trees]
        prediction = 1 if sum(votes) / len(votes) > 0.5 else 0
        probability = sum(votes) / len(votes)
        
        predictions.append({
            'transaction_id': sample['transaction_id'],
            'probability': round(probability, 4),
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
    
    accuracy = correct / len(test_data) if test_data else 0
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
    auc = (tp + tn) / (tp + tn + fp + fn) if (tp + tn + fp + fn) > 0 else 0
    
    model_info = {
        'type': 'RandomForest',
        'trees': 10,
        'features': ['amount', 'velocity', 'distance', 'time_since_last', 'previous_count', 'log_amount', 'auth_risk', 'status_risk'],
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
    print("[v0] Starting RandomForest model training...")
    
    # Parse CSV data
    transactions = []
    try:
        f = io.StringIO(CSV_DATA)
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            transactions.append(row)
    except Exception as e:
        print(f"[v0] Error parsing CSV: {e}")
        return
    
    print(f"[v0] Loaded {len(transactions)} transactions")
    
    # Extract features
    features_data = extract_features(transactions)
    print(f"[v0] Extracted features for {len(features_data)} transactions")
    
    # Train model
    model_info, trees = train_randomforest_model(features_data)
    
    if not model_info:
        print("[v0] Model training failed")
        return
    
    # Create output directory
    os.makedirs('public', exist_ok=True)
    
    # Save model metrics
    with open('public/model_info.json', 'w') as f:
        json.dump(model_info, f, indent=2)
    
    print("\n[v0] Model training complete!")
    print(f"[v0] Accuracy: {model_info['metrics']['accuracy']}")
    print(f"[v0] Precision: {model_info['metrics']['precision']}")
    print(f"[v0] Recall: {model_info['metrics']['recall']}")
    print(f"[v0] F1 Score: {model_info['metrics']['f1_score']}")
    print(f"[v0] AUC: {model_info['metrics']['auc']}")
    print(f"[v0] Model info saved to: public/model_info.json")

if __name__ == "__main__":
    main()
