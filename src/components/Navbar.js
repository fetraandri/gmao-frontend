// src/components/NavBar.js
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
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