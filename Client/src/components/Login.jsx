import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Alert } from "./Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword, user: authUser, loading } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is already authenticated, redirect to home page
    if (authUser && !loading) {
      navigate("/");
    }
  }, [authUser, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      // No need to navigate here, useEffect will handle it
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      // No need to navigate here, useEffect will handle it
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!user.email) return setError("Escribe un correo electrónico para restablecer la contraseña");
    try {
      await resetPassword(user.email);
      setError("Te hemos enviado un correo electrónico. Revisa tu bandeja de entrada");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-3xl font-bold mb-4 text-black text-center">Iniciar Sesión</h2>
        {error && <Alert message={error} />}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={user.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              value={user.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="*************"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar Sesión
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
              onClick={handleResetPassword}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
        <button
          onClick={handleGoogleSignin}
          className="bg-gray-200 hover:bg-gray-300 text-black shadow rounded border-2 border-gray-300 py-2 px-4 w-full mb-4 focus:outline-none focus:shadow-outline"
        >
          Iniciar Sesión con Google
        </button>
        <div className="text-center">
          <p className="text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-blue-700 hover:text-blue-900">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
