import React, { useState, useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";
import MapComponent from "./mapComponent";
import { Typography, Button, Modal, Box, TextField, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAirPollutionData } from "../services/pollutionService";
import "../styles/base_ui.css";
import { FilterIcon , TrendingUpIcon  } from "lucide-react";
function MainLayout({ searchQuery, setSearchQuery }) {
  const [location, setLocation] = useState("");
  const [airQualityData, setAirQualityData] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch data when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      handleFetchData(searchQuery);
    }
  }, [searchQuery]);

  const handleFetchData = async (city) => {
    if (!city || city.length < 3) {
      alert("Please enter a valid city name.");
      return;
    }

    try {
      const data = await fetchAirPollutionData({ city });
      if (data) {
        setAirQualityData(data);
      }
    } catch (error) {
      alert("Error fetching air pollution data.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(location); // Update searchQuery
    handleFetchData(location); // Fetch data after search
    setSearchOpen(false); // Close modal after search
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
          <IconButton onClick={() => setSearchOpen(true)} color="inherit">
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
              <Typography variant="h6" sx={{ mb: 2 }}>
                Enter Location
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Enter city name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                  Search
                </Button>
              </form>
            </Box>
          </Modal>
        </div>

        {/* Filter and Trend Buttons */}
        <div className="button_div">
          <Button
            variant="contained"
            color="primary"
            className="m-3"
            startIcon={<FilterIcon />}
          >
            Filters
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            className="m-3"
            onClick={() => navigate("/dashboard")}
            startIcon={<TrendingUpIcon />}
          >
            Trends
          </Button>
        </div>
      </div>

      {/* Map Section */}
      <div className="right">
        {airQualityData ? (
          <MapComponent data={airQualityData} />
        ) : (
          <Typography sx={{ color: "white", fontSize: "16px", mt: 2 }}>
            Please enter a city to view air quality data.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default MainLayout;
