import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, AppBar, Toolbar, IconButton, Chip, LinearProgress
} from '@mui/material';
import {
  Refresh, CloudDownload, Brightness4, Notifications, Thermostat, Air, Visibility, Opacity, Speed, WbSunny
} from '@mui/icons-material';
import MapComponent from '../EnvrionmentDashboard/EnvMap';
import WeatherChart from '../EnvrionmentDashboard/EnvWeatherChart';

function EnvMain({ currentCity, currentDataType, weatherData }) {
  const getUVIndexColor = (uvIndex) => {
    if (uvIndex <= 2) return '#27ae60';
    if (uvIndex <= 5) return '#f39c12';
    if (uvIndex <= 7) return '#e67e22';
    if (uvIndex <= 10) return '#e74c3c';
    return '#8e44ad';
  };

  const getUVIndexLabel = (uvIndex) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    if (uvIndex <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top App Bar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {currentCity || 'Unknown City'} - {currentDataType ? currentDataType.replace(/([A-Z])/g, ' $1').trim() : 'Loading...'}
          </Typography>
          <IconButton color="inherit"><Notifications /></IconButton>
          <IconButton color="inherit"><CloudDownload /></IconButton>
          <IconButton color="inherit"><Brightness4 /></IconButton>
          <IconButton color="inherit"><Refresh /></IconButton>
        </Toolbar>
      </AppBar>

      {/* Weather Alert Banner */}
      {weatherData && weatherData.aqi > 100 && (
        <Box sx={{ bgcolor: 'warning.light', p: 1 }}>
          <Typography variant="body2" color="warning.contrastText" align="center">
            ⚠️ Air Quality Alert: Current AQI is {weatherData.aqi} - Consider limiting outdoor activities
          </Typography>
        </Box>
      )}

      {/* Main Dashboard Content */}
      <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
        <Grid container spacing={3}>

          {/* Weather Data Cards */}
          {weatherData ? (
            <>
              <Grid item xs={12} md={8}>
                <Card sx={{ height: 400, mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Interactive Map</Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label="Live Data" color="success" size="small" />
                        <Chip label={currentDataType} color="primary" size="small" />
                      </Box>
                    </Box>
                    <MapComponent currentCity={currentCity} dataType={currentDataType} />
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  {/** Temperature Card */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Thermostat color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">Temperature</Typography>
                        </Box>
                        <Typography variant="h3" color="primary">
                          {weatherData.temperature ?? '--'}°C
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Feels like {weatherData.feelsLike ?? '--'}°C
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/** Wind Speed Card */}
                  <Grid item xs={6}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Air color="info" sx={{ mb: 1 }} />
                        <Typography variant="h6">{weatherData.windSpeed ?? '--'}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Wind Speed (m/s)
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/** Humidity Card */}
                  <Grid item xs={6}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Opacity color="info" sx={{ mb: 1 }} />
                        <Typography variant="h6">{weatherData.humidity ?? '--'}%</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Humidity
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/** Visibility Card */}
                  <Grid item xs={6}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Visibility color="info" sx={{ mb: 1 }} />
                        <Typography variant="h6">{weatherData.visibility ?? '--'}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Visibility (km)
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/** Pressure Card */}
                  <Grid item xs={6}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Speed color="info" sx={{ mb: 1 }} />
                        <Typography variant="h6">{weatherData.pressure ?? '--'}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pressure (hPa)
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/** UV Index Card */}
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WbSunny sx={{ color: getUVIndexColor(weatherData.uvIndex), mr: 1 }} />
                            <Typography variant="h6">UV Index</Typography>
                          </Box>
                          <Chip
                            label={getUVIndexLabel(weatherData.uvIndex)}
                            sx={{
                              bgcolor: getUVIndexColor(weatherData.uvIndex),
                              color: 'white',
                              fontWeight: 'bold'
                            }}
                          />
                        </Box>
                        <Typography variant="h4" sx={{ color: getUVIndexColor(weatherData.uvIndex), mb: 1 }}>
                          {weatherData.uvIndex ?? '--'}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(weatherData.uvIndex / 11) * 100}
                          sx={{
                            height: 8, borderRadius: 4, backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': { backgroundColor: getUVIndexColor(weatherData.uvIndex) },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>

              {/** Air Quality Breakdown */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                      Air Quality Breakdown
                    </Typography>
                    <Grid container spacing={2}>
                     {/* Air Quality Breakdown */}
{weatherData && weatherData.pollutants && Object.keys(weatherData.pollutants).length > 0 ? (
  <Box sx={{ px: 2, mb: 2 }}>
    <Typography variant="h6" sx={{ mb: 1, px: 1 }}>Air Quality Breakdown</Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, px: 1 }}>
      {Object.entries(weatherData.pollutants).map(([pollutant, value]) => (
        <Card 
          key={pollutant} 
          sx={{ minWidth: 60, flex: '1 0 30%', p: 1, textAlign: 'center' }} 
          variant="outlined"
        >
          <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
            {typeof value === 'number' ? value.toFixed(2) : value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pollutant.toUpperCase()}
          </Typography>
        </Card>
      ))}
    </Box>
  </Box>
) : (
  <Typography sx={{ px: 2, mb: 2 }} color="text.secondary" variant="body2">
    No air quality breakdown data available.
  </Typography>
)}

                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/** Historical Trends */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Historical Trends</Typography>
                    <WeatherChart city={currentCity} />
                  </CardContent>
                </Card>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="text.secondary">
                    No data available for {currentCity || 'this location'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Please select a different city or try refreshing the data
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default EnvMain;
