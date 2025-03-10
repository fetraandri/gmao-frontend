import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EquipmentTable from '../components/EquipmentTable';
import { fetchEquipments, deleteEquipment } from '../services/api';

function Equipments() {
  const [equipments, setEquipments] = useState([]);

  const loadEquipments = () => {
    fetchEquipments()
      .then(response => setEquipments(response.data))
      .catch(error => console.error('Erreur lors du chargement des équipements:', error));
  };

  useEffect(() => {
    loadEquipments();
  }, []);

  const handleDelete = (id) => {
    console.log('Tentative de suppression de l’équipement ID:', id);
    deleteEquipment(id)
      .then(() => {
        console.log('Suppression réussie');
        loadEquipments();
      })
      .catch(error => {
        console.error('Erreur lors de la suppression:', error);
        if (error.response && (error.response.status === 404 || error.response.status === 500)) {
          loadEquipments();
        }
      });
  };

  return (
    <div>
      <h1>Équipements</h1>
      <Link to="/equipments/new" style={{ marginBottom: '20px', display: 'inline-block' }}>
        <button>Ajouter un équipement</button>
      </Link>
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />
    </div>
  );
}

export default Equipments;