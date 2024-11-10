import React, { useState } from 'react';
import { FilterIcon, TrendingUpIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

function Sidebar({ isOpen, onToggle }) {
  const [activeTab, setActiveTab] = useState('filters');

  return (
    <aside className={`bg-white w-80 shadow-lg transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button onClick={onToggle} className="p-2 rounded-full hover:bg-gray-100">
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </button>
        </div>

        <div className="flex mb-6">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'filters' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('filters')}
          >
            <FilterIcon className="inline-block w-5 h-5 mr-2" />
            Filters
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === 'trends' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
            onClick={() => setActiveTab('trends')}
          >
            <TrendingUpIcon className="inline-block w-5 h-5 mr-2" />
            Trends
          </button>
        </div>

        {activeTab === 'filters' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" id="location" className="input" placeholder="Enter location" />
            </div>
            <div>
              <label htmlFor="pollutant" className="block text-sm font-medium text-gray-700 mb-1">Pollutant</label>
              <select id="pollutant" className="select">
                <option value="">Select pollutant</option>
                <option value="pm25">PM2.5</option>
                <option value="no2">NO2</option>
                <option value="co">CO</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
              <select id="timeRange" className="select">
                <option value="">Select time range</option>
                <option value="1d">Last 24 hours</option>
                <option value="1w">Last week</option>
                <option value="1m">Last month</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <button className="btn btn-primary w-full">Apply Filters</button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label htmlFor="trendPollutant" className="block text-sm font-medium text-gray-700 mb-1">Pollutant</label>
              <select id="trendPollutant" className="select">
                <option value="">Select pollutant</option>
                <option value="pm25">PM2.5</option>
                <option value="no2">NO2</option>
                <option value="co">CO</option>
              </select>
            </div>
            <div>
              <label htmlFor="trendTimeRange" className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
              <select id="trendTimeRange" className="select">
                <option value="">Select time range</option>
                <option value="1w">Last week</option>
                <option value="1m">Last month</option>
                <option value="3m">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
            </div>
            <button className="btn btn-primary w-full">View Trend</button>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;