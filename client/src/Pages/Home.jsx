import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar'; // Navbar at the top
import MainLayout from '../components/MainLayout';
import { useParams } from "react-router-dom";
import { BASE_URL } from '../services/helper';
import axios from 'axios';

const Home = () => {
  const { id } = useParams(); // Assuming the URL is something like /home/:id
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  }); // Track user data state
  const [loading, setLoading] = useState(true); // Track loading state

  // Log user data to ensure it’s being fetched correctly
  useEffect(() => {
    console.log("Logged in user:", userData.name); // Logs user name once it is updated
  }, [userData]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/"; // Redirect if no token
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/home/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data.user); // Update userData state with response data
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        window.location.href = "/"; // Redirect if error occurs
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchUserData();
  }, [id]); // Fetch user data when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Return loading state if data is still being fetched
  }

  return (
    <div className="">
      {/* Navbar at the top */}
      <header className="w-full">
        {/* Pass user name to Navbar */}
        {userData.name && <Navbar Avatar={userData.name} />}
      </header>

      {/* Main Content: Sidebar and Map with Table */}
      <div className="flex flex-grow w-100 bg-customBlue">
        <MainLayout />
      </div>

      {/* Footer at the bottom */}
      <footer className="footer bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 AirQuality Map. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
