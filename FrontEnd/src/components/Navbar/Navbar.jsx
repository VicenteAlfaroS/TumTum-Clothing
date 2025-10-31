import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [sesionCerrada, setSesionCerrada] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sesionCerrada) {
      fetch("http://localhost:8080/tumtum/usuarios/activo", {
        method: "GET",
        credentials: "include"
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data?.nombreUsuario) {
            setUsuario(data);
          }
        })
        .catch(() => setUsuario(null));
    }
  }, [sesionCerrada]);

  const cerrarSesion = () => {
    setSesionCerrada(true); // Evita que se vuelva a cargar el usuario
    setUsuario(null);       // Limpia el estado
    navigate("/login");     // Redirige al login
  };

  return (
    <header className="navbar-grid">
      <nav className="menu">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>

      <div className="navbar__centro">
        <Link to="/" className="logo">
          <img src="/img/logo.png" alt="Logo TumTum" />
        </Link>
      </div>

      <div className="acciones">
        {usuario ? (
          <div className="usuario-logueado">
            <span className="saludo">
              <img src="/img/Inicio.jpg" alt="Usuario" className="icono-usuario" />
              Hola, {usuario.nombreUsuario}
            </span>
            <button className="cerrar-sesion" onClick={cerrarSesion}>Cerrar sesión</button>
          </div>
        ) : (
          <Link to="/login"><img src="/img/Inicio.jpg" alt="Iniciar sesión" /></Link>
        )}

        <Link to="/buscar"><img src="/img/Lupa.jpg" alt="Buscar" /></Link>
        <Link to="/carrito"><img src="/img/Carro.jpg" alt="Carrito" /></Link>
      </div>
    </header>
  );
}
