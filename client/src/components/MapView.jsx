import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import TrendsGraph from './TrendsGraph';

function MapView() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-grow flex flex-col p-4 space-y-4">
        <Map />
        <TrendsGraph />
      </div>
    </div>
  );
}

export default MapView;