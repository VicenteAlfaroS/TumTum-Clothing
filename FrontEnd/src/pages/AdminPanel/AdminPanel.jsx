import './AdminPanel.css';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [vista, setVista] = useState('home');
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);

  const cambiarVista = (id) => setVista(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (vista === 'productos') {
          const res = await fetch("http://localhost:8080/tumtum/productos", { credentials: 'include' });
          if (res.status === 401) return window.location.href = '/login';
          const data = await res.json();
          setProductos(data);
        }

        if (vista === 'usuarios') {
          const res = await fetch("http://localhost:8080/tumtum/usuarios", { credentials: 'include' });
          if (res.status === 401) return window.location.href = '/login';
          const data = await res.json();
          setUsuarios(data);
        }

        if (vista === 'ordenes') {
          const res = await fetch("http://localhost:8080/tumtum/ordenes", { credentials: 'include' });
          if (res.status === 401) return window.location.href = '/login';
          const data = await res.json();
          setOrdenes(data);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    fetchData();
  }, [vista]);

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="logo">TumTum</div>
        <nav>
          <ul>
            <li><button onClick={() => cambiarVista('home')}>Inicio</button></li>
            <li><button onClick={() => cambiarVista('usuarios')}>Usuarios</button></li>
            <li><button onClick={() => cambiarVista('productos')}>Productos</button></li>
            <li><button onClick={() => cambiarVista('ordenes')}>Órdenes</button></li>
            <li><button onClick={() => window.location.href = '/login'}>Cerrar sesión</button></li>
          </ul>
        </nav>
      </aside>

      <main className="contenido">
        {vista === 'home' && (
          <section className="vista active">
            <h1>¡Hola Administrador!</h1>
            <p>Bienvenido al panel de control de TumTum.</p>
          </section>
        )}

        {vista === 'usuarios' && (
          <section className="vista">
            <h2>Usuarios registrados</h2>
            {usuarios.length === 0 ? (
              <p>No hay usuarios registrados.</p>
            ) : (
              <ul className="lista-usuarios">
                {usuarios.map(u => (
                  <li key={u.idUsuario}>
                    <strong>{u.nombre}</strong> ({u.email})
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {vista === 'productos' && (
          <section className="vista">
            <h2>Productos disponibles</h2>
            {productos.length === 0 ? (
              <p>No hay productos disponibles.</p>
            ) : (
              <ul className="lista-productos">
                {productos.map(p => (
                  <li key={p.idProducto} className="item-producto">
                    <img src={p.imgUrlProducto} alt={p.nombreProducto} width="60" />
                    <div>
                      <strong>{p.nombreProducto}</strong><br />
                      <span>${p.precioProducto}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {vista === 'ordenes' && (
          <section className="vista">
            <h2>Órdenes registradas</h2>
            {ordenes.length === 0 ? (
              <p>No hay órdenes registradas.</p>
            ) : (
              <ul className="lista-ordenes">
                {ordenes.map(o => (
                  <li key={o.idOrden}>
                    <strong>Orden #{o.idOrden}</strong> - Estado: {o.estado} - Cliente: {o.usuario?.nombre || 'Sin nombre'}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
