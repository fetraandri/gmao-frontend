import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchEquipments = () => axios.get(`${API_URL}/equipments`);
export const deleteEquipment = (id) => axios.delete(`${API_URL}/equipments/${id}`);
export const saveEquipment = (equipment) => axios.post(`${API_URL}/equipments`, equipment);
export const fetchInterventions = () => axios.get(`${API_URL}/interventions`);
export const fetchEquipmentsForIntervention = () => axios.get(`${API_URL}/equipments/for-intervention`);
export const saveIntervention = (intervention) => axios.post(`${API_URL}/interventions`, intervention);
export const fetchMaintenances = () => axios.get(`${API_URL}/maintenances`); 
export const saveMaintenance = (maintenance) => axios.post(`${API_URL}/maintenances`, maintenance); 
export const deleteMaintenance = (id) => axios.delete(`${API_URL}/maintenances/${id}`);