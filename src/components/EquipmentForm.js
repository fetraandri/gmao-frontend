import { useState } from 'react';
import { FaSave } from 'react-icons/fa';

const EquipmentForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    type: initialData.type || '',
    status: initialData.status || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        <FaSave /> {initialData.id ? 'Update' : 'Add'} Equipment
      </button>
    </form>
  );
};

export default EquipmentForm;