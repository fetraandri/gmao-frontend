import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InterventionList() {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/interventions')
      .then(response => setInterventions(response.data))
      .catch(error => console.error('Erreur lors du chargement des interventions:', error));
  }, []);

  return (
    <div>
      <h1>Liste des interventions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Équipement</th>
          </tr>
        </thead>
        <tbody>
          {interventions.map(intervention => (
            <tr key={intervention.id}>
              <td>{intervention.id}</td>
              <td>{intervention.description}</td>
              <td>{intervention.status}</td>
              <td>{intervention.equipment ? intervention.equipment.name : 'Aucun'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterventionList;