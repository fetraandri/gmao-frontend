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
      await fetchData();
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
        await fetchData();
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
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Maintenance</h1>
      {loading && <p className="text-gray-500">Chargement...</p>}
      <div className="mb-6">
        <label htmlFor="equipment-filter" className="block text-sm font-medium text-gray-700">
          Filter by Equipment:
        </label>
        <select
          id="equipment-filter"
          value={selectedEquipmentId}
          onChange={(e) => setSelectedEquipmentId(e.target.value)}
          disabled={loading}
          className="mt-1 block w-full max-w-xs border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100"
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