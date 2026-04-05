# backend/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import predict_demand
import uvicorn

# -----------------------------
# App Initialization
# -----------------------------
app = FastAPI(
    title="UrbanFlow AI API",
    description="AI-powered Ride Demand Prediction System",
    version="1.0.0"
)

# -----------------------------
# CORS (Frontend connect ke liye 🔥)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # dev ke liye OK
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
# Prediction API
# -----------------------------
@app.post("/predict")
def predict(data: PredictionRequest):
    try:
        # Input validation
        if data.hour < 0 or data.hour > 23:
            raise HTTPException(status_code=400, detail="Hour must be 0-23")

        if data.location not in ["A", "B"]:
            raise HTTPException(status_code=400, detail="Location must be A or B")

        if data.day_type not in ["weekday", "weekend"]:
            raise HTTPException(status_code=400, detail="Invalid day type")

        # 🔥 Model prediction
        prediction = predict_demand(
            data.hour,
            data.location,
            data.day_type
        )

        # 🔥 Safe numeric conversion
        prediction = float(prediction)

        # Response (frontend friendly)
        return {
            "prediction": round(prediction, 2),
            "category": get_category(prediction),
            "insight": get_insight(prediction)
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        print("❌ ERROR:", e)  # debug console me dikhega
        raise HTTPException(status_code=500, detail="Internal Server Error")


# -----------------------------
# Helper Functions
# -----------------------------
def get_category(value):
    if value > 250:
        return "High"
    elif value > 150:
        return "Medium"
    return "Low"


def get_insight(value):
    if value > 250:
        return "🔥 High demand! Drivers should move to this zone."
    elif value > 150:
        return "⚠️ Moderate demand. Stable ride opportunities."
    return "✅ Low demand. Consider switching zones."


# -----------------------------
# Run Server
# -----------------------------
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)