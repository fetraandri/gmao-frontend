// src/components/MaintenanceTable.js
const MaintenanceTable = ({ maintenances, equipments }) => {
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
        </tr>
      </thead>
      <tbody>
        {maintenances.map((maintenance) => (
          <tr key={maintenance.id}>
            <td>{maintenance.id}</td>
            <td>{getEquipmentName(maintenance.equipmentId)}</td>
            <td>{maintenance.details}</td>
            <td>{new Date(maintenance.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceTable;