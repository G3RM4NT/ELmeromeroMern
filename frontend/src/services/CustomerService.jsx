import axios from 'axios';

const API = 'http://localhost:4000/api/customers';

// Obtener todos los customers (GET /api/customers)
export const getCustomers = () => axios.get(API);

// Obtener un customer por ID (GET /api/customers/:id)
export const getCustomer = (id) => axios.get(`${API}/${id}`);

// Crear un nuevo customer (POST /api/customers)
export const createCustomer = (data) => axios.post(API, data);

// Actualizar un customer (PUT /api/customers/:id)
export const updateCustomer = (id, data) => axios.put(`${API}/${id}`, data);

// Eliminar un customer (DELETE /api/customers/:id)
export const deleteCustomer = (id) => axios.delete(`${API}/${id}`);
