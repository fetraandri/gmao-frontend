// src/pages/Dashboard.js
import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { Pie } from 'react-chartjs-2'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'; 
import { getEquipments, getInterventions, getMaintenances } from '../services/api';

// Enregistrer les composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    equipmentsInMaintenanceEnCours: 0,
    equipmentsInMaintenanceTerminee: 0,
    equipmentsInInterventionEnCours: 0,
    equipmentsInInterventionTerminee: 0,
    totalEquipments: 0,
  });
  const [chartData, setChartData] = useState(null); // Nouvel état pour le diagramme
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log('Fetching data for dashboard...');
        const [equipmentsResponse, interventionsResponse, maintenancesResponse] = await Promise.all([
          getEquipments(),
          getInterventions(),
          getMaintenances(),
        ]);

        const equipments = equipmentsResponse.data;
        const interventions = interventionsResponse.data;
        const maintenances = maintenancesResponse.data;

        console.log('Equipments:', equipments);
        console.log('Interventions:', interventions);
        console.log('Maintenances:', maintenances);

        const maintenanceEnCoursIds = new Set(
          maintenances.filter((m) => m.status === 'En cours').map((m) => m.equipmentId)
        );
        const maintenanceTermineeIds = new Set(
          maintenances.filter((m) => m.status === 'Terminée').map((m) => m.equipmentId)
        );
        const interventionEnCoursIds = new Set(
          interventions.filter((i) => i.status === 'En cours').map((i) => i.equipmentId)
        );
        const interventionTermineeIds = new Set(
          interventions.filter((i) => i.status === 'Terminée').map((i) => i.equipmentId)
        );

        const newStats = {
          equipmentsInMaintenanceEnCours: maintenanceEnCoursIds.size,
          equipmentsInMaintenanceTerminee: maintenanceTermineeIds.size,
          equipmentsInInterventionEnCours: interventionEnCoursIds.size,
          equipmentsInInterventionTerminee: interventionTermineeIds.size,
          totalEquipments: equipments.length,
        };
        console.log('Calculated Stats:', newStats);
        setStats(newStats);

        // Préparer les données pour le diagramme circulaire
        setChartData({
          labels: [
            'Maintenance En cours',
            'Maintenance Terminée',
            'Intervention En cours',
            'Intervention Terminée',
          ],
          datasets: [
            {
              data: [
                newStats.equipmentsInMaintenanceEnCours,
                newStats.equipmentsInMaintenanceTerminee,
                newStats.equipmentsInInterventionEnCours,
                newStats.equipmentsInInterventionTerminee,
              ],
              backgroundColor: ['#3498db', '#2ecc71', '#e67e22', '#27ae60'], // Couleurs correspondantes
              borderColor: ['#fff'],
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Options pour le diagramme
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 14, family: 'Arial, sans-serif' },
          color: '#2c3e50',
        },
      },
      tooltip: {
        backgroundColor: '#2c3e50',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
  };

  return (
    <div className="container">
      <h1>Dashboard GMAO</h1>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <>
          <div className="stats-container">
            <StatsCard
              title="Équipements en Maintenance (En cours)"
              value={stats.equipmentsInMaintenanceEnCours}
              color="#3498db"
            />
            <StatsCard
              title="Équipements en Maintenance (Terminée)"
              value={stats.equipmentsInMaintenanceTerminee}
              color="#2ecc71"
            />
            <StatsCard
              title="Équipements en Intervention (En cours)"
              value={stats.equipmentsInInterventionEnCours}
              color="#e67e22"
            />
            <StatsCard
              title="Équipements en Intervention (Terminée)"
              value={stats.equipmentsInInterventionTerminee}
              color="#27ae60"
            />
            <StatsCard
              title="Total des Équipements"
              value={stats.totalEquipments}
              color="#2c3e50"
            />
          </div>
          {chartData && (
            <div className="chart-container">
              <h2>Répartition des Équipements par Statut</h2>
              <Pie data={chartData} options={chartOptions} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;