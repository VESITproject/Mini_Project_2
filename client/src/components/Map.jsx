import React from 'react';
import { MapIcon } from 'lucide-react';
import Navbar from './navbar';
import MapComponent from './mapComponent';
import Footer from './footer';

function Map() {
  return (
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
  );
}

export default Map;