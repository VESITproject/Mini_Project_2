import { useState, useEffect } from "react";
import { FilterIcon, Thermometer, Wind, Sun } from "lucide-react";
import Navbar from "./navbar";
import MapComponent from "./mapComponent";
import Footer from "./footer";
import {
  Typography,
  Button,
  Modal,
  Box,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { fetchAirPollutionDataByCity } from "../services/pollutionService";
import { fetchWeatherData } from "../services/weatherService";
import "../styles/map.css";

function Map() {
  const pollutantOptions = {
    pm2_5: "PM2.5",
    pm10: "PM10",
    co: "CO",
    no2: "NO2",
    o3: "O3",
    so2: "SO2",
  };

  const filterOptions = ["Air Quality", "Heat Map", "Wind Speed", "Climate"];

  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("Mumbai");
  const [pollutant, setPollutant] = useState("pm2_5");
  const [coordinates, setCoordinates] = useState(null);
  const [filterType, setFilterType] = useState("Air Quality");
  const [data, setData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userMapData"));
    const savedLocation = saved?.location || "Mumbai";
    const savedFilter = saved?.filterType || "Air Quality";
    const savedPollutant = saved?.pollutant || "pm2_5";

    setLocation(savedLocation);
    setFilterType(savedFilter);
    setPollutant(savedPollutant);

    fetchData(savedLocation, savedFilter, savedPollutant);
  }, []);
const fetchData = async (city, filter, pollutantKey) => {
  try {
    if (!city) return;

    if (filter === "Air Quality") {
      const pollutionData = await fetchAirPollutionDataByCity(city);
      const coords = pollutionData.coord || pollutionData.location?.coordinates;
      setData({
        type: "pollution",
        payload: pollutionData,
        pollutant: pollutantOptions[pollutantKey] || "N/A",
        city,
      });
      setCoordinates(coords);
      setLocation(city);
    } else {
      const weatherData = await fetchWeatherData(city);
      setData({
        type: filter.toLowerCase(),
        payload: weatherData,
        city,
      });
      setCoordinates(weatherData.coord); // ✅
      setLocation(city);
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    const newEntry = {
      location,
      pollutant,
      filterType,
    };

    localStorage.setItem("userMapData", JSON.stringify(newEntry));
    fetchData(location, filterType, pollutant);
  };

  return (
    <div>
      <Navbar />
      <div className="map-container">
        <div className="map-header">
          <h2>🌍 Environment Monitoring Map</h2>
          <p>Interactive visualization of real-time environmental data.</p>
        </div>

        <div className="map-controls">
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<FilterIcon />}
            className="filter-btn"
          >
            Filters
          </Button>
        </div>

        {/* Filter Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box className="filter-modal">
            <Typography className="filter-header">Apply Filters</Typography>
            <form onSubmit={handleSubmit}>
              <Typography>Select Data Type:</Typography>
              <Select
                className="dropdown-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                fullWidth
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                fullWidth
                label="City Name"
                placeholder="e.g., Mumbai"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{ mt: 2 }}
              />

             

              <Button type="submit" variant="contained" sx={{ mt: 3 }} fullWidth>
                Apply Filters
              </Button>
            </form>
          </Box>
        </Modal>

        {/* Map and Info */}
        <div className="map-content">
          <div className="map-area">
            <MapComponent data={data} />
          </div>
          <div className="info-panel">
            <h3>📊 Data Overview</h3>
            {data?.payload ? (
              <ul>
                {data.payload.main && (
                  <>
                    <li>
                      <Thermometer size={18} /> Temp: {data.payload.main.temp}°C
                    </li>
                    <li>
                      <Sun size={18} /> Feels like: {data.payload.main.feels_like}°C
                    </li>
                    <li>
                      <Wind size={18} /> Wind Speed: {data.payload.wind?.speed} m/s
                    </li>
                    <li>🌫 Humidity: {data.payload.main.humidity}%</li>
                    <li>
                      ☁️ Condition: {data.payload.weather?.[0]?.description}
                    </li>
                  </>
                )}
                {data.pollutant && (
                  <li>
                    🧪 Main Pollutant: <strong>{data.pollutant}</strong>
                  </li>
                )}
              </ul>
            ) : (
              <p>No data loaded. Please apply filters.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Map;
