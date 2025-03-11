import { FaEdit, FaTrash } from 'react-icons/fa';

const MaintenanceTable = ({ maintenances, equipments, onEdit, onDelete }) => {
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
          <th>Details</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {maintenances.length === 0 ? (
          <tr>
            <td colSpan="6">Aucune maintenance trouvée</td>
          </tr>
        ) : (
          maintenances.map((maintenance) => (
            <tr key={maintenance.id}>
              <td>{maintenance.id}</td>
              <td>{getEquipmentName(maintenance.equipmentId)}</td>
              <td>{maintenance.details}</td>
              <td>{new Date(maintenance.date).toLocaleDateString()}</td>
              <td>{maintenance.status}</td>
              <td>
                <button className="edit" onClick={() => onEdit(maintenance)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => onDelete(maintenance.id)}>
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

export default MaintenanceTable;