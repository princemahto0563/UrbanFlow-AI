# backend/model.py

import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os
import numpy as np

# -----------------------------
# Load Dataset (safe path)
# -----------------------------
BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, "data.csv")

try:
    data = pd.read_csv(DATA_PATH)
except Exception as e:
    print("❌ Error loading CSV:", e)
    data = pd.DataFrame(columns=['hour','location','day_type','demand'])

# -----------------------------
# 🔥 DATA CLEANING (VERY IMPORTANT)
# -----------------------------

# Remove invalid rows
data = data[pd.to_numeric(data['hour'], errors='coerce').notnull()]
data = data[pd.to_numeric(data['demand'], errors='coerce').notnull()]

# Convert types
data['hour'] = data['hour'].astype(int)
data['demand'] = data['demand'].astype(float)

# Drop missing
data = data.dropna()

# -----------------------------
# Encoding (FIXED)
# -----------------------------
data['location'] = data['location'].map({'A': 0, 'B': 1}).fillna(0)
data['day_type'] = data['day_type'].map({'weekday': 0, 'weekend': 1}).fillna(0)

# -----------------------------
# Feature Engineering
# -----------------------------
def create_features(df):
    df['is_peak'] = df['hour'].apply(lambda x: 1 if 17 <= x <= 21 else 0)
    df['is_morning'] = df['hour'].apply(lambda x: 1 if 7 <= x <= 10 else 0)
    df['is_night'] = df['hour'].apply(lambda x: 1 if x <= 5 or x >= 22 else 0)
    return df

data = create_features(data)

# -----------------------------
# 🚨 Empty Data Check (FIXED)
# -----------------------------
if data.empty:
    raise ValueError("❌ Dataset is empty or not loaded properly")

# -----------------------------
# Features & Target
# -----------------------------
features = ['hour', 'location', 'day_type', 'is_peak', 'is_morning', 'is_night']

X = data[features]
y = data['demand']

# -----------------------------
# Train/Test Split
# -----------------------------
if len(data) > 10:
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
else:
    X_train, X_test, y_train, y_test = X, X, y, y

# -----------------------------
# Model Training (Stable)
# -----------------------------
model = RandomForestRegressor(
    n_estimators=250,
    max_depth=10,
    min_samples_split=4,
    min_samples_leaf=2,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------------
# Evaluation
# -----------------------------
try:
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"✅ Model trained successfully | MAE: {mae:.2f}")
except:
    print("⚠️ Evaluation skipped")

# -----------------------------
# Save Model
# -----------------------------
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
joblib.dump(model, MODEL_PATH)

# -----------------------------
# Prediction Function (FIXED)
# -----------------------------
def predict_demand(hour, location, day_type):
    try:
        hour = int(hour)

        loc = 0 if location == 'A' else 1
        day = 0 if day_type == 'weekday' else 1

        is_peak = 1 if 17 <= hour <= 21 else 0
        is_morning = 1 if 7 <= hour <= 10 else 0
        is_night = 1 if hour <= 5 or hour >= 22 else 0

        input_data = [[hour, loc, day, is_peak, is_morning, is_night]]

        # ✅ FIX: proper dataframe with column names
        prediction = model.predict(pd.DataFrame(input_data, columns=features))[0]

        return round(float(prediction), 2)

    except Exception as e:
        print("❌ Prediction Error:", e)
        return 0


# -----------------------------
# Insight Engine
# -----------------------------
def get_demand_insight(prediction):
    try:
        if prediction > 600:
            return "🔥 Extreme Surge! Immediate driver deployment required"
        elif prediction > 400:
            return "🚨 High Demand! Surge pricing recommended"
        elif prediction > 200:
            return "⚠️ Moderate Demand. Balanced driver allocation needed"
        else:
            return "✅ Low Demand. Drivers can relocate"

    except:
        return "⚠️ Unable to generate insight"


# -----------------------------
# Feature Importance
# -----------------------------
def get_feature_importance():
    try:
        importance = model.feature_importances_
        return dict(zip(features, importance))
    except:
        return {}