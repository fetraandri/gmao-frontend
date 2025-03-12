import { FaEdit, FaTrash } from 'react-icons/fa';

const EquipmentTable = ({ equipments, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipments.map((equipment) => (
            <tr key={equipment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{equipment.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{equipment.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{equipment.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{equipment.status}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                  onClick={() => onEdit(equipment)}
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => onDelete(equipment.id)}
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;