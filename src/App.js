import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Equipments from './pages/Equipments';
import Interventions from './pages/Interventions';
import Maintenance from './pages/Maintenance';
import Dashboard from './pages/Dashboard';
import Loading from './components/Loading'; 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/interventions" element={<Interventions />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      )}
    </Router>
  );
};

export default App;