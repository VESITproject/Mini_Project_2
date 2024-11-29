import React from 'react';
import { MapIcon } from 'lucide-react';
import Navbar from './navbar';

function Map() {
  return (
    <div>
      <Navbar></Navbar>
    <div className="card flex-grow">
      
      <h2 className="text-xl font-semibold mb-4">Air Quality Map</h2>
      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        <MapIcon className="w-24 h-24 text-gray-400" />
      </div>
      <p className="mt-4 text-sm text-gray-500 text-center">
        Interactive map will be displayed here. 
      </p>
    </div>
    </div>
  );
}

export default Map;