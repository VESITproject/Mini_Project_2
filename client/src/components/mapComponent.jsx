/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  Polyline,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/new_map.css";
import { useEffect } from "react";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Card,
  CardContent,
  Typography,
  Fade,
} from "@mui/material";

import AirIcon from "@mui/icons-material/Air";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import OpacityIcon from "@mui/icons-material/Opacity";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const { BaseLayer, Overlay } = LayersControl;

const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  return null;
};

const arrowIcon = (angle) =>
  L.divIcon({
    className: "wind-arrow",
    html: `<div style="transform: rotate(${angle}deg);">➤</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

const getHeatColor = (temp) => {
  if (temp < 10) return "#2196f3";
  if (temp < 20) return "#00bcd4";
  if (temp < 30) return "#ffc107";
  return "#f44336";
};

const defaultPinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const WeatherTable = ({ weather }) => {
  if (!weather || !weather.main) return null;

  const rows = [
    {
      label: "Temperature",
      value: `${weather.main.temp} °C`,
      icon: <WhatshotIcon color="error" />,
    },
    {
      label: "Feels Like",
      value: `${weather.main.feels_like} °C`,
      icon: <WbSunnyIcon color="warning" />,
    },
    {
      label: "Humidity",
      value: `${weather.main.humidity} %`,
      icon: <OpacityIcon color="primary" />,
    },
    {
      label: "Wind Speed",
      value: `${weather.wind?.speed || "N/A"} m/s`,
      icon: <AirIcon color="info" />,
    },
    {
      label: "Condition",
      value: weather.weather?.[0]?.description || "N/A",
    },
  ];

  return (
    <Fade in timeout={600}>
      <Box mt={4} px={2}>
        <Card elevation={5} sx={{ borderRadius: 3, boxShadow: 6 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🌤 Weather Data Overview
            </Typography>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell align="right">Badge</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.label}</TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.label}
                          icon={row.icon || null}
                          color="secondary"
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

const MapComponent = ({ data , filter}) => {
  const defaultPosition = { lat: 19.07283, lon: 72.88261 };
  const lat = parseFloat(data?.lat || defaultPosition.lat);
  const lon = parseFloat(data?.lon || defaultPosition.lon);
  const weather = data?.payload;

  return (
    <Box>
      <MapContainer center={[lat, lon]} zoom={10} className="leaflet-map">
        <RecenterMap lat={lat} lon={lon} />
        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
          </BaseLayer>

          <BaseLayer name="Topographic Map">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution="© OpenTopoMap"
            />
          </BaseLayer>

          <Overlay name="Air Quality (AQICN)">
            <TileLayer
              url="https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=a109ea80ea15e3002eeb17f1902cf61eb9b61451"
              attribution="© AQICN.org"
              opacity={0.5}
            />
          </Overlay>

          <Overlay checked name="📍 Location Marker">
            <Marker position={[lat, lon]} icon={defaultPinIcon}>
              <Popup>📍 Location: {data?.city || "Selected Point"}</Popup>
            </Marker>
          </Overlay>

       {filter === 'heatmap' && weather?.main?.temp && (
  <Overlay checked name="🔥 Heat Circle">
    <Circle
      center={[lat, lon]}
      radius={3000}
      pathOptions={{
        color: getHeatColor(weather.main.temp),
        fillOpacity: 0.5,
      }}
    >
      <Popup>
        🌡 Temp: {weather.main.temp}°C<br />
        ☀️ Feels Like: {weather.main.feels_like}°C
      </Popup>
    </Circle>
  </Overlay>
)}

{filter === 'wind' && weather?.wind?.speed && (
  <Overlay checked name="💨 Wind Direction">
    <>
      <Marker position={[lat, lon]} icon={arrowIcon(weather.wind.deg)}>
        <Popup>
          💨 Speed: {weather.wind.speed} m/s<br />
          ↗️ Direction: {weather.wind.deg}°
        </Popup>
      </Marker>
      <Polyline
        positions={[
          [lat, lon],
          [
            lat + 0.05 * Math.cos((weather.wind.deg * Math.PI) / 180),
            lon + 0.05 * Math.sin((weather.wind.deg * Math.PI) / 180),
          ],
        ]}
        pathOptions={{ color: "blue", dashArray: "5, 10" }}
      />
    </>
  </Overlay>
)}


          {data?.type === "climate" && (
            <Overlay checked name="🌥 Weather Info">
              <Marker position={[lat, lon]}>
                <Popup>
                  🌥️ {weather.weather?.[0]?.description}<br />
                  🌡️ {weather.main?.temp}°C<br />
                  💧 {weather.main?.humidity}%
                </Popup>
              </Marker>
            </Overlay>
          )}
        </LayersControl>
      </MapContainer>

      {/* 🌤 Table below map */}
      <WeatherTable weather={weather} />
    </Box>
  );
};

export default MapComponent;
