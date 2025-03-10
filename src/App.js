import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Mise à jour des imports
import EquipmentList from './EquipmentList';
import InterventionList from './InterventionList';
import InterventionForm from './InterventionForm';

function App() {
  return (
    <BrowserRouter> {/* Pas besoin de "as Router" sauf si vous voulez garder l'alias */}
      <div>
        <nav>
          <ul>
            <li><Link to="/equipments">Équipements</Link></li>
            <li><Link to="/interventions">Interventions</Link></li>
            <li><Link to="/interventions/new">Nouvelle intervention</Link></li>
          </ul>
        </nav>
        <Routes> {/* Remplace Switch */}
          <Route path="/equipments" element={<EquipmentList />} /> {/* "element" remplace "component" */}
          <Route path="/interventions/new" element={<InterventionForm />} />
          <Route path="/interventions" element={<InterventionList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;