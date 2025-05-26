import axios from 'axios';
const API = 'http://localhost:4000/api/products';

export const getProducts = () => axios.get(API);
export const getProduct = (id) => axios.get(`${API}/${id}`);
export const createProduct = (data) => axios.post(API, data);
export const updateProduct = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API}/${id}`);
