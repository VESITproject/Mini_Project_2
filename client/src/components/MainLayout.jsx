import React, { useState } from 'react';
import AirIcon from '@mui/icons-material/Air';// Import the Sidebar component
import MapComponent from './MapComponent'; // Import the Map component
import { Typography , Button } from '@mui/material';
import { FilterIcon, TrendingUpIcon, ChevronLeftIcon } from "lucide-react";

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState("filters");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-layout flex h-screen bg-gray-100">
      {/* Sidebar Section */}
      {/* <div className={`sidebar transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-20'}`}>
        <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      </div> */}
       <div className="left">
       <Typography
        sx={{
          background: 'linear-gradient(90deg, #42a5f5 5%, #1976d2 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'Roboto',
          fontSize: '40px',
          fontWeight: 'bold',
        }}
      >
        Air Vision <span></span>
         <AirIcon sx={{ color: '#42a5f5', fontSize: 40, verticalAlign: 'middle' }} />
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          color: 'white',
          fontSize: '20px',
          mt: 2, // Add margin-top
        }}
      >
        AirVision provides real-time air quality maps to help you monitor and
        understand environmental data for healthier living.
      </Typography>
    <div className="button_div">
    <Button
                variant="contained"
                color="primary"
                className='m-3'
                // onClick={() => setActiveTab("filters")}
                startIcon={<FilterIcon />}
              >
                Filters
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                className='m-3'
                // onClick={() => setActiveTab("trends")}
                startIcon={<TrendingUpIcon />}
              >
                Trends
              </Button>
    </div>
       </div>
      {/* Map Section */}
      <div className="right">
        <MapComponent />
      </div>
    </div>
  );
}

export default MainLayout;
