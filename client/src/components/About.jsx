import React from 'react';
import { Link } from 'react-router-dom';  // Corrected import
import { MapIcon, InfoIcon } from 'lucide-react';

function About() {
  return (
    <div className="abt">
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex whitespace-nowrap">
            <span className="m-0 p-0 bg-white rounded-full">
              <img src="favi.png" className="w-15 h-12" />
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <h2 className="text-4xl font-bold content-center">AirVision</h2>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="btn btn-primary">
              <MapIcon className="inline-block w-5 h-5 mr-2" />
              Map
            </Link>
            <Link to="/about" className="btn btn-primary">
              <InfoIcon className="inline-block w-5 h-5 mr-2" />
              About
            </Link>
          </nav>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
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
