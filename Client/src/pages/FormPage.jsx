import { useEffect } from "react";
import { toast } from 'react-hot-toast'
import { useForm } from "react-hook-form";
import { createTask, deleteProducto, ActualizarProducto, getProducto } from '../api/ice.api';
import { useNavigate, useParams } from "react-router-dom";


export function FormPage() {
  const { register, 
      handleSubmit, 
      formState: { errors } ,
      setValue
  } = useForm();
  const navigate = useNavigate();
  const params = useParams()

// Listar los productos //
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await ActualizarProducto(params.id, data);
      toast.success('Producto Actualizado con éxito ', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          backgroundColor: '#4caf50',
          color: '#fff',
        },
      
      });
    }else{
      toast.success('Producto Creado con éxito', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          backgroundColor: '#4caf50',
          color: '#fff',
        },
      
      });
    await createTask(data);
    navigate('/Listar_producto');
    }
    navigate('/Listar_producto');
  });

//  Obtener los productos y actualizarlos //
  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        
        const { data: { nombre, Precio, cantidad, descripcion }} = await getProducto(params.id);
        setValue('nombre', nombre);
        setValue('Precio', Precio);
        setValue('cantidad', cantidad);
        setValue('descripcion', descripcion);
      }
    }
    loadProducto();
  }, [params.id, setValue]);
// Formulario //

return (
  <div className="max-w-xl mx-auto">
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input type="text" placeholder='Nombre' {...register("nombre", { required: true })} 
      className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>
      {errors.nombre && <span>Este campo es obligatorio</span>}

      <label htmlFor="Precio">Precio</label>
      <input type="text" placeholder='Precio' {...register("Precio", { required: true })} 
      className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>
      {errors.Precio && <span>Este campo es obligatorio</span>}

      <label htmlFor="cantidad">Cantidad</label>
      <input type="number" placeholder="Cantidad" {...register("cantidad", { required: true })} 
      className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>
      {errors.cantidad && <span>Este campo es obligatorio</span>}

      <label htmlFor="descripcion">Descripción</label>
      <textarea placeholder="Descripción" {...register("descripcion", { required: true })}
      className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"></textarea>
      {errors.descripcion && <span>Este campo es obligatorio</span>}

      <button type="submit" className="bg-indigo-500 rounded-lg block w-full p-3 ">Crear Producto
      
      </button>
    </form>

    {params.id && (
      <div className="flex justify-end">
        <button className="bg-red-500 rounded-lg block mt-2 w-40 text-white p-3"
      onClick={async () => {
        const accepted = window.confirm("¿Estás seguro de eliminar este producto?");
        if (accepted) {
          await deleteProducto(params.id);
          toast.success('Producto Eliminado con éxito', {
            duration: 2000,
            position: 'bottom-center',
            style: {
              backgroundColor: '#4caf50',
              color: '#fff',
            },
          });
          navigate('/Listar_producto');
        }
      }}>
        Eliminar
      </button>
      </div>    )}
  </div>
);}
