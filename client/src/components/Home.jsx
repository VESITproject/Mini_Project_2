import React from 'react';
import Navbar from './Navbar'; // Navbar at the top
import MainLayout from './MainLayout'; // Sidebar and Map with Table

const Home = () => {
  return (
    <div className="">
      {/* Navbar at the top */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main Content: Sidebar and Map with Table */}
      <div className="flex flex-grow w-100 bg-customBlue">
        <MainLayout />
      </div>

      {/* Footer at the bottom */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 AirQuality Map. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
