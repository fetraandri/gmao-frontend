import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MaintenanceTable from '../components/MaintenanceTable';
import { fetchMaintenances, deleteMaintenance } from '../services/api';

function Maintenance() {
  const [maintenances, setMaintenances] = useState([]);

  const loadMaintenances = () => {
    fetchMaintenances()
      .then(response => setMaintenances(response.data))
      .catch(error => console.error('Erreur lors du chargement des maintenances:', error));
  };

  useEffect(() => {
    loadMaintenances();
  }, []);

  const handleDelete = (id) => {
    deleteMaintenance(id)
      .then(() => loadMaintenances())
      .catch(error => {
        console.error('Erreur lors de la suppression:', error);
        if (error.response && error.response.status === 404) {
          loadMaintenances();
        }
      });
  };

  return (
    <div>
      <h1>Maintenance</h1>
      <Link to="/maintenance/new" style={{ marginBottom: '20px', display: 'inline-block' }}>
        <button>Ajouter une maintenance</button>
      </Link>
      <MaintenanceTable maintenances={maintenances} onDelete={handleDelete} />
    </div>
  );
}

export default Maintenance;