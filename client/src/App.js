import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { MapIcon, InfoIcon } from 'lucide-react';
import MapView from './components/MapView';
import About from './components/About';
import './styles/main.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
       
    </Router>
  );
}

export default App;