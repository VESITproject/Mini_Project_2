import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';


function App() {
  return (
    <Router future={{ v7_startTransition: true ,  v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/about" element={<About />} />{/* Using element={ <About /> } */}
      </Routes>
    </Router>
  );
}

export default App;
