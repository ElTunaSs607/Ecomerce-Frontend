import axios from 'axios';

const iceApi = axios.create({
    baseURL: "http://localhost:8000/api/ice/"
});

// Obtener todas las tareas
export const getAllTasks = () => {
    return iceApi.get('/');
};

// Crear una nueva tarea
export const createTask = (Lista) => {
    const formData = new FormData();
    for (const key in Lista) {
        formData.append(key, Lista[key]);
    }
    return iceApi.post('/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// Eliminar un producto
export const deleteProducto = (id) => {
    return iceApi.delete(`/${id}`);
};

// Actualizar un producto
export const ActualizarProducto = (id, Lista) => {
    const formData = new FormData();
    for (const key in Lista) {
        formData.append(key, Lista[key]);
    }
    return iceApi.put(`/${id}/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// Obtener un producto específico
export const getProducto = (id) => {
    return iceApi.get(`/${id}/`);
};

export default iceApi;
