import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/new_map.css";
import { useEffect } from "react";

// Recenter map when location updates
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  return null;
};

// Wind arrow marker
const arrowIcon = (angle) =>
  L.divIcon({
    className: "wind-arrow",
    html: `<div style="transform: rotate(${angle}deg);">➤</div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

// Heat color gradient
const getHeatColor = (temp) => {
  if (temp < 10) return "#007bff";
  if (temp < 20) return "#00bcd4";
  if (temp < 30) return "#ffc107";
  return "#ff5722";
};

// Custom pin icon
const defaultPinIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapComponent = ({ data }) => {
  const defaultPosition = { lat: 19.07283, lon: 72.88261 };
  const lat = parseFloat(data?.lat || defaultPosition.lat);
  const lon = parseFloat(data?.lon || defaultPosition.lon);
  const weather = data?.payload;

  return (
    <MapContainer center={[lat, lon]} zoom={10} className="leaflet-map">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap lat={lat} lon={lon} />

      {/* 📍 DEFAULT POINTER */}
      <Marker position={[lat, lon]} icon={defaultPinIcon}>
        <Popup>
          📍 Location: {data?.city || "Selected Point"}
        </Popup>
      </Marker>

      {/* 🌡️ HEAT MAP */}
      {data?.type === "heatmap" && weather?.main?.temp && (
        <Circle
          center={[lat, lon]}
          radius={3000}
          pathOptions={{
            color: getHeatColor(weather.main.temp),
            fillOpacity: 0.5,
          }}
          className="heat-glow"
        >
          <Popup>
            🌡️ Temp: {weather.main.temp}°C<br />
            ☀️ Feels Like: {weather.main.feels_like}°C
          </Popup>
        </Circle>
      )}

      {/* 💨 WIND DIRECTION */}
      {data?.type === "wind" && weather?.wind?.speed && (
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
      )}

      {/* ☁️ WEATHER CONDITION */}
      {data?.type === "climate" && (
        <Marker position={[lat, lon]}>
          <Popup>
            🌥️ Condition: {weather.weather?.[0]?.description}<br />
            🌡️ Temp: {weather.main?.temp}°C<br />
            💧 Humidity: {weather.main?.humidity}%
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
