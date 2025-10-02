import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Card, CardContent,
  IconButton, Chip, Button, CircularProgress
} from '@mui/material';
import {
  LocationOn, FilterAlt, Refresh
} from '@mui/icons-material';

// FIX #1: Created a new, specific function for the 1-5 AQI scale from your API
const getAqiInfoFromScale = (aqi) => {
  if (aqi === null || aqi === undefined || isNaN(aqi)) {
    return { label: 'N/A', color: '#95a5a6' }; // Grey for 'Not Available'
  }
  switch (aqi) {
    case 1: return { label: 'Good', color: '#27ae60' };       // Green
    case 2: return { label: 'Fair', color: '#f39c12' };       // Yellow
    case 3: return { label: 'Moderate', color: '#e67e22' };   // Orange
    case 4: return { label: 'Poor', color: '#e74c3c' };       // Red
    case 5: return { label: 'Very Poor', color: '#8e44ad' };  // Purple
    default: return { label: 'Unknown', color: '#95a5a6' };
  }
};


function EnvSideBar({
  currentCity,
  currentWeatherData, // Renamed from weatherData for clarity if needed
  onOpenModal
}) {
  const [localAqiData, setLocalAqiData] = useState(null);
  const [isAqiLoading, setIsAqiLoading] = useState(false);

  const fetchSidebarAQI = useCallback(async (location) => {
    if (!location) return;
    setIsAqiLoading(true);
    try {
      const timeRange = "7";
      const url = `http://localhost:5001/api/aqi?location=${location}&timeRange=${timeRange}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        throw new Error(data.message || "Failed to fetch sidebar AQI: Invalid data format");
      }
      
      setLocalAqiData(data);

    } catch (error) {
      console.error("Error fetching sidebar-specific AQI:", error);
      setLocalAqiData(null);
    } finally {
      setIsAqiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSidebarAQI(currentCity);
  }, [currentCity, fetchSidebarAQI]);

  // FIX #2: Get today's data (the last item) from the returned array.
  const todaysData = localAqiData && localAqiData.length > 0
    ? localAqiData[localAqiData.length - 1]
    : null;

  // Use the AQI from today's data, or fall back to the parent's data if needed.
  const finalAqiValue = todaysData?.AQI ?? currentWeatherData?.aqi;

  // Use our new function to get the correct label and color.
  const aqiInfo = getAqiInfoFromScale(finalAqiValue);

  return (
    <Box sx={{
      width: 300, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider',
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)',
    }}>
      {/* Header and Current Location sections remain the same... */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>EcoVision</Typography>
        <Typography variant="body2" color="text.secondary">Environmental Intelligence Platform</Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Box sx={{ p: 2 }}>
          <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
            <CardContent sx={{ pb: '16px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="h6">{currentCity || 'Unknown Location'}</Typography>
                <IconButton size="small" sx={{ ml: 'auto', color: 'white' }} onClick={onOpenModal}>
                  <FilterAlt />
                </IconButton>
              </Box>
              {currentWeatherData ? (
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 300, mb: 1 }}>
                    {currentWeatherData.temperature?.toFixed(1) ?? '--'}°C
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, textTransform: 'capitalize' }}>
                    {currentWeatherData.condition || 'N/A'}
                  </Typography>
                </Box>
              ) : (<CircularProgress size={20} color="inherit"/>)}
            </CardContent>
          </Card>
        </Box>

        {/* Quick Stats */}
        {currentWeatherData && (
          <Box sx={{ px: 2, mb: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              <Card sx={{ bgcolor: 'background.default' }}><CardContent sx={{ p: 1.5 }}><Typography variant="body2" color="text.secondary">Humidity</Typography><Typography variant="h6">{currentWeatherData.humidity ?? '--'}%</Typography></CardContent></Card>
              <Card sx={{ bgcolor: 'background.default' }}><CardContent sx={{ p: 1.5 }}><Typography variant="body2" color="text.secondary">Wind</Typography><Typography variant="h6">{currentWeatherData.windSpeed ?? '--'} m/s</Typography></CardContent></Card>
            </Box>

            {/* AQI CARD */}
            <Card sx={{ mt: 1, bgcolor: 'background.default' }}>
              <CardContent sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Air Quality</Typography>
                  {isAqiLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <Chip
                      label={aqiInfo.label}
                      size="small"
                      sx={{
                        bgcolor: aqiInfo.color,
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  )}
                </Box>
                {/* FIX #3: Colored the AQI value text based on its quality */}
                <Typography variant="h6" sx={{ color: aqiInfo.color, mt: 0.5 }}>
                  AQI {isAqiLoading ? '...' : finalAqiValue ?? '--'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Button fullWidth variant="outlined" startIcon={<Refresh />} onClick={() => fetchSidebarAQI(currentCity)}>
          Refresh Data
        </Button>
      </Box>
    </Box>
  );
}

export default EnvSideBar;