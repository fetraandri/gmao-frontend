// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Equipments from './pages/Equipments';
import Interventions from './pages/Interventions';
import Maintenance from './pages/Maintenance';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/interventions" element={<Interventions />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Nouvelle route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;