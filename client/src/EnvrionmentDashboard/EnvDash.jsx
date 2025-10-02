// src/EnvDash.js

import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import EnvSideBar from '../EnvrionmentDashboard/EnvSidebar';
import MainContent from '../EnvrionmentDashboard/EnvMain';
import WelcomeModal from '../EnvrionmentDashboard/EnvWelcomeModal';
import { fetchWeatherData } from '../services/weatherService';
import { fetchAirPollutionDataByCity } from '../services/pollutionService';
import '../styles/App.css';
import Navbar from '../components/navbar';

const theme = createTheme({
  palette: {
    primary: { main: '#2980b9', light: '#3498db', dark: '#1f4e79' },
    secondary: { main: '#27ae60', light: '#2ecc71', dark: '#1e8449' },
    background: { default: '#f8f9fa', paper: '#ffffff' },
    text: { primary: '#2c3e50', secondary: '#7f8c8d' },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h4: { fontWeight: 600, color: '#2c3e50' },
    h6: { fontWeight: 500 },
  },
  shape: { borderRadius: 12 },
});

function EnvDash() {
  const [currentCity, setCurrentCity] = useState('Mumbai');
  const [currentDataType, setCurrentDataType] = useState('heatmap');
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [favorites, setFavorites] = useState(['New York', 'London']);
  const [recentSearches, setRecentSearches] = useState([
    { city: 'Mumbai', type: 'Heat Map' },
    { city: 'Delhi', type: 'Air Quality' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const weather = await fetchWeatherData(currentCity);
        const pollution = await fetchAirPollutionDataByCity(currentCity);

        // Consolidate relevant data
        const consolidatedData = {
          // FIX: Added lat and lon for the map component
          lat: weather.coord?.lat,
          lon: weather.coord?.lon,
          temperature: weather.main?.temp,
          feelsLike: weather.main?.feels_like,
          humidity: weather.main?.humidity,
          pressure: weather.main?.pressure,
          windSpeed: weather.wind?.speed,
          uvIndex: Math.floor(Math.random() * 11), // You can replace with a real UV API later
          condition: weather.weather?.[0]?.description,
          aqi: pollution?.list?.[0]?.main?.aqi || null,
          airQuality: mapAQIToLabel(pollution?.list?.[0]?.main?.aqi),
          pollutants: pollution?.list?.[0]?.components || {},
          visibility: weather.visibility ? weather.visibility / 1000 : null, // meters to km
        };

        setCurrentWeatherData(consolidatedData);
      } catch (err) {
        setError('Failed to fetch weather/pollution data.');
        console.error(err); // It's good practice to log the actual error
        setCurrentWeatherData(null);
      } finally {
        setLoading(false);
      }
    }

    if (currentCity) {
      loadData();
    }
  }, [currentCity]);

  const mapAQIToLabel = (aqi) => {
    switch (aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'Unknown';
    }
  };

  const handleCitySelect = (city, dataType) => {
    setCurrentCity(city);
    setCurrentDataType(dataType);
    setShowModal(false);
    const newSearch = { city, type: dataType };
    setRecentSearches(prev => [newSearch, ...prev.filter(s => s.city !== city).slice(0, 4)]);
  };

  const handleAddToFavorites = (city) => {
    if (!favorites.includes(city)) {
      setFavorites(prev => [...prev, city]);
    }
  };

  const handleRemoveFromFavorites = (city) => {
    setFavorites(prev => prev.filter(f => f !== city));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
        <EnvSideBar
          currentCity={currentCity}
          currentDataType={currentDataType}
          currentWeatherData={currentWeatherData}
          favorites={favorites}
          recentSearches={recentSearches}
          onCitySelect={setCurrentCity}
          onDataTypeSelect={setCurrentDataType}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          onOpenModal={() => setShowModal(true)}
        />
        <MainContent
          currentCity={currentCity}
          currentDataType={currentDataType}
          weatherData={currentWeatherData}
          loading={loading}
          error={error}
        />
        <WelcomeModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleCitySelect}
        />
      </Box>
    </ThemeProvider>
  );
}

export default EnvDash;