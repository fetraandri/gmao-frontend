const MaintenanceTable = ({ maintenances }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Equipment ID</th>
          <th>Details</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {maintenances.map((maintenance) => (
          <tr key={maintenance.id}>
            <td>{maintenance.id}</td>
            <td>{maintenance.equipmentId}</td>
            <td>{maintenance.details}</td>
            <td>{new Date(maintenance.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceTable;