import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEquipmentsForIntervention, saveIntervention } from '../services/api';

function InterventionForm({ onSave }) {
  const [formData, setFormData] = useState({
    description: '',
    status: 'En attente',
    equipment: { id: '' }
  });
  const [equipments, setEquipments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEquipmentsForIntervention()
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
    saveIntervention(formData)
      .then(() => {
        if (onSave) onSave(); // Callback pour mettre à jour la liste si nécessaire
        navigate('/interventions');
      })
      .catch(error => console.error('Erreur lors de la sauvegarde:', error));
  };

  return (
    <div>
      <h2>Ajouter une intervention</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <label>Description :</label>
        <input
          type="text"
          name="description"
          value={formData.description}
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
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
        <label>Équipement :</label>
        <select
          name="equipment.id"
          value={formData.equipment.id}
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="">-- Sélectionnez un équipement --</option>
          {equipments.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default InterventionForm;