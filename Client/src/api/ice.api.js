import axios from 'axios';

const iceApi = axios.create({
    baseURL: "http://localhost:8000/api/ice/"
});

export const getAllTasks = () => {
    return iceApi.get('/');
};

export const createTask = (Lista) => {
    return iceApi.post('/', Lista);
};

export const deleteProducto = (id) => iceApi.delete(`/${id}`);



export const ActualizarProducto = (id, Lista) => iceApi.put(`/${id}/`, Lista);

export const getProducto = (id) => iceApi.get(`/${id}/`);


