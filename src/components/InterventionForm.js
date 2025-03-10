// src/components/InterventionForm.js
import { useState } from 'react';

const InterventionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Equipment ID:</label>
        <input
          type="number"
          name="equipmentId"
          value={formData.equipmentId}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Intervention</button>
    </form>
  );
};

export default InterventionForm;