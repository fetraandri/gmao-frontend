// src/services/api.js (dans GMAO-FRONTEND)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const getEquipments = () => api.get('/equipments');
export const createEquipment = (data) => api.post('/equipments', data);
export const updateEquipment = (id, data) => api.put(`/equipments/${id}`, data);
export const deleteEquipment = (id) => api.delete(`/equipments/${id}`);

export const getInterventions = () => api.get('/interventions');
export const createIntervention = (data) => api.post('/interventions', data);
export const updateIntervention = (id, data) => api.put(`/interventions/${id}`, data);
export const deleteIntervention = (id) => api.delete(`/interventions/${id}`);

export const getMaintenances = () => api.get('/maintenance');
export const createMaintenance = (data) => api.post('/maintenance', data);

export default api;