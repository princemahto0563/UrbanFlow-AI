# 🚗 UrbanFlow AI

### 🚀 Smart Urban Mobility Demand Prediction System

UrbanFlow AI is a full-stack AI-powered web application that predicts ride demand based on time, location, and day type. It helps optimize driver allocation, reduce passenger waiting time, and improve overall transportation efficiency.

---

## 🌟 Features

* 🔮 AI-based demand prediction
* 📊 Demand categorization (Low / Medium / High)
* 📈 Interactive demand trend visualization
* 💡 Smart insights for drivers
* ⚡ Real-time API integration
* 🎨 Modern responsive UI (React + Tailwind)
* 🔥 Smooth animations & dashboard

---

## 🧠 How It Works

1. User inputs:

   * Hour (0–23)
   * Location (Zone A / Zone B)
   * Day Type (Weekday / Weekend)

2. Backend processes data using a **Random Forest ML model**

3. System predicts:

   * Ride demand
   * Demand category
   * Actionable insights

---

## 🏗️ Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Recharts (Graphs)
* Framer Motion (Animations)

### 🔹 Backend

* FastAPI
* Scikit-learn (ML Model)
* Pandas & NumPy

---

## 📁 Project Structure

```
UrbanFlow-AI/
│
├── backend/
│   ├── main.py
│   ├── model.py
│   ├── data.csv
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   └── components/
│   │       └── Dashboard.jsx
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
pip install fastapi uvicorn pandas scikit-learn
uvicorn main:app --reload
```

API will run on:

```
http://127.0.0.1:8000
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 📡 API Endpoint

### 🔹 POST /predict

Request:

```json
{
  "hour": 18,
  "location": "A",
  "day_type": "weekday"
}
```

Response:

```json
{
  "prediction": 380,
  "category": "High",
  "insight": "🔥 High demand! Drivers should move to this zone."
}
```

---

## 🎯 Use Cases

* Ride-sharing platforms (Uber/Ola)
* Smart city traffic management
* Driver route optimization
* Demand forecasting systems

---

## 🚀 Future Enhancements

* 📍 Multi-zone city modeling
* 🗺️ Heatmap visualization
* 🔗 Real-time traffic data integration
* 🤖 Deep learning models (LSTM)
* 📱 Mobile app integration

---

## 👨‍💻 Author

**Prince Mahto**

---

## 🏆 Hackathon Project

Built for **Innovathon 2.0 (GFG X RIT)**
Focused on solving real-world urban mobility challenges using AI.

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and support innovation!
