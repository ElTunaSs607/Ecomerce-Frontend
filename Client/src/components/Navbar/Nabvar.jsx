import './Navbar.css'; // Cambiado '../Navbar/Navbar.css' por './Navbar.css'
import logo_light from '../../assets/navbar/logo_1.png';
import { FaSearch, FaHome, FaProductHunt } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext"; // Importa useAuth desde el contexto de autenticación

function Navbar() {
  let iconStyles = { color: "white", fontSize: "1.5em", marginRight: "0.5rem" };
  const { user, logout } = useAuth(); // Obtén el estado de autenticación y la función de logout del contexto de autenticación

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img src={logo_light} alt="Logo" className='logo' />
      </div>
      <div className='search-box'>
        <div className="input-container">
          <input type="text" placeholder='Busca los mejores productos y marcas :)' className="search-input" />
          <FaSearch className='lupa' />
        </div>
      </div>
      <ul className='nav-links'>
        <li>
          <FaHome style={iconStyles} />
          <span><Link to="/Home">Inicio</Link></span>
        </li>
        <li>
          <FaProductHunt style={iconStyles} />
          <span><Link to="/Listar_producto">Productos</Link></span>
        </li>
        <li className="login-container">
          {user ? ( // Contenido condicional basado en la autenticación
            <>
              <div className="login-text">
                <p>Bienvenido, {user.displayName || user.email}</p>
                <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
              </div>
            </>
          ) : (
            <button className='ini'>
              <CiUser style={iconStyles} />
              <div className="login-text">
                <span>¡Hola!</span>
                <Link to="/Login">Inicia sesión</Link>
              </div>
            </button>
          )}
          <div className="vertical-line-nav"></div>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
