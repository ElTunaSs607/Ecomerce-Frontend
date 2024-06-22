import { useEffect } from "react";
import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { createTask, deleteProducto, ActualizarProducto, getProducto } from '../api/ice.api';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar/Nabvar";

export function FormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProducto() {
      if (params.id) {
        try {
          const response = await getProducto(params.id);
          if (response && response.data) {
            const { nombre, Precio, cantidad, descripcion } = response.data;
            setValue('nombre', nombre);
            setValue('Precio', Precio);
            setValue('cantidad', cantidad);
            setValue('descripcion', descripcion);
          } else {
            console.error('Error: No se recibieron datos del producto');
          }
        } catch (error) {
          console.error('Error al cargar el producto:', error);
        }
      }
    }
    loadProducto();
  }, [params.id, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('Precio', data.Precio);
    formData.append('cantidad', data.cantidad);
    formData.append('descripcion', data.descripcion);
    if (data.imagen[0]) {
      formData.append('imagen', data.imagen[0]);
    }

    try {
      if (params.id) {
        await ActualizarProducto(params.id, formData);
        toast.success('Producto Actualizado con éxito', {
          duration: 2000,
          position: 'bottom-center',
          style: {
            backgroundColor: '#4caf50',
            color: '#fff',
          },
        });
      } else {
        await createTask(formData);
        toast.success('Producto Creado con éxito', {
          duration: 2000,
          position: 'bottom-center',
          style: {
            backgroundColor: '#4caf50',
            color: '#fff',
          },
        });
      }
      navigate('/Home');
    } catch (error) {
      toast.error('Error al crear/actualizar el producto', {
        duration: 2000,
        position: 'bottom-center',
        style: {
          backgroundColor: '#f44336',
          color: '#fff',
        },
      });
    }
  });

  return (
    <div className="max-w-xl mx-auto">
      <Navbar />
      <div style={{ marginTop: '100px' }}>
        <form onSubmit={onSubmit}>
          <label htmlFor="nombre" style={{ color: 'white' }}>Nombre</label>
          <input type="text" placeholder='Nombre' {...register("nombre", { required: true })} 
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3 white"/>
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

          <label htmlFor="imagen">Imagen</label>
          <input type="file" {...register("imagen_url")} className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"/>

          <button type="submit" className="bg-indigo-500 rounded-lg block w-full p-3">
            Crear Producto
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
          </div>
        )}
      </div>
    </div>
  );
}
