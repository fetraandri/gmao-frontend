// src/components/InterventionTable.js

const InterventionTable = ({ interventions, equipments }) => {
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
        </tr>
      </thead>
      <tbody>
        {interventions.map((intervention) => (
          <tr key={intervention.id}>
            <td>{intervention.id}</td>
            <td>{getEquipmentName(intervention.equipmentId)}</td>
            <td>{intervention.description}</td>
            <td>{new Date(intervention.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InterventionTable;