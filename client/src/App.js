import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Provider } from './components/ui/provider'; // Updated path
import Home from './components/Home';
import About from './components/About';
import './styles/main.css'; // Ensure this file includes Tailwind setup or other global styles
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ChakraProvider>

  );
}

export default App;
