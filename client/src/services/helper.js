export const BASE_URL = "http://localhost:5001";
export const API_KEY ="ad07463a0d6095307a9e826970fdd56a"

// utils.js
export const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'green';
    if (aqi <= 100) return 'yellow';
    if (aqi <= 150) return 'orange';
    if (aqi <= 200) return 'red';
    if (aqi <= 300) return 'purple';
    return 'brown';
  };
  