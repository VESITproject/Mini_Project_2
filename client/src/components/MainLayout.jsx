import React, { useState, useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";
import MapComponent from "./mapComponent";
import { Typography, Button, Modal, Box, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAirPollutionData } from "../services/pollutionService";
import "../styles/base_ui.css";
import { FilterIcon, TrendingUpIcon } from "lucide-react";
import PollutionVisualizer from "../components/PollutionVisualizer";

function MainLayout({ searchQuery, setSearchQuery }) {
  const [location, setLocation] = useState("");
  const [airQualityData, setAirQualityData] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  // Default location (Mumbai)
  const defaultData = {
    lat: 0,
    lon: 0,
    city: "Unknown",
    aqi: "N/A",
    pollutant: "N/A",
  };
  

  useEffect(() => {
    if (searchQuery && !airQualityData) {
      handleFetchData(searchQuery);
    }
  }, [searchQuery]);

  const handleFetchData = async (city) => {
    if (!city || city.trim().length < 3) {
      alert("Please enter a valid city name with at least 3 characters.");
      return;
    }
  
    const formattedCity = city.trim().replace(/\s+/g, "+"); // Convert spaces to '+'
  
    setLoading(true);
    try {
      const data = await fetchAirPollutionData({ city: formattedCity });
      if (data.error || data.city_not_found) {
        throw new Error("City not found. Please enter a valid city.");
      }
      setAirQualityData(data || defaultData);
    } catch (error) {
      console.error("Fetch error:", error.message);
      alert(error.message || "Error fetching air pollution data. Showing default data for Mumbai.");
      setAirQualityData(defaultData);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(location.trim()); // Trim whitespace
    setSearchOpen(false);
    setLocation(""); // Clear input after submission
  };

  return (
    <div className="main-layout flex h-screen bg-gray-100">
      <div className="left">
        <Typography
          sx={{
            background: "linear-gradient(90deg, #42a5f5 5%, #1976d2 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "Roboto",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          Air Vision <AirIcon sx={{ color: "#42a5f5", fontSize: 40, verticalAlign: "middle" }} />
        </Typography>

        <Typography sx={{ color: "white", fontSize: "20px", mt: 2 }}>
          AirVision provides real-time air quality maps to help you monitor and
          understand environmental data for healthier living.
        </Typography>

        <div className="button_div">
          <IconButton 
            id="search_icon" 
            onClick={() => setSearchOpen(true)} 
            color="inherit"
            disabled={loading}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>

          {/* Search Modal */}
          <Modal open={searchOpen} onClose={() => setSearchOpen(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>Enter Location</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Enter city name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button 
                  type="submit" 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </form>
            </Box>
          </Modal>
        </div>

        {/* Filter and Trend Buttons */}
        <div className="button_div">
          <Button 
            variant="contained" 
            className="m-3 p-3 w-50 text-center" 
            color="primary" 
            onClick={() => navigate("/dashboard")} 
            startIcon={<TrendingUpIcon />}
            disabled={loading}
          >
            Trends
          </Button>
        </div>
      </div>

      {/* Map Section */}
      <div className="right d-flex">
        <MapComponent data={airQualityData || defaultData} />
        <div className="bg-black border-r-emerald-50 m-3 rounded p-3">
          <PollutionVisualizer data={airQualityData || defaultData} />
          {loading && (
            <Typography sx={{ color: "white", textAlign: "center" }}>
              Loading...
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;