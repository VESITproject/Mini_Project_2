import React from 'react';
import Navbar from './navbar';
function About() {
  return (
   <div>
     <Navbar />
    <div className="container mb-10 px-4 py-8">
     
      <h1 className="text-3xl font-bold mb-6">About AirQuality Map</h1>
      <div className="card">
        <p className="mb-4">
          AirQuality Map is a comprehensive tool designed to visualize and analyze air quality data across different locations and time periods.
        </p>
        <p className="mb-4">
          Our system provides real-time information on key pollutants such as PM2.5, NO2, and CO, allowing users to make informed decisions about their environment and health.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Key Features:</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Interactive map displaying air quality data</li>
          <li>Real-time updates on pollutant levels</li>
          <li>Historical data analysis and trend visualization</li>
          <li>Customizable filters for location and time range</li>
          <li>Detailed analytics for in-depth understanding of air quality patterns</li>
        </ul>
        <p>
          By providing easy access to this crucial information, we aim to raise awareness about air quality issues and support efforts to improve the air we breathe.
        </p>
      </div>
    </div>
   </div>
  );
}

export default About;