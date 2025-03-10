import React from 'react';

function InterventionTable({ interventions }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f1f1f1' }}>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Statut</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Équipement</th>
        </tr>
      </thead>
      <tbody>
        {interventions.map(intervention => (
          <tr key={intervention.id}>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{intervention.id}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{intervention.description}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{intervention.status}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              {intervention.equipment ? intervention.equipment.name : 'Aucun'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InterventionTable;