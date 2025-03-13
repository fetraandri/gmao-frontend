import factoryImage from "../assets/image.jpg";
import { FaCogs, FaCalendarAlt, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const Home = () => {
  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById("features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto p-6 md:p-12">
        <div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Optimisez Votre Maintenance avec GMAO Pro
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Une solution complète pour gérer vos équipements, planifier vos interventions et améliorer votre productivité.
          </p>
          <button
            onClick={handleDiscoverClick}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Découvrir les fonctionnalités
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src={factoryImage}
            alt="Usine moderne avec technologie GMAO"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            Fonctionnalités Clés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaCogs size={40} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Gestion des Équipements
              </h3>
              <p className="text-gray-600">
                Suivez et organisez tous vos actifs industriels en un seul endroit.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaCalendarAlt size={40} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Planification
              </h3>
              <p className="text-gray-600">
                Planifiez efficacement vos interventions de maintenance préventive.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <FaChartBar size={40} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Analyse et Rapports
              </h3>
              <p className="text-gray-600">
                Obtenez des insights précieux pour optimiser vos opérations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-indigo-50 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Prêt à transformer votre maintenance ?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Rejoignez des centaines d'entreprises qui optimisent leur GMAO avec notre solution.
          </p>
          <Link
            to="/equipments"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;