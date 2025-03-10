// src/components/EquipmentTable.js
import { FaEdit, FaTrash } from 'react-icons/fa';

const EquipmentTable = ({ equipments, onEdit, onDelete }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {equipments.map((equipment) => (
          <tr key={equipment.id}>
            <td>{equipment.id}</td>
            <td>{equipment.name}</td>
            <td>{equipment.type}</td>
            <td>{equipment.status}</td>
            <td>
              <button className="edit" onClick={() => onEdit(equipment)}>
                <FaEdit /> Edit
              </button>
              <button onClick={() => onDelete(equipment.id)}>
                <FaTrash /> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentTable;