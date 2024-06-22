import { useEffect, useState } from "react";
import { getAllTasks } from '../api/ice.api';
import { ProductCard } from './ProductCard';
import { useNavigate } from 'react-router-dom'; 

export const TaskList = () => {
    const [lista, setLista] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadProduct() {
            try {
                const res = await getAllTasks();
                console.log("Response:", res);
                if (res && res.data) {
                    setLista(res.data);
                } else {
                    console.error("No data in response", res);
                    setError("No data received");
                }
            } catch (error) {
                console.error("Error loading tasks:", error);
                setError("Failed to load tasks");
            }
        }
        loadProduct();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleAddProduct = () => {
        navigate('/ice-create');
    };

    return (
        <div 
          className="task-list-container" 
          style={{ 
            backgroundImage: "url('/path/to/your/background/image.jpg')", 
            backgroundSize: 'cover', 
            minHeight: '100vh',
            padding: '20px'
          }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-16 p-4">
                {Array.isArray(lista) && lista.map((item) => (
                    <ProductCard key={item.id} lista={item} />
                ))}
            </div>
            <div className="flex justify-end mt-4">
                <button 
                    className="bg-indigo-500 text-white rounded-lg px-4 py-2"
                    onClick={handleAddProduct}
                >
                    Agregar Producto
                </button>
            </div>
        </div>
    );
};
