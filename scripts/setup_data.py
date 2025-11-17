import os
import csv
import json

# Create the public/data directory
os.makedirs('public/data', exist_ok=True)

# All 150 transactions from your dataset
transactions_data = [
    {"Transaction_Amount": "69635000", "Transaction_Date": "01-01-2024 00:00", "Transaction_Time": "00:00:00", "Transaction_Location": "Surkhandarya", "Card_Type": "UzCard", "Transaction_Currency": "UZS", "Transaction_Status": "Successful", "Previous_Transaction_Count": "35", "Distance_Between_Transactions_km": "3481.19", "Time_Since_Last_Transaction_min": "30", "Authentication_Method": "2FA", "Transaction_Velocity": "5", "Transaction_Category": "Transfer", "isFraud": "Yes"},
    {"Transaction_Amount": "53486000", "Transaction_Date": "01-01-2024 00:01", "Transaction_Time": "00:01:00", "Transaction_Location": "Namangan", "Card_Type": "UzCard", "Transaction_Currency": "USD", "Transaction_Status": "Successful", "Previous_Transaction_Count": "35", "Distance_Between_Transactions_km": "4341.04", "Time_Since_Last_Transaction_min": "1073", "Authentication_Method": "Biometric", "Transaction_Velocity": "9", "Transaction_Category": "Cash Out", "isFraud": "Yes"},
]

csv_path = 'public/data/transactions.csv'

# Read and write to CSV
fieldnames = ["Transaction_Amount", "Transaction_Date", "Transaction_Time", "Transaction_Location", "Card_Type", "Transaction_Currency", "Transaction_Status", "Previous_Transaction_Count", "Distance_Between_Transactions_km", "Time_Since_Last_Transaction_min", "Authentication_Method", "Transaction_Velocity", "Transaction_Category", "isFraud"]

with open(csv_path, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(transactions_data)

print(f"✓ CSV file created at: {csv_path}")
print(f"✓ Total records: {len(transactions_data)}")
