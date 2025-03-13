import { useState, useEffect } from 'react';
import StatsCard from '../components/StatsCard';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getEquipments, getInterventions, getMaintenances } from '../services/api';
import {
  FaWrench,
  FaCheckCircle,
  FaTools,
  FaCheckSquare,
  FaCogs,
} from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState({
    equipmentsInMaintenanceEnCours: 0,
    equipmentsInMaintenanceTerminee: 0,
    equipmentsInInterventionEnCours: 0,
    equipmentsInInterventionTerminee: 0,
    totalEquipments: 0,
  });
  const [chartData, setChartData] = useState(null);
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
              backgroundColor: ['#3498db', '#2ecc71', '#e67e22', '#27ae60'],
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard GMAO</h1>
      {loading ? (
        <p className="text-center text-lg text-gray-600">Chargement des données...</p>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard
              title="Équipements en Maintenance (En cours)"
              value={stats.equipmentsInMaintenanceEnCours}
              color="#3498db"
              icon={<FaWrench />}
            />
            <StatsCard
              title="Équipements en Maintenance (Terminée)"
              value={stats.equipmentsInMaintenanceTerminee}
              color="#2ecc71"
              icon={<FaCheckCircle />}
            />
            <StatsCard
              title="Équipements en Intervention (En cours)"
              value={stats.equipmentsInInterventionEnCours}
              color="#e67e22"
              icon={<FaTools />}
            />
            <StatsCard
              title="Équipements en Intervention (Terminée)"
              value={stats.equipmentsInInterventionTerminee}
              color="#27ae60"
              icon={<FaCheckSquare />}
            />
            <StatsCard
              title="Total des Équipements"
              value={stats.totalEquipments}
              color="#2c3e50"
              icon={<FaCogs />}
            />
          </div>
          {chartData && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Répartition des Équipements par Statut</h2>
              <div className="w-full max-w-2xl mx-auto">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;