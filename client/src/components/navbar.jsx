import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../services/helper";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Modal
} from "@mui/material";

import Logo from "/Images/favi.png";

const pages = ["Maps", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [airQualityData, setAirQualityData] = useState(null);
  const [location, setLocation] = useState("Mumbai");

  const { id } = useParams();

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
      }
    };
    fetchUserData();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData({ name: "", email: "" });
    window.location.href = "/";
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setOpen(false);
      
      if (!location || location.length < 3) {
        alert("Please enter a valid city name.");
        return;
      }
      
      const data = await fetchAirPollutionData({ city: location });
      if (data) {
        setAirQualityData(data);
      }
    };
  // const handleSearchSubmit = async (e) => {
  //   e.preventDefault();
  //   setSearchOpen(false);

  //   if (!location || location.length < 3) {
  //     alert("Please enter a valid city name.");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`${BASE_URL}/air-quality`, {
  //       params: { city: location },
  //     });

  //     if (response.status === 200) {
  //       setAirQualityData(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching air quality data:", error);
  //   }
  // };

  return (
    <AppBar position="static" sx={{ background: "linear-gradient(92deg, #09090b 6%, #131320 80%)", borderBottom: "1px solid #1b1f24" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="Logo" src={Logo} variant="rounded" sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap component="a" href="/home" sx={{ display: { xs: "none", md: "flex" }, fontFamily: "monospace", fontWeight: 700, letterSpacing: ".3rem", color: "inherit", textDecoration: "none", mr: 2 }}>
            Air Vision
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            {/* Search Icon to trigger modal */}
          

            {pages.map((page) => (
              <Button key={page} onClick={() => window.location.href = `/${page.toLowerCase()}`} sx={{ my: 2, mx: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>

          {/* User Profile Section */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(e) => setAnchorElUser(e.currentTarget)} sx={{ p: 0 }}>
                <Avatar sx={{ backgroundColor: "#156abf" }}>{userData.name[0] || "U"}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu sx={{ mt: "45px" }} anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={() => setAnchorElUser(null)}>
            {settings.map((setting) => {
  const path = `/${setting.toLowerCase()}`; // e.g., /profile, /account

  return (
    <MenuItem
      key={setting}
      onClick={() => {
        setAnchorElUser(null);
        if (setting === "Logout") {
          handleLogout();
        } else {
          window.location.href = path;
        }
      }}
    >
      <Typography textAlign="center">{setting}</Typography>
    </MenuItem>
  );
})}

            </Menu>
          </Box>
        </Toolbar>
      </Container>

   
      
    </AppBar>
  );
}

export default Navbar;
