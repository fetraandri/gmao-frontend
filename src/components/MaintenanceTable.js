import React from 'react';

function MaintenanceTable({ maintenances, onDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f1f1f1' }}>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Équipement</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Statut</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {maintenances.map(maintenance => (
          <tr key={maintenance.id}>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{maintenance.id}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              {maintenance.equipment ? maintenance.equipment.name : 'N/A'}
            </td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{maintenance.description}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{maintenance.maintenanceDate}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{maintenance.status}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              <button onClick={() => onDelete(maintenance.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MaintenanceTable;