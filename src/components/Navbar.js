import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#f8f9fa',
      padding: '10px 20px',
      borderBottom: '1px solid #ddd'
    }}>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0
      }}>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/equipments">Équipements</Link></li>
        <li><Link to="/maintenance">Maintenance</Link></li>
        <li><Link to="/interventions">Interventions</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;