import { useState } from 'react';

const MaintenanceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    details: '',
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
        <label>Details:</label>
        <input
          type="text"
          name="details"
          value={formData.details}
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
      <button type="submit">Add Maintenance</button>
    </form>
  );
};

export default MaintenanceForm;