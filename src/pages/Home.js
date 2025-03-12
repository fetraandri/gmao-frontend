import factoryImage from "../assets/image.jpg";
import { FaCogs, FaCalendarAlt, FaChartBar } from "react-icons/fa"; 
import './Styles/Home.css'

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h3 className="hero-title">Optimisez Votre Maintenance avec GMAO Pro</h3>
          <p className="hero-subtitle">
            Une solution complète pour gérer vos équipements, planifier vos interventions et améliorer votre productivité.
          </p>
          <button className="btn btn-primary">Découvrir les fonctionnalités</button>
        </div>
        <div className="hero-image">
          <img
            src={factoryImage}
            alt="Usine moderne avec technologie GMAO"
            className="factory-image"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Fonctionnalités Clés</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaCogs size={40} color="#007bff" /> {/* Icône pour Gestion des Équipements */}
            </div>
            <h3>Gestion des Équipements</h3>
            <p>Suivez et organisez tous vos actifs industriels en un seul endroit.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaCalendarAlt size={40} color="#007bff" /> {/* Icône pour Planification */}
            </div>
            <h3>Planification</h3>
            <p>Planifiez efficacement vos interventions de maintenance préventive.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FaChartBar size={40} color="#007bff" /> {/* Icône pour Analyse et Rapports */}
            </div>
            <h3>Analyse et Rapports</h3>
            <p>Obtenez des insights précieux pour optimiser vos opérations.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title">Prêt à transformer votre maintenance ?</h2>
        <p className="cta-text">
          Rejoignez des centaines d'entreprises qui optimisent leur GMAO avec notre solution.
        </p>
        <button className="btn btn-primary">Commencer maintenant</button>
      </section>
    </div>
  );
};

export default Home;