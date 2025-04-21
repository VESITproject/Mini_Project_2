import React, { useState } from "react";
import { FilterIcon } from "lucide-react";
import Navbar from "./navbar";
import MapComponent from "./mapComponent";
import Footer from "./footer";
import { Typography, Button, Modal, Box, Select, MenuItem } from "@mui/material";
import "../styles/map.css"; // Updated class names

function Map({data}) {
  const pollutantOptions = {
    p2: "PM2.5",
    p1: "PM10",
    co: "CO",
    no2: "NO2",
    o3: "O3",
    so2: "SO2",
  };

  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [location, setLocation] = useState("");
  const [pollutant, setPollutant] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(false);

    const finalLat = latitude || "19.0760"; // Default to Mumbai coordinates
    const finalLon = longitude || "72.8777"; 
    const finalCity = location || "Mumbai";

    setLatitude(finalLat);
    setLongitude(finalLon);
    setLocation(finalCity);
    setPollutant(pollutantOptions[pollutant] || pollutant);
  };

  return (
    <div>
      <Navbar />
      <div className="map-wrapper">
        <h2 className="map-title">Air Quality Map</h2>

        <h1 className="mt-4 text-sm text-white text-center">
          Interactive map will be displayed here.
        </h1>

        <Button className="filter-button" onClick={handleOpen} startIcon={<FilterIcon />}>
          Filters
        </Button>

        {/* Filter Modal */}
        <Modal open={open} onClose={handleClose}>
          <Box className="filter-modal">
            <Typography className="filter-header">Filter Air Quality Data</Typography>

            <form onSubmit={handleSubmit}>
              <Typography variant="subtitle1">Enter Coordinates or Location:</Typography>
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
              <input
                className="input-box"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

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

              <Button type="submit" className="apply-filter-btn" fullWidth>
                Apply Filters
              </Button>
            </form>
          </Box>
        </Modal>

        <div className="map-area">
          <MapComponent data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Map;
