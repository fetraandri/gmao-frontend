// src/pages/Equipments.js
import { useState, useEffect } from 'react';
import EquipmentForm from '../components/EquipmentForm';
import EquipmentTable from '../components/EquipmentTable';
import { getEquipments, createEquipment, updateEquipment, deleteEquipment } from '../services/api';

const Equipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [editingEquipment, setEditingEquipment] = useState(null);

  useEffect(() => {
    fetchEquipments();
  }, []);

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
      if (editingEquipment) {
        await updateEquipment(editingEquipment.id, formData);
        setEditingEquipment(null);
      } else {
        await createEquipment(formData);
      }
      fetchEquipments();
    } catch (error) {
      console.error('Error submitting equipment:', error);
    }
  };

  const handleEdit = (equipment) => {
    setEditingEquipment(equipment);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEquipment(id);
      fetchEquipments();
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  return (
    <div>
      <h1>Equipments</h1>
      <EquipmentForm onSubmit={handleSubmit} initialData={editingEquipment || {}} />
      <EquipmentTable equipments={equipments} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Equipments;