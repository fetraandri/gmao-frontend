// src/components/InterventionTable.js
const InterventionTable = ({ interventions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Equipment ID</th>
          <th>Description</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {interventions.map((intervention) => (
          <tr key={intervention.id}>
            <td>{intervention.id}</td>
            <td>{intervention.equipmentId}</td>
            <td>{intervention.description}</td>
            <td>{new Date(intervention.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InterventionTable;