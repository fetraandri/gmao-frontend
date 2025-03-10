import React, { useEffect, useState } from 'react';
import EquipmentTable from '../components/EquipmentTable';
import { fetchEquipments, deleteEquipment } from '../services/api';

function Equipments() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    fetchEquipments()
      .then(response => setEquipments(response.data))
      .catch(error => console.error('Erreur lors du chargement des équipements:', error));
  }, []);

  const handleDelete = (id) => {
    deleteEquipment(id)
      .then(() => setEquipments(equipments.filter(eq => eq.id !== id)))
      .catch(error => console.error('Erreur lors de la suppression:', error));
  };

  return (
    <div>
      <h1>Équipements</h1>
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />
    </div>
  );
}

export default Equipments;