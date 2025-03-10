// src/components/NavBar.js
import { Link } from 'react-router-dom';
import './Styles/NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/equipments">Equipments</Link>
        </li>
        <li>
          <Link to="/interventions">Interventions</Link>
        </li>
        <li>
          <Link to="/maintenance">Maintenance</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;