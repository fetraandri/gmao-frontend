import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Equipments from './pages/Equipments';
import Maintenance from './pages/Maintenance';
import Interventions from './pages/Interventions';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/interventions/new" element={<Interventions showForm={true} />} /> {/* Passage d'une prop */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;