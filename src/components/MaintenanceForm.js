import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveMaintenance, fetchEquipments } from '../services/api';

function MaintenanceForm({ onSave }) {
  const [formData, setFormData] = useState({
    equipment: { id: '' },
    description: '',
    maintenanceDate: '',
    status: 'Planifiée'
  });
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipments()
      .then(response => setEquipments(response.data))
      .catch(error => console.error('Erreur lors du chargement des équipements:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'equipment.id') {
      setFormData({ ...formData, equipment: { id: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMaintenance(formData)
      .then(() => {
        if (onSave) onSave();
        navigate('/maintenance');
      })
      .catch(error => console.error('Erreur lors de l’ajout de la maintenance:', error));
  };

  return (
    <div>
      <h2>Ajouter une maintenance</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <label>Équipement :</label>
        <select
          name="equipment.id"
          value={formData.equipment.id}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="">-- Sélectionnez un équipement --</option>
          {equipments.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <label>Description :</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
        />
        <label>Date de maintenance :</label>
        <input
          type="date"
          name="maintenanceDate"
          value={formData.maintenanceDate}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <label>Statut :</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="Planifiée">Planifiée</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
        <button type="submit">Enregistrer</button>
      </form>
      <button onClick={() => navigate('/maintenance')} style={{ marginTop: '10px', backgroundColor: '#6c757d' }}>
        Retour
      </button>
    </div>
  );
}

export default MaintenanceForm;