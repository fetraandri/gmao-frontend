import { useState, useEffect } from 'react';
import InterventionForm from '../components/InterventionForm';
import InterventionTable from '../components/InterventionTable';
import { getInterventions, createIntervention, updateIntervention, deleteIntervention } from '../services/api';
import { getEquipments } from '../services/api';

const Interventions = () => {
  const [interventions, setInterventions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');
  const [editingIntervention, setEditingIntervention] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [interventionsResponse, equipmentsResponse] = await Promise.all([
        getInterventions(),
        getEquipments(),
      ]);
      setInterventions(interventionsResponse.data);
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
      if (editingIntervention) {
        await updateIntervention(editingIntervention.id, formData);
        setEditingIntervention(null);
      } else {
        await createIntervention(formData);
      }
      await fetchData();
    } catch (error) {
      console.error('Error submitting intervention:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (intervention) => {
    setEditingIntervention(intervention);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette intervention ?')) {
      try {
        setLoading(true);
        await deleteIntervention(id);
        await fetchData();
      } catch (error) {
        console.error('Error deleting intervention:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredInterventions = selectedEquipmentId
    ? interventions.filter((i) => i.equipmentId === parseInt(selectedEquipmentId))
    : interventions;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Interventions</h1>
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
      <InterventionForm onSubmit={handleSubmit} initialData={editingIntervention || {}} />
      <InterventionTable
        interventions={filteredInterventions}
        equipments={equipments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Interventions;