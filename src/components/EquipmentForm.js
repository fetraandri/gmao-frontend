import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveEquipment } from '../services/api';

function EquipmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    nextMaintenanceDate: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEquipment(formData)
      .then(() => {
        console.log('Équipement ajouté avec succès');
        navigate('/equipments');
      })
      .catch(error => console.error('Erreur lors de l’ajout de l’équipement:', error));
  };

  return (
    <div>
      <h2>Ajouter un nouvel équipement</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <label>Nom :</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <label>Description :</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '100px' }}
        />
        <label>Date de prochaine maintenance :</label>
        <input
          type="date"
          name="nextMaintenanceDate"
          value={formData.nextMaintenanceDate}
          onChange={handleChange}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit">Enregistrer</button>
      </form>
      <button onClick={() => navigate('/equipments')} style={{ marginTop: '10px', backgroundColor: '#6c757d' }}>
        Retour
      </button>
    </div>
  );
}

export default EquipmentForm;