import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { getEquipments } from '../services/api';

const InterventionForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    equipmentId: initialData.equipmentId || '',
    description: initialData.description || '',
    date: initialData.date ? initialData.date.split('T')[0] : '',
    status: initialData.status || 'En attente',
  });
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      try {
        const response = await getEquipments();
        setEquipments(response.data);
      } catch (error) {
        console.error('Error fetching equipments:', error);
      } finally {
        setLoading(false);
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
    if (!initialData.id) {
      setFormData({
        equipmentId: '',
        description: '',
        date: '',
        status: 'En attente',
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-group-container">
        <div className="form-group">
          <label htmlFor="equipmentId">Equipment:</label>
          <select
            id="equipmentId"
            name="equipmentId"
            value={formData.equipmentId}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select an equipment</option>
            {equipments.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name} (ID: {eq.id})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            <FaSave /> {initialData.id ? 'Update' : 'Add'} Intervention
          </button>
        </div>
      </form>
    </div>
  );
};

export default InterventionForm;