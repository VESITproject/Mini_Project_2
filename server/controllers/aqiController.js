// const { fetchAQIData, fetchAQIHistoricalData } = require('../services.js/aqiServices');
// // const AQI = require('../models/aqiModel');
// const {unixToDateTime} = require('../utils/aqi')
// const axios = require('axios');


// const getAQIData = async (req, res) => {
//     const { location, timeRange } = req.query;
//     console.log(location + " " + timeRange);
  
//     if (!location ) {
//       return res.status(400).json({ error: 'Location is required' });
//     }
  
//     try {
//       const aqiData = await fetchAQIHistoricalData(timeRange,location);
  
//       const groupedData = aqiData.list.reduce((acc, entry) => {
//         const date = unixToDateTime(entry.dt).split(' ')[0]; // Extract date part (YYYY-MM-DD)
//         if (!acc[date]) {
//           acc[date] = {
//             date,
//             AQI: 0,
//             CO: 0,
//             NO: 0,
//             NO2: 0,
//             O3: 0,
//             SO2: 0,
//             PM2_5: 0,
//             PM10: 0,
//             NH3: 0,
//             count: 0, // To calculate average later
//           };
//         }
  
//         // Aggregate values for each day
//         acc[date].AQI += entry.main.aqi;
//         acc[date].CO += entry.components.co;
//         acc[date].NO += entry.components.no;
//         acc[date].NO2 += entry.components.no2;
//         acc[date].O3 += entry.components.o3;
//         acc[date].SO2 += entry.components.so2;
//         acc[date].PM2_5 += entry.components.pm2_5;
//         acc[date].PM10 += entry.components.pm10;
//         acc[date].NH3 += entry.components.nh3;
//         acc[date].count += 1;
  
//         return acc;
//       }, {});

//       const finalData = Object.values(groupedData).map((item) => ({
//         "date" : (item.date),
//         "AQI": (item.AQI / item.count).toFixed(2), // Average AQI
//        "CO": (item.CO / item.count).toFixed(2),
//         "NO": (item.NO / item.count).toFixed(2),
//         "NO2": (item.NO2 / item.count).toFixed(2),
//         "O3": (item.O3 / item.count).toFixed(2),
//         "SO2":( item.SO2 / item.count).toFixed(2),
//         "PM2_5": (item.PM2_5 / item.count).toFixed(2),
//         "PM10": (item.PM10 / item.count).toFixed(2),
//         "NH3": (item.NH3 / item.count).toFixed(2),
//       }));
  
//       // console.table(finalData);
//       res.json(finalData);
//       console.log("data sent to frontend");
  
//     } catch (error) {
//       console.error('Error fetching AQI data (controller) :', error);
//       res.status(500).json({ error: 'Failed to fetch AQI data' });
//     }
//   };
  
// module.exports = { getAQIData };
const { fetchAQIHistoricalData } = require('../services.js/aqiServices');
const { unixToDateTime } = require('../utils/aqi');
const axios = require('axios');

const getAQIData = async (req, res) => {
    const { location, timeRange } = req.query;
    console.log(`Location: ${location}, TimeRange: ${timeRange}`);

    // Check if location is provided
    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        // Fetch AQI historical data
        const aqiData = await fetchAQIHistoricalData(timeRange,{ location});

        // Log fetched data for debugging
        console.log( aqiData);

        res.json(aqiData);
        console.log("Data sent to frontend");

    } catch (error) {
        // Catch any errors during data fetching or processing
        console.error('Error fetching AQI data (controller):', error);
        res.status(500).json({ error: 'Failed to fetch AQI data' });
    }
};

module.exports = { getAQIData };

