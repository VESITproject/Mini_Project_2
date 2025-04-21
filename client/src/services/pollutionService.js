import axios from 'axios';
// import {BASE_URL}from "./helper"
export const fetchAirPollutionData = async ({ city }) => {
  try {
    const response = await fetch(`http://localhost:5001/air-quality?city=${encodeURIComponent(city)}`);
    
    if (!response.ok) {
      const errorData = await response.json(); // Capture error details
      console.error("API Response Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch air quality data");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching air pollution data:", error.message);
    return { error: error.message };
  }
};
