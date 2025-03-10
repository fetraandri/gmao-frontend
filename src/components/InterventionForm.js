import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { getEquipments } from '../services/api';

const InterventionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    equipmentId: '',
    description: '',
    date: '',
  });
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await getEquipments();
        setEquipments(response.data);
      } catch (error) {
        console.error('Error fetching equipments:', error);
      }
    };
    fetchEquipments();
  }, []);

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
        <label>Equipment:</label>
        <select
          name="equipmentId"
          value={formData.equipmentId}
          onChange={handleChange}
          required
        >
          <option value="">Select an equipment</option>
          {equipments.map((eq) => (
            <option key={eq.id} value={eq.id}>
              {eq.name} (ID: {eq.id})
            </option>
          ))}
        </select>
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
      <button type="submit">
        <FaSave /> Add Intervention
      </button>
    </form>
  );
};

export default InterventionForm;