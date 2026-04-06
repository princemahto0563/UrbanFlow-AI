// SAME IMPORTS (NO CHANGE)
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
  const [weather, setWeather] = useState("clear");
  const [event, setEvent] = useState("none");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handlePredict = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://urbanflow-ai-rwfw.onrender.com/predict",
        {
          hour: Number(hour),
          location,
          day_type: day,
          weather,
          event
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

  const getColor = (value) => {
    if (!value) return "text-gray-400";
    if (value > 500) return "text-red-500";
    if (value > 350) return "text-orange-400";
    if (value > 200) return "text-yellow-400";
    return "text-green-400";
  };

  const getPeakTag = () => {
    if (hour >= 8 && hour <= 10 && location === "A") {
      return "🏢 Business Rush Hour";
    }
    if (hour >= 18 && hour <= 22 && location === "B") {
      return "🎉 Entertainment Peak Time";
    }
    return "🕒 Normal Traffic";
  };

  // ✅ NEW ADD (TIME LABEL FUNCTION)
  const getTimeLabel = (hour) => {
    if (hour >= 5 && hour < 12) return "🌅 Morning";
    if (hour >= 12 && hour < 17) return "☀️ Afternoon";
    if (hour >= 17 && hour < 21) return "🌆 Evening Peak";
    return "🌙 Night";
  };

  const stats = [
    { title: "Avg Demand", value: "320" },
    { title: "Peak Hour", value: "7 PM" },
    { title: "Growth", value: "+18%" },
  ];

  return (
    <div className="space-y-8">

      {/* 🔥 STATS WITH GLOW */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            className="bg-card p-6 rounded-2xl text-center border border-gray-800 shadow-lg hover:shadow-[0_0_30px_#00f5ff] transition duration-300"
          >
            <h3 className="text-gray-400 text-sm">{item.title}</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* 🔥 LEFT PANEL */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card p-6 rounded-2xl border border-gray-800 shadow-xl hover:shadow-[0_0_40px_#00f5ff] transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-primary">
            🎯 Prediction Panel
          </h2>

          <label>Hour: {hour}</label>

          {/* ✅ NEW ADD (TIME LABEL UI) */}
          <p className="text-sm text-cyan-400 mb-2">
            {getTimeLabel(hour)} ({hour}:00)
          </p>

          <input type="range" min="0" max="23" value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full mb-4 accent-cyan-400"
          />

          <select className="w-full mb-3 p-2 bg-dark rounded border border-gray-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}>
            <option value="A">Zone A — Business 🏢</option>
            <option value="B">Zone B — Entertainment 🎉</option>
          </select>

          <select className="w-full mb-3 p-2 bg-dark rounded border border-gray-700"
            value={day}
            onChange={(e) => setDay(e.target.value)}>
            <option value="weekday">Weekday</option>
            <option value="weekend">Weekend</option>
          </select>

          <select className="w-full mb-3 p-2 bg-dark rounded border border-gray-700"
            value={weather}
            onChange={(e) => setWeather(e.target.value)}>
            <option value="clear">☀️ Clear</option>
            <option value="rain">🌧️ Rain</option>
            <option value="hot">🔥 Hot</option>
          </select>

          <select className="w-full mb-4 p-2 bg-dark rounded border border-gray-700"
            value={event}
            onChange={(e) => setEvent(e.target.value)}>
            <option value="none">No Event</option>
            <option value="concert">🎤 Live Concert</option>
            <option value="match">🏏 Cricket Match</option>
            <option value="college">🎓 College Fest</option>
            <option value="mall">🛍️ Mall Mega Sale</option>
            <option value="transport">🚉 Travel Rush</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePredict}
            className="w-full bg-primary text-black py-2 rounded-lg font-bold shadow-lg hover:shadow-[0_0_20px_#00f5ff]"
          >
            {loading ? "⏳ Predicting..." : "🔮 Predict Demand"}
          </motion.button>

          <p className="mt-3 text-center text-gray-400 text-sm">
            {getPeakTag()}
          </p>
        </motion.div>

        {/* 🔥 RESULT PANEL */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-card p-6 rounded-2xl flex flex-col justify-center items-center border border-gray-800 shadow-xl hover:shadow-[0_0_40px_#22c55e]"
        >
          <h2 className="text-xl font-semibold mb-4 text-primary">
            📊 Result
          </h2>

          {result ? (
            <>
              <h1 className={`text-6xl font-extrabold ${getColor(result.prediction)}`}>
                {result.prediction}
              </h1>

              <p className="mt-2 text-lg font-semibold">{result.category}</p>

              <p className="text-sm text-gray-400 mt-2 text-center max-w-xs">
                {result.insight}
              </p>

              <div className="mt-5 text-center space-y-2">
                <p className="text-cyan-400 font-bold text-lg">
                  💰 Surge: {result.surge_multiplier}x
                </p>
                <p className="text-green-400 text-lg font-semibold">
                  🚗 {result.driver_incentive}
                </p>
              </div>
            </>
          ) : (
            <p className="text-gray-400">No prediction yet</p>
          )}
        </motion.div>

      </div>

      {/* 🔥 GRAPH */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-6 rounded-2xl border border-gray-800 shadow-xl hover:shadow-[0_0_40px_#22c55e]"
      >
        <h2 className="text-xl font-semibold mb-4 text-primary">
          📈 Demand Trend Analysis
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#222" strokeDasharray="5 5" />
            <XAxis dataKey="hour" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="A"
              stroke="#00f5ff" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }}
            />

            <Line type="monotone" dataKey="B"
              stroke="#22c55e" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

    </div>
  );
}