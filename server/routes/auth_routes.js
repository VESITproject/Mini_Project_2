// routes/authRoute.js
import express from "express";
import { registerUser, loginUser, homeRoute } from "../controllers/auth_cont.js";
// import axios from "axios";
import dotenv from "dotenv";
// import authenticateJWT from "../middleware/auth.js";  // Correct import for authenticateJWT
// routes/airQualityRoute.js
// import express from "express";
import fetch from "node-fetch";
// import dotenv from "dotenv";


dotenv.config(); // Load environment variables

const authRoute = express.Router();

// API keys
// const OPENCAGE_API_KEY = "15c46155180c41e695d6da3e683b9625";
// const AIRVISUAL_API_KEY = "ad07463a0d6095307a9e826970fdd56a";
const OPENWEATHERMAP_API_KEY = "95a4a6cb3d4959918f44e4b88b2b0bf4";
// const AQCI = "a109ea80ea15e3002eeb17f1902cf61eb9b61451"
// Routes
authRoute.post("/register", registerUser);
authRoute.post("/", loginUser);
authRoute.get("/home/:id", homeRoute);


authRoute.get("/air-quality/city", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const geoRes = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`
    );
    const geoData = await geoRes.json();

    if (!geoData.length) {
      return res.status(404).json({ error: "City not found" });
    }

    const { lat, lon } = geoData[0];

    const pollutionRes = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    const pollutionData = await pollutionRes.json();

    res.json(pollutionData);
  } catch (error) {
    console.error("❌ Error in air-quality/city:", error.message);
    res.status(500).json({ error: "Failed to fetch air pollution data" });
  }
});

export default authRoute;
