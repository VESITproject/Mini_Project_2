import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchAirPollutionData } from '../services/pollutionService';
import '../Styles/map.css'; // Import your custom CSS for styling
import BasicTable from "../components/table";
import { ImageOverlay } from 'react-leaflet';
// Import custom marker icons
import goodIcon from '/Images/marker.png';
import moderateIcon from '/Images/marker.png';
import unhealthyIcon from '/Images/marker.png';

// Fixing marker icons not showing in Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: goodIcon,
  iconUrl: goodIcon,
});

// Define a function to get the right marker icon based on AQI
const getMarkerIcon = (aqi) => {
  if (aqi <= 50) return new L.Icon({ iconUrl: goodIcon, iconSize: [40, 40] });
  if (aqi <= 100) return new L.Icon({ iconUrl: moderateIcon, iconSize: [40, 40] });
  return new L.Icon({ iconUrl: unhealthyIcon, iconSize: [40, 40] });
};

const MapComponent = () => {
  const defaultPosition = [19.076, 72.8777]; // Default map center position (Mumbai)
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch air pollution data for Mumbai when the component mounts
  useEffect(() => {
    const getAirQualityData = async () => {
      setLoading(true); // Start loading
      const data = await fetchAirPollutionData();
      if (data) {
        setStation({
          city: data.city,
          lat: data.location.coordinates[1], // Latitude
          lon: data.location.coordinates[0], // Longitude
          aqi: data.current.pollution.aqius, // Adjust according to the data structure
          pollutant: data.current.pollution.mainus // Adjust according to the data structure
        });
      } else {
        console.error('Failed to fetch air quality data for Mumbai');
      }
      setLoading(false); // End loading
    };

    getAirQualityData();
  }, []);

  // Log map container to the console
  useEffect(() => {
    console.log('Map container rendering:', defaultPosition);
  }, [defaultPosition]);

  return (
    <div className="map-container">
      {loading ? (
        <div className="fs-5 fw-bold text-customBlue">Loading air quality data...</div>
      ) : (
        <>
          <MapContainer
            center={defaultPosition}
            zoom={12}
            style={{ height: '500px', width: '100%' }}
            whenCreated={(mapInstance) => {
              console.log('Map instance created:', mapInstance);
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // url={mapImg}
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {station && (
              <Marker position={[station.lat, station.lon]} icon={getMarkerIcon(station.aqi)}>
                <Popup className="popup">
                  <strong>{station.city}</strong><br />
                  Air Quality Index: {station.aqi}<br />
                  Main Pollutant: {station.pollutant === 'p2' ? 'PM2.5' : station.pollutant}
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {/* Pass station data to BasicTable */}
          <BasicTable stationData={station} />
        </>
      )}
    </div>
  );
};

export default MapComponent;
