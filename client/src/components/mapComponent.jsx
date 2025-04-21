import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Component to update the   center when data changes
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  map.setView([lat, lon], map.getZoom()); // Recenter map without changing zoom
  return null;
};

const MapComponent = ({ data }) => {
  const defaultPosition = {
    lat: 19.07283,
    lon: 72.88261,
  };

  return (
    <MapContainer 
      center={[data?.lat || defaultPosition.lat, data?.lon || defaultPosition.lon]} 
      zoom={10} 
      style={{ height: "100%", width: "700px" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Update map center when data changes */}
      <RecenterMap lat={data?.lat || defaultPosition.lat} lon={data?.lon || defaultPosition.lon} />

      <Marker position={[data?.lat || defaultPosition.lat, data?.lon || defaultPosition.lon]}>
        <Popup>
          <strong>{data?.city || "Unknown City"}</strong> <br />
          AQI: {data?.aqi || "N/A"} <br />
          Main Pollutant: {data?.pollutant || "N/A"}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
