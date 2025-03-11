import { useState, useEffect } from 'react';
import MaintenanceForm from '../components/MaintenanceForm';
import MaintenanceTable from '../components/MaintenanceTable';
import { getMaintenances, createMaintenance, updateMaintenance, deleteMaintenance } from '../services/api';
import { getEquipments } from '../services/api';

const Maintenance = () => {
  const [maintenances, setMaintenances] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');
  const [editingMaintenance, setEditingMaintenance] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [maintenancesResponse, equipmentsResponse] = await Promise.all([
        getMaintenances(),
        getEquipments(),
      ]);
      setMaintenances(maintenancesResponse.data);
      setEquipments(equipmentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (editingMaintenance) {
        await updateMaintenance(editingMaintenance.id, formData);
        setEditingMaintenance(null);
      } else {
        await createMaintenance(formData);
      }
      await fetchData(); // Mise à jour des listes
    } catch (error) {
      console.error('Error submitting maintenance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (maintenance) => {
    setEditingMaintenance(maintenance);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette maintenance ?')) {
      try {
        setLoading(true);
        await deleteMaintenance(id);
        await fetchData(); // Mise à jour des listes
      } catch (error) {
        console.error('Error deleting maintenance:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredMaintenances = selectedEquipmentId
    ? maintenances.filter((m) => m.equipmentId === parseInt(selectedEquipmentId))
    : maintenances;

  return (
    <div>
      <h1>Maintenance</h1>
      {loading && <p>Chargement...</p>}
      <div className="form-group">
        <label>Filter by Equipment:</label>
        <select
          value={selectedEquipmentId}
          onChange={(e) => setSelectedEquipmentId(e.target.value)}
          disabled={loading}
        >
          <option value="">All</option>
          {equipments.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name} (ID: {eq.id})
            </option>
          ))}
        </select>
      </div>
      <MaintenanceForm onSubmit={handleSubmit} initialData={editingMaintenance || {}} />
      <MaintenanceTable
        maintenances={filteredMaintenances}
        equipments={equipments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Maintenance;