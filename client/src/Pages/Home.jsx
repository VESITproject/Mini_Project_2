import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

import MainLayout from "../components/MainLayout";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";
import axios from "axios";
import Footer from "../components/footer";

const Home = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/";
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/home/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="w-full">
        {userData.name && <Navbar onSearch={setSearchQuery} Avatar={userData.name} />}
      </header>

      {/* Pass searchQuery to MainLayout */}
      <div className="flex flex-grow w-100 bg-customBlue">
      <MainLayout searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
