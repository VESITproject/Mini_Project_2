import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './components/About';
import LoginForm from './Pages/login';
import RegisterForm from './Pages/register';
import Map from './components/Map';
function App() {
  return (
    <Router future={{ v7_startTransition: true ,  v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LoginForm />} />  
        <Route path="/register" element={<RegisterForm />} />  
        <Route path="/home" element={<Home />} />  
        <Route path="/about" element={<About />} />{/* Using element={ <About /> } */}
        <Route path="/maps" element={<Map />} />{/* Using element={ <About /> } */}
       
      </Routes>
    </Router>
  );
}

export default App;
