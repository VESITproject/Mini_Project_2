// import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText, Card, CardContent, Divider,
  IconButton, Chip, Button
} from '@mui/material';
import {
  Dashboard, Thermostat, Air, Cloud, WbSunny, Analytics, Settings, LocationOn,
  Star, StarBorder, History, FilterAlt, Refresh
} from '@mui/icons-material';

const navigationItems = [
  { label: 'Dashboard', icon: Dashboard, value: 'dashboard' },
  { label: 'Heat Maps', icon: Thermostat, value: 'heatmap' },
  { label: 'Wind Patterns', icon: Air, value: 'windflow' },
  { label: 'Climate Data', icon: Cloud, value: 'climate' },
  { label: 'Weather Forecast', icon: WbSunny, value: 'forecast' },
  { label: 'Air Quality', icon: WbSunny, value: 'airquality' },
  { label: 'Analytics', icon: Analytics, value: 'analytics' },
  { label: 'Settings', icon: Settings, value: 'settings' },
];

function EnvSideBar({
  currentCity, currentDataType, weatherData, favorites, recentSearches,
  onCitySelect, onDataTypeSelect, onAddToFavorites, onRemoveFromFavorites, onOpenModal
}) {
  const getAirQualityLabel = (quality) => {
    const colors = {
      Good: '#27ae60',
      Fair: '#f39c12',
      Moderate: '#e67e22',
      Poor: '#e74c3c',
    };
    return colors[quality] || '#7f8c8d';
  };

  return (
    <Box sx={{
      width: 300, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider',
      display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {/* <Eco sx={{ color: 'primary.main', mr: 1, fontSize: 28 }} /> */}
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>EcoVision</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">Environmental Intelligence Platform</Typography>
      </Box>
      {/* Current Location */}
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
            {weatherData ? (
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 300, mb: 1 }}>
                  {weatherData.temperature ?? '--'}°C
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {weatherData.condition || 'N/A'}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>No data</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
      {/* Quick Stats */}
      {weatherData && (
        <Box sx={{ px: 2, mb: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            <Card sx={{ bgcolor: 'background.default' }}>
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2" color="text.secondary">Humidity</Typography>
                <Typography variant="h6">{weatherData.humidity ?? '--'}%</Typography>
              </CardContent>
            </Card>
            <Card sx={{ bgcolor: 'background.default' }}>
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2" color="text.secondary">Wind</Typography>
                <Typography variant="h6">{weatherData.windSpeed ?? '--'} m/s</Typography>
              </CardContent>
            </Card>
          </Box>
          <Card sx={{ mt: 1, bgcolor: 'background.default' }}>
            <CardContent sx={{ p: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Air Quality</Typography>
                <Chip
                  label={weatherData.airQuality || 'N/A'}
                  size="small"
                  sx={{
                    bgcolor: getAirQualityLabel(weatherData.airQuality),
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              </Box>
              <Typography variant="h6">AQI {weatherData.aqi ?? '--'}</Typography>
            </CardContent>
          </Card>
        </Box>
      )}
      {/* Navigation */}
      <Box sx={{ flex: 1}}>
        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, fontWeight: 600 }}>Navigation</Typography>
        <List dense>
          {navigationItems.map((item) => (
            <ListItem
              key={item.value}
              button
              selected={currentDataType === item.value}
              onClick={() => onDataTypeSelect(item.value)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiListItemIcon-root': { color: 'white' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}><item.icon fontSize="small" /></ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mx: 2, my: 2 }} />
        {/* Recent Searches */}
        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, fontWeight: 600 }}>Recent Searches</Typography>
        <List dense>
          {recentSearches.slice(0, 3).map((search, index) => (
            <ListItem key={index} button onClick={() => onCitySelect(search.city)} sx={{ mx: 1, borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <History fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={search.city} secondary={search.type} />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ mx: 2, my: 2 }} />
        {/* Favorites */}
        <Typography variant="subtitle2" sx={{ px: 2, mb: 1, fontWeight: 600 }}>Favorite Locations</Typography>
        <List dense>
          {favorites.slice(0, 3).map((city) => (
            <ListItem key={city} button onClick={() => onCitySelect(city)} sx={{ mx: 1, borderRadius: 1 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Star fontSize="small" color="primary" />
              </ListItemIcon>
              <ListItemText primary={city} />
              <IconButton
                size="small"
                onClick={(e) => { e.stopPropagation(); onRemoveFromFavorites(city); }}
              >
                <StarBorder fontSize="small" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button fullWidth variant="outlined" startIcon={<Refresh />} onClick={() => window.location.reload()}>
          Refresh Data
        </Button>
      </Box>
    </Box>
  );
}

export default EnvSideBar;
