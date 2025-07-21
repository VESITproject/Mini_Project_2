// src/pages/MainLayout.jsx
import { useState, useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";
import MapComponent from "./mapComponent";
import {
  Typography,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAirPollutionDataByCity } from "../services/pollutionService";
import { TrendingUpIcon } from "lucide-react";
import PollutionVisualizer from "../components/PollutionVisualizer";
import PollutionTable from "../components/PollutionTable";
import "../styles/main.css";

function MainLayout({ searchQuery, setSearchQuery }) {
  const [location, setLocation] = useState("");
  const [airQualityData, setAirQualityData] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const defaultData = {
    lat: 19.07283,
    lon: 72.88261,
    city: "Mumbai",
    aqi: "N/A",
    pollutant: "N/A",
    type: "pollution",
    payload: {},
  };

  useEffect(() => {
    if (searchQuery && !airQualityData) {
      handleFetchData(searchQuery);
    }
  }, [searchQuery]);

  const handleFetchData = async (city) => {
    if (!city || city.trim().length < 3) {
      setError("Enter a valid city (min 3 chars).");
      return;
    }

    const formattedCity = city.trim().replace(/\s+/g, "+");
    setLoading(true);
    setError("");

    try {
      const data = await fetchAirPollutionDataByCity(formattedCity);
      if (!data || data.error || data.city_not_found) {
        throw new Error(data.error || "City not found.");
      }
      setAirQualityData({ ...data, type: "pollution" });
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError(error.message || "Error fetching data.");
      setAirQualityData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(location.trim());
    setSearchOpen(false);
    setLocation("");
  };

  return (
    <div className="main-layout flex flex-col md:flex-row h-screen">
      <div className="left p-4 md:w-1/3 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Air Vision <AirIcon />
        </Typography>

        <Typography variant="body1" mb={3}>
          Real-time air quality maps to help you monitor and understand environmental data for healthier living.
        </Typography>

        <div className="flex items-center gap-4">
          <IconButton onClick={() => setSearchOpen(true)} color="inherit" disabled={loading}>
            <SearchIcon />
          </IconButton>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/dashboard")}
            startIcon={<TrendingUpIcon />}
            disabled={loading}
          >
            Trends
          </Button>
        </div>

        <FormControl fullWidth sx={{ mt: 4 }}>
          <InputLabel>Map Filter</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)} label="Map Filter">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="heat">Heatmap</MenuItem>
            <MenuItem value="wind">Wind Flow</MenuItem>
          </Select>
        </FormControl>

        <PollutionVisualizer data={airQualityData || defaultData} />

        {loading && (
          <Typography mt={2} textAlign="center" color="white">
            Loading...
          </Typography>
        )}
      </div>

      <div className="right w-full md:w-2/3 p-2">
        <MapComponent data={airQualityData || defaultData} filter={filter} />
        <PollutionTable data={airQualityData || defaultData} />
      </div>

      {/* Modal */}
      <Modal open={searchOpen} onClose={() => setSearchOpen(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: "10px", width: 400,
        }}>
          <Typography variant="h6" gutterBottom>Enter Location</Typography>
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
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
        </Box>
      </Modal>
    </div>
  );
}

export default MainLayout;
