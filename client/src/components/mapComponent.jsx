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

const { BaseLayer, Overlay } = LayersControl;

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
      <RecenterMap lat={lat} lon={lon} />

      <LayersControl position="topright">
        {/* 🌍 Base Maps */}
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

        {/* 🌫 AQICN Air Quality Overlay */}
        <Overlay name="Air Quality (AQICN)">
          <TileLayer
            url="https://tiles.aqicn.org/tiles/usepa-aqi/{z}/{x}/{y}.png?token=a109ea80ea15e3002eeb17f1902cf61eb9b61451"
            attribution="© AQICN.org"
            opacity={0.5}
          />
        </Overlay>

        {/* 📍 Marker Layer */}
        <Overlay checked name="Location Marker">
          <Marker position={[lat, lon]} icon={defaultPinIcon}>
            <Popup>📍 Location: {data?.city || "Selected Point"}</Popup>
          </Marker>
        </Overlay>

        {/* 🌡️ Heat Map Overlay */}
        {data?.type === "heatmap" && weather?.main?.temp && (
          <Overlay checked name="Heat Circle">
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
          </Overlay>
        )}

        {/* 💨 Wind Overlay */}
        {data?.type === "wind" && weather?.wind?.speed && (
          <Overlay checked name="Wind Direction">
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

        {/* ☁️ Climate Condition */}
        {data?.type === "climate" && (
          <Overlay checked name="Weather Info">
            <Marker position={[lat, lon]}>
              <Popup>
                🌥️ Condition: {weather.weather?.[0]?.description}<br />
                🌡️ Temp: {weather.main?.temp}°C<br />
                💧 Humidity: {weather.main?.humidity}%
              </Popup>
            </Marker>
          </Overlay>
        )}
      </LayersControl>
    </MapContainer>
  );
};

export default MapComponent;
