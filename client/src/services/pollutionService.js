// const getAuthToken = () => {
//   return localStorage.getItem("authToken");
// };
// services/pollutionService.js
export const fetchAirPollutionDataByCity = async (city) => {
  try {
    const res = await fetch(`http://localhost:5001/air-quality/city?city=${city}`);
    if (!res.ok) throw new Error("Failed to fetch air pollution data");
    return await res.json();
  } catch (err) {
    throw new Error("API error: " + err.message);
  }
};
