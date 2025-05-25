import React, { useEffect, useState } from "react";
import Map from "../components/Map";
import Table from "../components/Table";
import { fetchAirPollutionDataByCity } from "../services/pollutionService";

const MainLayout = () => {
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userMapData"));
    const location = saved?.location || "Mumbai";
    const filterType = saved?.filterType || "Air Quality";
    const pollutant = saved?.pollutant || "pm2_5";

    if (filterType === "Air Quality") {
      fetchAirPollutionDataByCity(location)
        .then((pollutionData) => {
          setTableData({
            type: "pollution",
            payload: pollutionData,
            pollutant,
            city: location,
          });
        })
        .catch((err) => {
          console.error("❌ Failed to load pollution data", err);
        });
    }
  }, []);

  return (
    <div className="main-layout" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Map />
      <Table data={tableData} />
    </div>
  );
};

export default MainLayout;
