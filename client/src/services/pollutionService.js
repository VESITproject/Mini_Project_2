import axios from "axios";

export const fetchAirPollutionData = async ({ city }) => {
    try {
      const response = await axios.get("http://localhost:5001/air-quality", {
        params: { city },
      });
  
      console.log("✅ Air Pollution Data Response:", response.data);
  
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching air pollution data:", error.message);
      return null;
    }
  };
