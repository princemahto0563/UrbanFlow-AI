import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [hour, setHour] = useState(12);
  const [location, setLocation] = useState("A");
  const [day, setDay] = useState("weekday");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 REALISTIC FULL-DAY DATA
  const chartData = [
    { hour: "6 AM", A: 90, B: 70 },
    { hour: "7 AM", A: 200, B: 90 },
    { hour: "8 AM", A: 320, B: 100 },
    { hour: "9 AM", A: 420, B: 120 },
    { hour: "10 AM", A: 350, B: 150 },
    { hour: "12 PM", A: 220, B: 220 },
    { hour: "2 PM", A: 190, B: 280 },
    { hour: "4 PM", A: 260, B: 360 },
    { hour: "6 PM", A: 420, B: 500 },
    { hour: "8 PM", A: 300, B: 600 },
    { hour: "10 PM", A: 150, B: 520 },
  ];

  // 🔥 BACKEND CALL (NO CHANGE)
  const handlePredict = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://urbanflow-ai-rwfw.onrender.com/predict",
        {
          hour: Number(hour),
          location,
          day_type: day,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Backend not connected!");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 COLOR LOGIC
  const getColor = (value) => {
    if (!value) return "text-gray-400";
    if (value > 500) return "text-red-500";
    if (value > 350) return "text-orange-400";
    if (value > 200) return "text-yellow-400";
    return "text-green-400";
  };

  // 🔥 PEAK TAG
  const getPeakTag = () => {
    if (hour >= 8 && hour <= 10 && location === "A") {
      return "🏢 Business Rush Hour";
    }
    if (hour >= 18 && hour <= 22 && location === "B") {
      return "🎉 Entertainment Peak Time";
    }
    return "🕒 Normal Traffic";
  };

  // 🔥 STATS
  const stats = [
    { title: "Avg Demand", value: "320" },
    { title: "Peak Hour", value: "7 PM" },
    { title: "Growth", value: "+18%" },
  ];

  return (
    <div className="space-y-6">

      {/* 🔥 TOP STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="bg-card p-5 rounded-2xl text-center border border-gray-800 hover:shadow-[0_0_20px_#00f5ff] transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-gray-400 text-sm">{item.title}</h3>
            <p className="text-2xl font-bold text-primary mt-2">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <motion.div
          className="bg-card p-6 rounded-2xl border border-gray-800 hover:shadow-[0_0_25px_#00f5ff] transition"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-primary">
            🎯 Prediction Panel
          </h2>

          <label className="text-sm text-gray-400">Hour: {hour}</label>
          <input
            type="range"
            min="0"
            max="23"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full mb-4"
          />

          <select
            className="w-full mb-4 p-2 bg-dark rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="A">Zone A — Business 🏢</option>
            <option value="B">Zone B — Entertainment 🎉</option>
          </select>

          <select
            className="w-full mb-4 p-2 bg-dark rounded"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            <option value="weekday">Weekday</option>
            <option value="weekend">Weekend</option>
          </select>

          <button
            onClick={handlePredict}
            className="w-full bg-primary text-black py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            {loading ? "⏳ Predicting..." : "🔮 Predict Demand"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-400">
            {getPeakTag()}
          </p>
        </motion.div>

        {/* RESULT PANEL */}
        <motion.div
          className="bg-card p-6 rounded-2xl flex flex-col justify-center items-center border border-gray-800 hover:shadow-[0_0_25px_#22c55e] transition"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-primary">
            📊 Result
          </h2>

          {result ? (
            <>
              <h1 className={`text-5xl font-bold ${getColor(result.prediction)}`}>
                {result.prediction}
              </h1>

              <p className="mt-2 font-semibold text-lg">
                {result.category}
              </p>

              <p className="text-sm text-gray-400 text-center mt-2 max-w-xs">
                {result.insight}
              </p>

              {/* 🔥 NEW ADDED (SURGE + INCENTIVE) */}
              <div className="mt-4 text-center space-y-1">
                <p className="text-cyan-400 font-semibold">
                  💰 Surge: {result.surge_multiplier}x
                </p>

                <p className="text-green-400 font-medium">
                  🚗 Incentive: {result.driver_incentive}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400">No prediction yet</p>
          )}
        </motion.div>

      </div>

      {/* GRAPH */}
      <motion.div
        className="bg-card p-6 rounded-2xl border border-gray-800 hover:shadow-[0_0_30px_#22c55e] transition"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-primary">
          📈 Demand Trend Analysis
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#222" strokeDasharray="4 4" />
            <XAxis dataKey="hour" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="A"
              stroke="#00f5ff"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Business Area"
            />

            <Line
              type="monotone"
              dataKey="B"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              name="Entertainment Area"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}