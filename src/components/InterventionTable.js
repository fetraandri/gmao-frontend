import { FaEdit, FaTrash } from 'react-icons/fa';

const InterventionTable = ({ interventions, equipments, onEdit, onDelete }) => {
  const getEquipmentName = (id) => {
    const equipment = equipments.find((eq) => eq.id === id);
    return equipment ? equipment.name : 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
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
          {interventions.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                Aucune intervention trouvée
              </td>
            </tr>
          ) : (
            interventions.map((intervention) => (
              <tr key={intervention.id}>
                <td className="px-6 py-4 whitespace-nowrap">{intervention.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getEquipmentName(intervention.equipmentId)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{intervention.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(intervention.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{intervention.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
                    onClick={() => onEdit(intervention)}
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                  <button
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={() => onDelete(intervention.id)}
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterventionTable;