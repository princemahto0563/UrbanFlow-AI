import { motion } from "framer-motion";
import Dashboard from "./components/Dashboard";

// 🔥 Routing
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// 🔥 Pages
import About from "./pages/About.jsx";
import Analytics from "./pages/Analytics.jsx";

function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col overflow-hidden">

      {/* 🌌 MAIN ANIMATION WRAPPER */}
      <motion.div
        className="flex flex-col flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        {/* 🔥 NAVBAR */}
        <header className="flex justify-between items-center px-8 py-4 bg-card/70 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">

          {/* LOGO CLICKABLE */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full object-cover transition group-hover:scale-110 group-hover:shadow-[0_0_15px_#00f5ff]"
            />
            <h1 className="text-xl font-bold text-primary tracking-wide group-hover:text-white transition">
              UrbanFlow AI
            </h1>
          </div>

          {/* 🔥 NAV LINKS */}
          <nav className="flex gap-6 text-gray-400 text-sm font-medium">
            <Link to="/" className="hover:text-primary transition hover:scale-105">
              Dashboard
            </Link>
            <Link to="/analytics" className="hover:text-primary transition hover:scale-105">
              Analytics
            </Link>
            <Link to="/about" className="hover:text-primary transition hover:scale-105">
              About
            </Link>
          </nav>
        </header>

        {/* 🚀 HERO SECTION */}
        <section className="text-center py-14 px-4 relative">

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            🚗{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Smart Urban Mobility Intelligence
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            AI-powered demand prediction system designed to optimize driver allocation,
            reduce wait times, and improve smart city transportation efficiency.
          </motion.p>

          {/* 🔥 CTA BUTTON */}
          <motion.button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 rounded-full bg-primary text-black font-semibold shadow-lg hover:scale-105 transition"
            whileHover={{ scale: 1.08 }}
          >
            🚀 Explore Dashboard
          </motion.button>

        </section>

        {/* 🔥 FEATURE CARDS */}
        <section className="px-6 grid md:grid-cols-3 gap-6 mb-10">

          {[
            {
              title: "Real-Time Prediction",
              desc: "Instantly forecast ride demand using AI models.",
            },
            {
              title: "Smart Insights",
              desc: "Get actionable suggestions for driver allocation.",
            },
            {
              title: "Demand Visualization",
              desc: "Interactive graphs for better decision making.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-card p-6 rounded-2xl border border-gray-800 text-center hover:shadow-[0_0_20px_#00f5ff] transition"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}

        </section>

        {/* 📊 ROUTES */}
        <main className="px-6 pb-10 flex-1">
          <Routes>

            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* 🔥 Analytics FULL PAGE */}
            <Route path="/analytics" element={<Analytics />} />

            {/* About */}
            <Route path="/about" element={<About />} />

          </Routes>
        </main>

        {/* 🔻 FOOTER */}
        <footer className="text-center text-gray-500 text-sm py-5 border-t border-gray-800">
          © 2026 UrbanFlow AI • Built by{" "}
          <span className="text-primary font-semibold">Prince Mahto</span>
        </footer>

      </motion.div>
    </div>
  );
}

export default App;