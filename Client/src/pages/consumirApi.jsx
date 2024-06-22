import { useFetch } from "../useFetch";


export function ConsumirApi() {
  const { Lista } = useFetch('');

  return (
    <div>
      {Lista.map((Lista) => (
        <div key={Lista.id}>
          <h1>{Lista.nombre}</h1>
          <h2>{Lista.Precio}</h2>
          <h2>{Lista.cantidad}</h2>
          <p>{Lista.descripcion}</p>
        </div>
      ))}
    </div>
  );
}