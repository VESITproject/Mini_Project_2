import React, { useState } from "react";
import { FilterIcon } from "lucide-react";
import Navbar from "./navbar";
import MapComponent from "./mapComponent";
import Footer from "./footer";
import { Typography, Button, Modal, Box, Select, MenuItem } from "@mui/material";
import { fetchAirPollutionData } from "../services/pollutionService"; 
import { fetchWeatherData } from "../services/weatherService"; 
import "../styles/map.css";

function Map() {
  const pollutantOptions = {
    p2: "PM2.5",
    p1: "PM10",
    co: "CO",
    no2: "NO2",
    o3: "O3",
    so2: "SO2",
  };

  const filterOptions = ["Air Quality", "Heat Map", "Wind Speed", "Climate"];

  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [pollutant, setPollutant] = useState("");
  const [filterType, setFilterType] = useState("Air Quality");
  const [data, setData] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    const finalLat = latitude || "19.0760"; // Mumbai lat
    const finalLon = longitude || "72.8777"; // Mumbai lon

    setLatitude(finalLat);
    setLongitude(finalLon);

    try {
      if (filterType === "Air Quality") {
        const pollutionData = await fetchAirPollutionData(finalLat, finalLon);
        setData({ type: "pollution", payload: pollutionData, pollutant: pollutantOptions[pollutant] });
      } 
      else if (filterType === "Heat Map") {
        const weatherData = await fetchWeatherData(finalLat, finalLon);
        setData({ type: "heatmap", payload: weatherData });
      } 
      else if (filterType === "Wind Speed") {
        const windData = await fetchWeatherData(finalLat, finalLon);
        setData({ type: "wind", payload: windData });
      } 
      else if (filterType === "Climate") {
        const climateData = await fetchWeatherData(finalLat, finalLon);
        setData({ type: "climate", payload: climateData });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="map-wrapper">
        <h2 className="map-title">Environment Monitoring Map</h2>

        <h1 className="mt-4 text-sm text-white text-center">
          Interactive data visualization based on your selection.
        </h1>

        {/* Filter Button */}
        <Button className="filter-button" onClick={handleOpen} startIcon={<FilterIcon />}>
          Filters
        </Button>

        {/* Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box className="filter-modal">
            <Typography className="filter-header">Apply Filters</Typography>

            <form onSubmit={handleSubmit}>
              {/* Select Type of Data */}
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                Select Data Type:
              </Typography>
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

              {/* Coordinates */}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Enter Coordinates:
              </Typography>
              <input
                className="input-box"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <input
                className="input-box"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />

              {/* Location (optional) */}
              <input
                className="input-box"
                placeholder="Location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              {/* Pollutant Dropdown - Only if Air Quality */}
              {filterType === "Air Quality" && (
                <>
                  <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Select Pollutant:
                  </Typography>
                  <Select
                    className="dropdown-select"
                    value={pollutant}
                    onChange={(e) => setPollutant(e.target.value)}
                    fullWidth
                  >
                    {Object.entries(pollutantOptions).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}

              <Button type="submit" className="apply-filter-btn" fullWidth sx={{ mt: 2 }}>
                Apply Filters
              </Button>
            </form>
          </Box>
        </Modal>

        {/* Map Area */}
        <div className="map-area">
          <MapComponent data={data} /> {/* Passing dynamic data */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Map;
