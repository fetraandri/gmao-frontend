import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EquipmentList() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/equipments')
      .then(response => setEquipments(response.data))
      .catch(error => console.error('Erreur lors du chargement des équipements:', error));
  }, []);

  return (
    <div>
      <h1>Liste des équipements</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map(eq => (
            <tr key={eq.id}>
              <td>{eq.id}</td>
              <td>{eq.name}</td>
              <td>{eq.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EquipmentList;