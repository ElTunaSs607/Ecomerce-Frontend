import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";

export function Registro() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); 
    try {
      await signup(user.email, user.password);
      setSuccessMessage("¡Registro exitoso! Redirigiendo al inicio de sesión...");
      setTimeout(() => {
        navigate("/login"); // Redirigir al usuario al inicio de sesión después de 2 segundos
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>
        {error && <Alert message={error} />}
        {successMessage && <Alert message={successMessage} success />}

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="youremail@company.tld"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="*************"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Registrarse
          </button>
        </form>
        <p className="my-4 text-sm flex justify-between px-3">
          ¿Ya tienes una cuenta?
          <Link to="/login" className="text-blue-700 hover:text-blue-900">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
