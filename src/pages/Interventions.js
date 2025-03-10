import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InterventionTable from '../components/InterventionTable';
import InterventionForm from '../components/InterventionForm';
import { fetchInterventions } from '../services/api';

function Interventions({ showForm = false }) {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    fetchInterventions()
      .then(response => setInterventions(response.data))
      .catch(error => console.error('Erreur lors du chargement des interventions:', error));
  }, []);

  return (
    <div>
      <h1>Interventions</h1>
      {!showForm && (
        <Link to="/interventions/new" style={{ marginBottom: '20px', display: 'inline-block' }}>
          <button>Ajouter une intervention</button>
        </Link>
      )}
      {showForm ? (
        <InterventionForm onSave={() => setInterventions([...interventions])} />
      ) : (
        <InterventionTable interventions={interventions} />
      )}
    </div>
  );
}

export default Interventions;