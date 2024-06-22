import { createContext, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor de contexto para manejar la autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [isAdmin, setIsAdmin] = useState(false); 

  // Función para registrar un nuevo usuario con correo y contraseña
  const signup = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user",  
      });
      return user;
    } catch (error) {
      throw new Error("Error al registrarse: " + error.message);
    }
  };

  // Función para iniciar sesión con correo y contraseña
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error("Error al iniciar sesión: " + error.message);
    }
  };

  // Función para iniciar sesión con Google usando redirección
  const loginWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      throw new Error("Error al iniciar sesión con Google: " + error.message);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Error al cerrar sesión: " + error.message);
    }
  };

  // Función para enviar correo de restablecimiento de contraseña
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error("Error al enviar correo de restablecimiento de contraseña: " + error.message);
    }
  };

  // Efecto para gestionar el cambio de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Provee el contexto con los valores necesarios a los componentes hijos
  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        isAdmin,
      }}
    >
      {!loading && children} {/* Renderiza children solo cuando no está cargando */}
    </AuthContext.Provider>
  );
}

// Prop Types para el proveedor de contexto
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext; // Exporta el contexto por defecto
