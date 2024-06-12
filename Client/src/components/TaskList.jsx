import { useEffect, useState } from "react";
import { getAllTasks } from '../api/ice.api';
import { ProductCard } from './ProductCard';

export const TaskList = () => {
    const [Lista, setLista] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadProduct() {
            try {
                const res = await getAllTasks();
                console.log("Response:", res); // Para depuración
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

    return (
        <div className="grid grid-cols-3 gap-3">
            {Lista.map((item) => (
                <ProductCard key={item.id} Lista={item} />
            ))}
        </div>
    );
};

