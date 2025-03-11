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
    <div className="container">
      <form onSubmit={handleSubmit} className="form-group-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <input
            id="status"
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">
            <FaSave /> {initialData.id ? 'Update' : 'Add'} Equipment
          </button>
        </div>
      </form>
    </div>
  );
};

export default EquipmentForm;