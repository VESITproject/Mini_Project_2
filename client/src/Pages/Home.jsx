import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";
import axios from "axios";
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import "../styles/home.css";
import Features from "../components/Feature";
const Home = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

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
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="home-container">
      <header className="home-header">
        {userData.name && <Navbar Avatar={userData.name} />}
      </header>

      <main className="home-main">
        <Card elevation={8} className="welcome-card">
          <CardContent>
            <Box className="welcome-avatar">
              <Avatar sx={{ bgcolor: "#1976d2", width: 64, height: 64, fontSize: 32 }}>
                {userData.name.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
            <Typography variant="h4" gutterBottom className="welcome-title">
              Welcome, {userData.name}!
            </Typography>
            <Typography variant="h6" className="project-title" gutterBottom>
              AirVision
            </Typography>
            <Typography variant="body1" className="project-description" paragraph>
              Empowering you with <strong>real-time air quality mapping</strong> for a healthier environment.
            </Typography>
            <Typography variant="body2" className="project-tagline">
              Breathe better. Live smarter.
            </Typography>
          </CardContent>
        </Card>
      </main>
    <Features />
      <footer className="home-footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
