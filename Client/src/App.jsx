import { BrowserRouter, Routes, Route, Navigate } from 
'react-router-dom';
import { Listar_producto } from './pages/Listar_producto';
import { FormPage } from './pages/FormPage';
import { Navigation } from './components/Navigation';
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div className='container mx-auto' >
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/Listar_producto" />} />
        <Route path="/Listar_producto" element={<Listar_producto />}  /> // redirigir a lista de producto//
        <Route path="/ice-create" element={<FormPage />} /> // redirigir a crear de producto//
        <Route path="/ice/:id" element={<FormPage />} /> 
      </Routes>
      <Toaster/>
      </div>
    </BrowserRouter>
  );
}

export default App
