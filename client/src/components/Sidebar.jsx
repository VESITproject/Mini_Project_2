import React, { useState } from "react";
import { FilterIcon, TrendingUpIcon, ChevronLeftIcon } from "lucide-react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

export default function SideBar() {
  const [open, setOpen] = useState(true); // Sidebar is visible by default
  const [activeTab, setActiveTab] = useState("filters");

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: open ? 350 : 0,
          backgroundColor: "#09090b",
          height: "100vh",
          color:"#3399ff",
          transition: "width 0.3s",
          overflow: "hidden",
          boxShadow: open ? "2px 0px 5px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        {open && (
          <div style={{ padding: "16px" }}>
            {/* Sidebar Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
            
            </div>

            {/* Tabs */}
            <div className="flex mb-6">
             

              <Button
                variant={activeTab === "filters" ? "contained" : "outlined"}
                color={activeTab === "trends" ? "primary" : "default"}
                onClick={() => setActiveTab("filters")}
                startIcon={<FilterIcon />}
              >
                Filters
              </Button>
              <Button
                variant={activeTab === "trends" ? "contained" : "outlined"}
                color={activeTab === "trends" ? "primary" : "default"}
                onClick={() => setActiveTab("trends")}
                startIcon={<TrendingUpIcon />}
              >
                Trends
              </Button>
            </div>

            {/* Tab Content */}
            {activeTab === "filters" ? (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    className="input"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pollutant"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pollutant
                  </label>
                  <select id="pollutant" className="select">
                    <option value="">Select pollutant</option>
                    <option value="pm25">PM2.5</option>
                    <option value="no2">NO2</option>
                    <option value="co">CO</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="timeRange"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time Range
                  </label>
                  <select id="timeRange" className="select">
                    <option value="">Select time range</option>
                    <option value="1d">Last 24 hours</option>
                    <option value="1w">Last week</option>
                    <option value="1m">Last month</option>
                    <option value="1y">Last year</option>
                  </select>
                </div>
                <button className="btn btn-primary w-full">
                  Apply Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="trendPollutant"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Pollutant
                  </label>
                  <select id="trendPollutant" className="select">
                    <option value="">Select pollutant</option>
                    <option value="pm25">PM2.5</option>
                    <option value="no2">NO2</option>
                    <option value="co">CO</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="trendTimeRange"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time Range
                  </label>
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
        )}
      </Box>

      {/* Main Content with Toggle Button */}
      {/* <div style={{ flex: 1, padding: '16px' }}>
        <button onClick={toggleSidebar} className="btn btn-secondary">
          {open ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
        <div className="mt-4">
          <h1>Main Content</h1>
          <p>This is where the main content of the page would go.</p>
        </div>
      </div> */}
    </div>
  );
}
