import os

os.makedirs('public/data', exist_ok=True)

csv_content = """Transaction_Amount,Transaction_Date,Transaction_Time,Transaction_Location,Card_Type,Transaction_Currency,Transaction_Status,Previous_Transaction_Count,Distance_Between_Transactions_km,Time_Since_Last_Transaction_min,Authentication_Method,Transaction_Velocity,Transaction_Category,isFraud
69635000,01-01-2024 00:00,00:00:00,Surkhandarya,UzCard,UZS,Successful,35,3481.19,30,2FA,5,Transfer,Yes
53486000,01-01-2024 00:01,00:01:00,Namangan,UzCard,USD,Successful,35,4341.04,1073,Biometric,9,Cash Out,Yes
24262000,01-01-2024 00:02,00:02:00,Navoiy,Humo,UZS,Reversed,25,4780.35,132,2FA,7,Cash In,Yes
56019000,01-01-2024 00:03,00:03:00,Bukhara,Humo,UZS,Failed,44,719.43,41,Biometric,1,Payment,Yes
87823000,01-01-2024 00:04,00:04:00,Andijan,Humo,UZS,Failed,21,4691.06,458,Password,8,Cash Out,Yes
86470000,01-01-2024 00:05,00:05:00,Navoiy,UzCard,UZS,Reversed,15,4675.01,561,Biometric,2,Payment,Yes
61989000,01-01-2024 00:06,00:06:00,Sirdarya,UzCard,USD,Failed,22,3078.4,9,Password,8,Cash In,Yes
10491000,01-01-2024 00:07,00:07:00,Andijan,Humo,UZS,Successful,39,174.5,738,2FA,9,Payment,Yes
71688000,01-01-2024 00:08,00:08:00,Surkhandarya,UzCard,UZS,Successful,48,2137.96,292,2FA,7,Cash In,Yes
2122000,01-01-2024 00:09,00:09:00,Kashkadarya,Humo,USD,Failed,33,2116.76,724,Biometric,8,Cash In,Yes"""

with open('public/data/transactions.csv', 'w') as f:
    f.write(csv_content)

print("✓ CSV file created successfully at public/data/transactions.csv")
