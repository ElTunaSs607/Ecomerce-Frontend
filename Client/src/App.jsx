import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; 
import { Home } from './components/Home'; 
import { Listar_producto } from './pages/Listar_producto'; 
import { FormPage } from './pages/FormPage'; 
import { Login } from './components/Login'; 
import { AuthProvider } from './context/AuthContext'; 

function App() {
  return (
    <Router>
      <div>
        <AuthProvider>
          <Routes>
            {/* Rutas protegidas */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Listar_producto" element={<ProtectedRoute><Listar_producto /></ProtectedRoute>} />

            {/* Ruta protegida para crear producto */}
            <Route path="/ice-create" element={<ProtectedRoute><FormPage /></ProtectedRoute>} />

            {/* Ruta por defecto para manejar rutas desconocidas */}
            <Route path="*" element={<Login />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
