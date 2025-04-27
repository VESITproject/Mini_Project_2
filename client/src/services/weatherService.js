import axios from 'axios';
import { API_KEY } from '../services/helper'; // Ensure you have your API key in a config file

export const fetchWeatherData = async (lat, lon) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.data;
};
