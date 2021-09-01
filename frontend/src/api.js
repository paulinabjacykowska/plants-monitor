import { TOKEN_STORAGE_KEY } from './constants';
import { axios } from './services/axios';

export const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY) || ''}`,
  },
});

export const login = async ({ email, password }) =>
  axios.post('/login', { email, password });

export const register = async ({ email, password, name }) =>
  axios.post('/register', { email, password, name });

export const checkIsLoggedIn = () => axios.get('/validate', authHeader());

export const getSensors = () => axios.get('/sensors', authHeader());
export const addSensor = values => axios.post('/sensors', values, authHeader());
export const editSensor = (sensorId, values) =>
  axios.put(`/sensors/${sensorId}`, values, authHeader());
export const removeSensor = sensorId =>
  axios.delete(`/sensors/${sensorId}`, authHeader());

export const getPlant = plantId =>
  axios.get(`/plants/${plantId}`, authHeader());
export const getPlants = () => axios.get('/plants', authHeader());
export const addPlant = values => axios.post('/plants', values, authHeader());
export const editPlant = (plantId, values) =>
  axios.put(`/plants/${plantId}`, values, authHeader());
export const removePlant = plantId =>
  axios.delete(`/plants/${plantId}`, authHeader());

export const getSensorByPlant = plantId =>
  axios.get(`/sensor/${plantId}`, authHeader());

export const getReadings = sensorId =>
  axios.get(`/readings/${sensorId}`, authHeader());
