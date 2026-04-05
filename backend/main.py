# backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_demand

# -----------------------------
# App Initialization
# -----------------------------
app = FastAPI(
    title="UrbanFlow AI API",
    description="AI-powered Ride Demand Prediction System",
    version="2.0.0"
)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Request Schema
# -----------------------------
class PredictionRequest(BaseModel):
    hour: int
    location: str
    day_type: str


# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def home():
    return {
        "status": "running",
        "message": "🚗 UrbanFlow AI Backend is Live"
    }


# -----------------------------
# Prediction API 🔥
# -----------------------------
@app.post("/predict")
def predict(data: PredictionRequest):
    try:
        # ✅ Input Validation
        if data.hour < 0 or data.hour > 23:
            raise HTTPException(status_code=400, detail="Hour must be 0-23")

        if data.location not in ["A", "B"]:
            raise HTTPException(status_code=400, detail="Location must be A or B")

        if data.day_type not in ["weekday", "weekend"]:
            raise HTTPException(status_code=400, detail="Invalid day type")

        # 🔥 ML Prediction
        prediction = predict_demand(
            data.hour,
            data.location,
            data.day_type
        )

        prediction = float(prediction)

        # 🔥 Smart Economic Layer
        pricing = get_dynamic_pricing(prediction)

        # ✅ Final Response
        return {
            "prediction": round(prediction, 2),
            "category": get_category(prediction),
            "insight": get_insight(prediction),
            "surge_multiplier": pricing["surge"],
            "driver_incentive": pricing["incentive"]
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        print("❌ ERROR:", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


# -----------------------------
# Helper Functions
# -----------------------------

# 🔥 Demand Category
def get_category(value):
    if value > 400:
        return "High"
    elif value > 200:
        return "Medium"
    return "Low"


# 🔥 Insight Engine
def get_insight(value):
    if value > 400:
        return "🔥 Extreme demand! Immediate driver shift required."
    elif value > 200:
        return "⚠️ Moderate demand. Balanced driver allocation needed."
    return "✅ Low demand. Drivers can relocate."


# 🔥 Dynamic Pricing + Incentive Engine (X-FACTOR 💀)
def get_dynamic_pricing(value):
    if value > 500:
        return {
            "surge": 2.0,
            "incentive": "🔥 High Bonus + Priority Zone"
        }
    elif value > 350:
        return {
            "surge": 1.6,
            "incentive": "💰 Medium Bonus"
        }
    elif value > 200:
        return {
            "surge": 1.3,
            "incentive": "⚡ Small Bonus"
        }
    else:
        return {
            "surge": 1.0,
            "incentive": "No Bonus"
        }