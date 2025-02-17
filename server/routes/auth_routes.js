import express from "express";
import { registerUser, loginUser, homeRoute } from "../controller/auth_cont.js";
import axios from "axios";

const router = express.Router();
const API_KEY = "c8c6c21e-7643-46dd-bc5f-036444b98806";

// Get user profile by ID
router.post("/register", registerUser);

// Update user profile
router.post("/", loginUser);

router.get("/home/:id", homeRoute);

router.get("/air-quality", async (req, res) => {
    try {
        let { city } = req.query;

        if (!city || city.trim().length < 3) {
            return res.status(400).json({ error: "Provide a valid city name with at least 3 characters." });
        }

        console.log("Using city name, hitting city API...");
        const state = "Maharashtra";
        const country = "India";
        const url = "https://api.airvisual.com/v2/city";
        const params = { city, state, country, key: API_KEY };

        console.log("Making request to:", url, params);
        const response = await axios.get(url, { params });

        if (!response.data || response.data.status === "fail") {
            return res.status(500).json({ error: response.data.data?.message || "API error" });
        }

        const data = response.data.data;
        return res.json({
            city: data.city,
            lat: data.location.coordinates[1],
            lon: data.location.coordinates[0],
            aqi: data.current.pollution.aqius,
            pollutant: data.current.pollution.mainus,
        });
    } catch (error) {
        console.error("Backend error:", error.message);
        if (error.response && error.response.status === 429) {
            return res.status(429).json({ error: "API rate limit exceeded. Please try again later." });
        }
        return res.status(500).json({ error: "Server error" });
    }
});

export default router;
