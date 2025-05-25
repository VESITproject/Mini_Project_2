import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getAQIColor } from '../services/helper';  // Custom utility to get the color for AQI

const AirQualityMap = ({ airQualityData }) => {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default to India’s center
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (airQualityData && airQualityData.city) {
      setCenter([airQualityData.lat, airQualityData.lon]);
      setZoom(8);
    }
  }, [airQualityData]);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "500px", width: "100%" }} zoomControl={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {airQualityData && (
        <Marker
          position={[airQualityData.lat, airQualityData.lon]}
          icon={L.divIcon({
            className: 'leaflet-div-icon',
            html: `<div style="background-color: ${getAQIColor(airQualityData.aqi)}; 
                           padding: 10px; border-radius: 50%; font-weight: bold; color: white; 
                           font-size: 16px;">${airQualityData.aqi}</div>`
          })}
        >
          <Popup>
            <div style={{ textAlign: 'center' }}>
              <h3>{airQualityData.city}</h3>
              <p>AQI: {airQualityData.aqi}</p>
              <p>{airQualityData.pollutant}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default AirQualityMap;
