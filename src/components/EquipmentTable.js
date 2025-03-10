import React from 'react';

function EquipmentTable({ equipments, onDelete }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f1f1f1' }}>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nom</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Description</th>
          <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {equipments.map(eq => (
          <tr key={eq.id}>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{eq.id}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{eq.name}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>{eq.description}</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              <button onClick={() => onDelete(eq.id)}>Supprimer</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EquipmentTable;