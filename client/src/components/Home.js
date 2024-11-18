import React from 'react';
import { BrowserRouter as  Link } from 'react-router-dom';
import { MapIcon, InfoIcon } from 'lucide-react';
import MapView from './MapView';
// import About from './About';
const Home = () => {
  return (
    <> <div className="flex flex-col min-h-screen">
    <header className="bg-gray-900 text-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
           <div class="flex whitespace-nowrap" ><span class="m-0 p-0 bg-white rounded-full"><img src="favi.png" class="w-15 h-12"  /></span>&nbsp;&nbsp;&nbsp;&nbsp;<h2 className="text-4xl font-bold content-center">AirVision</h2></div> 
            <nav className="space-x-4">
              <Link to="/" className="btn btn-primary">
                <MapIcon className="inline-block w-5 h-5 mr-2" />
                Map
              </Link>
              <Link to="/about" className="btn btn-primary">
                <InfoIcon className="inline-block w-5 h-5 mr-2" />
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
            <MapView/>
           
        </main>
    <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 AirQuality Map. All rights reserved.</p>
          </div>
        </footer>
        </div> </>
  )
}

export default Home