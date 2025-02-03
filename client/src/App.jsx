import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

import About from './components/About';
import LoginForm from './Pages/login';
import RegisterForm from './Pages/register';
import Dashboard from './Pages/Dashboard';
import Map from './components/Map';

// import MyMap from "./components/MyMap";
function App() {
  return (
    <Router future={{ v7_startTransition: true ,  v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LoginForm />} />  
        <Route path="/register" element={<RegisterForm />} />  
        <Route path="/home" element={<Home />} />  
        <Route path="/about" element={<About />} />{/* Using element={ <About /> } */}
        
        <Route path="/maps" element={<Map />} />{/* Using element={ <About /> } */}
<<<<<<< HEAD
        <Route path="/dashboard" element={<Dashboard />} />  
=======
        {/* <Route path="/mymap" element={<MyMap />} />Using element={ <About /> } */}
       
>>>>>>> 844c80dddd6f170caa5e7411c97caf356c6b2cde
      </Routes>
    </Router>
  );
}

export default App;
