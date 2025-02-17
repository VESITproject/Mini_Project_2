// MapComponent.js
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ data }) => {
  return (
    <MapContainer center={[data.lat, data.lon]} zoom={10} style={{ height: "100%", width: "700px" }}>
      <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[data.lat, data.lon]}>
        <Popup>
          <strong>{data.city}</strong> <br />
          AQI: {data.aqi} <br />
          Main Pollutant: {data.pollutant}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;