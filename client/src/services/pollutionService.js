// src/services/pollutionService.js
import axios from 'axios';

// Your IQAir API key is assumed to be directly set in the environment for deployment.
// You can define it directly here (not recommended for production) or set it in your build system.
const API_KEY = import.meta.env.REACT_APP_API_KEY || 'c8c6c21e-7643-46dd-bc5f-036444b98806'; // Ensure you prefix it with REACT_APP_ for Create React App

// Function to fetch air pollution data for a specific city
export const fetchAirPollutionData = async () => {
    try {
        const response = await axios.get('https://api.airvisual.com/v2/city', {
            params: {
                city: 'Mumbai',
                state: 'Maharashtra',
                country: 'India',
                key: API_KEY, // Your API key for IQAir
            },
        });

        // Log the API response
        console.log('API Response:', response.data);
        return response.data.data; // Return the data directly
    } catch (error) {
        // Improved error handling
        if (error.response) {
            console.error('Error fetching air pollution data:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
        return null; // Return null in case of error
    }
};
