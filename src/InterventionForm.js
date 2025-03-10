import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InterventionForm({ history }) {
  const [formData, setFormData] = useState({
    description: '',
    status: 'En attente',
    equipment: { id: '' }
  });
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/equipments/for-intervention')
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
    axios.post('http://localhost:8080/api/interventions', formData)
      .then(() => history.push('/interventions'))
      .catch(error => console.error('Erreur lors de la sauvegarde:', error));
  };

  return (
    <div>
      <h1>Ajouter une intervention</h1>
      <form onSubmit={handleSubmit}>
        <label>Description :</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        /><br />
        <label>Statut :</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select><br />
        <label>Équipement :</label>
        <select name="equipment.id" value={formData.equipment.id} onChange={handleChange}>
          <option value="">-- Sélectionnez un équipement --</option>
          {equipments.map(eq => (
            <option key={eq.id} value={eq.id}>{eq.name}</option>
          ))}
        </select><br />
        <button type="submit">Enregistrer</button>
      </form>
      <a href="/interventions">Retour à la liste</a>
    </div>
  );
}

export default InterventionForm;