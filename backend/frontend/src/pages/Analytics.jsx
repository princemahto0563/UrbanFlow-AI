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
  BarChart,
  Bar,
} from "recharts";

export default function Analytics() {

  // 🔥 REALISTIC DATA
  const trendData = [
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

  const peakData = [
    { zone: "Business", demand: 470 },
    { zone: "Entertainment", demand: 650 },
  ];

  const stats = [
    { title: "Max Demand", value: "650+" },
    { title: "Peak Time", value: "8 PM" },
    { title: "Growth Rate", value: "+22%" },
  ];

  return (
    <div className="space-y-8">

      {/* 🔥 TITLE */}
      <motion.h1
        className="text-3xl font-bold text-primary text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        📊 Advanced Analytics Dashboard
      </motion.h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            className="bg-card p-6 rounded-2xl text-center border border-gray-800 hover:shadow-[0_0_25px_#00f5ff] transition"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-gray-400">{item.title}</h3>
            <p className="text-3xl font-bold text-primary mt-2">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 📈 LINE CHART */}
      <motion.div
        className="bg-card p-6 rounded-2xl border border-gray-800 hover:shadow-[0_0_25px_#22c55e] transition"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-primary">
          📈 Demand Trend (Zone A vs B)
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={trendData}>
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

      {/* 📊 BAR CHART */}
      <motion.div
        className="bg-card p-6 rounded-2xl border border-gray-800 hover:shadow-[0_0_25px_#00f5ff] transition"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-primary">
          🚀 Peak Demand Comparison
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={peakData}>
            <CartesianGrid stroke="#222" />
            <XAxis dataKey="zone" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="demand" fill="#00f5ff" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* 🧠 INSIGHTS */}
      <motion.div
        className="bg-card p-6 rounded-2xl border border-gray-800 text-center hover:shadow-[0_0_30px_#22c55e] transition"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold text-primary mb-4">
          🧠 AI Insights
        </h2>

        <p className="text-gray-400">
          • Business zones peak during morning (8–10 AM)
        </p>
        <p className="text-gray-400">
          • Entertainment zones peak during evening & night (6–10 PM)
        </p>
        <p className="text-gray-400">
          • Weekend demand spikes significantly in entertainment zones
        </p>
        <p className="text-gray-400">
          • Smart driver allocation can reduce wait time by 30%
        </p>
      </motion.div>

    </div>
  );
}