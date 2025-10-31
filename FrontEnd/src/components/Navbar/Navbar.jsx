import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/tumtum/usuarios/activo", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUsuario(data))
      .catch(() => setUsuario(null));
  }, []);

  const cerrarSesion = async () => {
    try {
      await fetch("http://localhost:8080/tumtum/usuarios/logout", {
        method: "POST",
        credentials: "include"
      });
      setUsuario(null);
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      alert("No se pudo cerrar la sesión");
    }
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
            <button className="cerrar-sesion" onClick={cerrarSesion}>Cerrar cuenta</button>
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
