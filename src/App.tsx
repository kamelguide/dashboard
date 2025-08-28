import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBrandSlider from './components/DashboardSlider';

function App() {
  useEffect(() => {
    document.title = " Vendeur";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Stats />
      <AnimatedBrandSlider />
  
      <Contact />
      <Footer />
    </div>
  );
}

export default App;