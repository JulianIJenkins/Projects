import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import HomePage from './HomePage';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import InstitutionDetail from './InstitutionDetail';

function App() {
  return (
    <BrowserRouter>
      <div>
        <title>FindMyBank</title>

        {/* Title and Motto (Top left) */}
        <h1>FindMyBank</h1>
        <p className="motto">Search Smart. Bank Better</p>

        {/* Routes to pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/institution/:id" element={<InstitutionDetail />} /> {/* NEW */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
