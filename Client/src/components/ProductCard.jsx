import {useNavigate} from 'react-router-dom'

export function ProductCard({ Lista }) {

  const navigate = useNavigate();

  return (
    <div className='bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer'
    
      onClick = {() => {
        navigate(`/ice/${Lista.id}`);

      }}
  >
          <h1 className='font-bold uppercase'>{Lista.nombre}</h1>
          <h2 className='text-slate-400 font-bold'>Precio: {Lista.Precio}</h2>
          <h2 className='text-slate-400 font-bold' >Cantidad: {Lista.cantidad}</h2>
          <p className='text-slate-400 font-bold'>Descripción: {Lista.descripcion}</p>
        </div>
   
  )
}
 
