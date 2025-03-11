// src/components/Navbar.js
import { Link } from "react-router-dom";
import "./Styles/NavBar.css"; // Note : chemin corrigé si nécessaire (voir ci-dessous)

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Accueil</Link>
      <Link to="/equipments">Équipements</Link>
      <Link to="/maintenance">Maintenance</Link>
      <Link to="/interventions">Interventions</Link>
      <Link to="/dashboard">Dashboard</Link> {/* Changé à "/dashboard" */}
    </nav>
  );
};

export default Navbar;