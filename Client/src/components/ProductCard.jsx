import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export function ProductCard({ lista }) {
  const navigate = useNavigate();

  function formatPrice(price) {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'Precio no válido';
    }
  
    const integerPart = Math.floor(price);
    const decimalPart = price - integerPart;
    let formattedPrice = integerPart.toLocaleString('es-CL');
  
    if (decimalPart > 0) {
      formattedPrice += decimalPart.toFixed(3).slice(1);
    } else {
      formattedPrice += '.000';
    }
  
    return `$ ${formattedPrice} CLP`;
  }

  return (
    <div className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded-md shadow-md">
      <h1 className="font-bold text-white text-lg">{lista.nombre}</h1>
      <hr className="my-1 border-gray-500" />
      <p className="text-slate-400 font-semibold">Precio: {formatPrice(lista.precio)}</p>
      <p className="text-slate-400 font-semibold">Cantidad: {lista.cantidad}</p>
      {lista.imagen_url && <img src={lista.imagen_url} alt={lista.nombre} className="w-full h-48 object-cover mt-2" />}
      <div className="flex justify-between mt-2">
        <button 
          className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={() => navigate(`/ice/${lista.id}`)}
        >
          Editar
        </button>
        <button 
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  lista: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number, 
    cantidad: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagen_url: PropTypes.string,  
  }).isRequired,
};
