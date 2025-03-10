import { useState, useEffect } from 'react';
import MaintenanceForm from '../components/MaintenanceForm';
import MaintenanceTable from '../components/MaintenanceTable';
import { getMaintenances, createMaintenance } from '../services/api';

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    fetchMaintenances();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const response = await getMaintenances();
      setMaintenances(response.data);
    } catch (error) {
      console.error('Error fetching maintenances:', error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await createMaintenance(formData);
      fetchMaintenances();
    } catch (error) {
      console.error('Error submitting maintenance:', error);
    }
  };

  return (
    <div>
      <h1>Maintenance</h1>
      <MaintenanceForm onSubmit={handleSubmit} />
      <MaintenanceTable maintenances={maintenances} />
    </div>
  );
};

export default Maintenance;