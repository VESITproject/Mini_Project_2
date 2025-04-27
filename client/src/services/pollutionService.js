import axios from 'axios';
import { BASE_URL } from './helper';
import { API_KEY } from './helper'; // Ensure you have your API key in a config file

export const fetchAirPollutionData = async ({ city }) => {
  try {
    // const Key = 'c8c6c21e-7643-46dd-bc5f-036444b98806'; //  Use your  key here

    const response = await fetch(`${BASE_URL}/air-quality?city=${encodeURIComponent(city)}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(" Response Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch air quality data");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching air pollution data:", error.message);
    return { error: error.message }; // Return error in a consistent format
  }
};
// import axios from 'axios';

// import { API_KEY } from '../services/helper'; // Ensure you have your API key in a config file";

// export const fetchAirPollutionData = async (lat, lon) => {
//   const response = await axios.get(
//     `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//   );
//   return response.data;
// };
