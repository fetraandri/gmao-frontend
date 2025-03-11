import { useState, useEffect } from 'react';
import { FaSave } from 'react-icons/fa';
import { getEquipments } from '../services/api';

const MaintenanceForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    equipmentId: initialData.equipmentId || '',
    details: initialData.details || '',
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
    if (!initialData.id) { // Réinitialiser seulement pour une création
      setFormData({
        equipmentId: '',
        details: '',
        date: '',
        status: 'En attente',
      });
    }
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
      <div>
        <label>Details:</label>
        <input
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          required
          disabled={loading}
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
          disabled={loading}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
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
      <button type="submit" disabled={loading}>
        <FaSave /> {initialData.id ? 'Update' : 'Add'} Maintenance
      </button>
    </form>
  );
};

export default MaintenanceForm;