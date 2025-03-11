import { FaEdit, FaTrash } from 'react-icons/fa';

const InterventionTable = ({ interventions, equipments, onEdit, onDelete }) => {
  const getEquipmentName = (id) => {
    const equipment = equipments.find((eq) => eq.id === id);
    return equipment ? equipment.name : 'Unknown';
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Equipment</th>
          <th>Description</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {interventions.length === 0 ? (
          <tr>
            <td colSpan="6">Aucune intervention trouvée</td>
          </tr>
        ) : (
          interventions.map((intervention) => (
            <tr key={intervention.id}>
              <td>{intervention.id}</td>
              <td>{getEquipmentName(intervention.equipmentId)}</td>
              <td>{intervention.description}</td>
              <td>{new Date(intervention.date).toLocaleDateString()}</td>
              <td>{intervention.status}</td>
              <td>
                <button className="edit" onClick={() => onEdit(intervention)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => onDelete(intervention.id)}>
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default InterventionTable;