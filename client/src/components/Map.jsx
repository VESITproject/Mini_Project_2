import React from 'react';
<<<<<<< HEAD
import { Box, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
=======
import { MapIcon } from 'lucide-react';
import Navbar from './navbar';
import MapComponent from './mapComponent';
import Footer from './footer';
>>>>>>> 844c80dddd6f170caa5e7411c97caf356c6b2cde

function Map() {
  const position = [51.505, -0.09] // Example coordinates (London)

  return (
<<<<<<< HEAD
    <Box sx={{ height: '400px', width: '100%' }}>
      <Typography variant="h6" gutterBottom>Air Quality Map</Typography>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A sample location. <br /> Air Quality: Good.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
=======
    <div>
      <Navbar></Navbar>
    <div className="card flex-grow">
      
      <h2 className="text-xl font-semibold mb-4 text-center">Air Quality Map</h2>
      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <MapIcon className="w-24 h-24 text-gray-400 block m-auto" />
      </div>
      <h1 className="mt-4 text-sm text-gray-500 text-center">
        
        Interactive map will be displayed here. 
</h1>
      <div className="map  d-block  m-auto">
      <MapComponent
      showTable={false}></MapComponent>
      </div>
    </div>
    <Footer></Footer>
    </div>
>>>>>>> 844c80dddd6f170caa5e7411c97caf356c6b2cde
  );
}

export default Map;

