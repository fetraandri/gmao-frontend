// src/pages/Maintenance.js
import { useState, useEffect } from 'react';
import MaintenanceForm from '../components/MaintenanceForm';
import MaintenanceTable from '../components/MaintenanceTable';
import { getMaintenances, createMaintenance } from '../services/api';
import { getEquipments } from '../services/api';

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');

  useEffect(() => {
    fetchMaintenances();
    fetchEquipments();
  }, []);

  const fetchMaintenances = async () => {
    try {
      const response = await getMaintenances();
      setMaintenances(response.data);
    } catch (error) {
      console.error('Error fetching maintenances:', error);
    }
  };

  const fetchEquipments = async () => {
    try {
      const response = await getEquipments();
      setEquipments(response.data);
    } catch (error) {
      console.error('Error fetching equipments:', error);
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

  const filteredMaintenances = selectedEquipmentId
    ? maintenances.filter((m) => m.equipmentId === parseInt(selectedEquipmentId))
    : maintenances;

  return (
    <div>
      <h1>Maintenance</h1>
      <div className="form-group">
        <label>Filter by Equipment:</label>
        <select
          value={selectedEquipmentId}
          onChange={(e) => setSelectedEquipmentId(e.target.value)}
        >
          <option value="">All</option>
          {equipments.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name} (ID: {eq.id})
            </option>
          ))}
        </select>
      </div>
      <MaintenanceForm onSubmit={handleSubmit} />
      <MaintenanceTable maintenances={filteredMaintenances} equipments={equipments} />
    </div>
  );
};

export default Maintenance;