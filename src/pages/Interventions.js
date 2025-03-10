// src/pages/Interventions.js
import { useState, useEffect } from 'react';
import InterventionForm from '../components/InterventionForm';
import InterventionTable from '../components/InterventionTable';
import { getInterventions, createIntervention } from '../services/api';

const Interventions = () => {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions();
  }, []);

  const fetchInterventions = async () => {
    try {
      const response = await getInterventions();
      setInterventions(response.data);
    } catch (error) {
      console.error('Error fetching interventions:', error);
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

  return (
    <div>
      <h1>Interventions</h1>
      <InterventionForm onSubmit={handleSubmit} />
      <InterventionTable interventions={interventions} />
    </div>
  );
};

export default Interventions;