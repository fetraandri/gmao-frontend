// src/pages/Interventions.js
import { useState, useEffect } from 'react';
import InterventionForm from '../components/InterventionForm';
import InterventionTable from '../components/InterventionTable';
import { getInterventions, createIntervention } from '../services/api';
import { getEquipments } from '../services/api';

const Interventions = () => {
  const [interventions, setInterventions] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState('');

  useEffect(() => {
    fetchInterventions();
    fetchEquipments();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await getInterventions();
      setInterventions(response.data);
    } catch (error) {
      console.error('Error fetching interventions:', error);
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
      await createIntervention(formData);
      fetchInterventions();
    } catch (error) {
      console.error('Error submitting intervention:', error);
    }
  };

  const filteredInterventions = selectedEquipmentId
    ? interventions.filter((i) => i.equipmentId === parseInt(selectedEquipmentId))
    : interventions;

  return (
    <div>
      <h1>Interventions</h1>
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
      <InterventionForm onSubmit={handleSubmit} />
      <InterventionTable interventions={filteredInterventions} equipments={equipments} />
    </div>
  );
};

export default Interventions;