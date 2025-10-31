import './AdminPanel.css';
import { useState, useEffect } from 'react';

export default function AdminPanel() {
  const [vista, setVista] = useState('home');
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    precioProducto: '',
    imgUrlProducto: ''
  });
  const [productoEditando, setProductoEditando] = useState(null);

  const cambiarVista = (id) => setVista(id);

  useEffect(() => {
    if (vista === 'productos') {
      fetch("http://localhost:8080/tumtum/productos", {
        credentials: 'include' 
      })
        .then(res => {
          if (res.status === 401) {
            window.location.href = '/login'; 
            return;
          }
          return res.json();
        })
        .then(data => setProductos(data))
        .catch(err => console.error("Error al cargar productos:", err));
    }
  }, [vista]);

  const handleCrearProducto = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/tumtum/productos", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(nuevoProducto)
    })
      .then(() => {
        alert("Producto creado");
        setNuevoProducto({ nombreProducto: '', precioProducto: '', imgUrlProducto: '' });
        return fetch("http://localhost:8080/tumtum/productos", { credentials: 'include' });
      })
      .then(res => res.json())
      .then(data => setProductos(data));
  };

  const eliminarProducto = (id) => {
    fetch(`http://localhost:8080/tumtum/productos/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(() => setProductos(productos.filter(p => p.idProducto !== id)))
      .catch(err => console.error("Error al eliminar producto:", err));
  };

  const handleEditarProducto = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/tumtum/productos/${productoEditando.idProducto}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(productoEditando)
    })
      .then(() => {
        alert("Producto actualizado");
        setProductoEditando(null);
        return fetch("http://localhost:8080/tumtum/productos", { credentials: 'include' });
      })
      .then(res => res.json())
      .then(data => setProductos(data));
  };

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
            <p>Funcionalidad en desarrollo.</p>
          </section>
        )}

        {vista === 'productos' && (
          <section className="vista">
            <h2>Productos disponibles</h2>

            <form onSubmit={handleCrearProducto} className="formulario-producto">
              <input
                name="nombreProducto"
                placeholder="Nombre"
                value={nuevoProducto.nombreProducto}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombreProducto: e.target.value })}
                required
              />
              <input
                name="precioProducto"
                placeholder="Precio"
                type="number"
                value={nuevoProducto.precioProducto}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, precioProducto: e.target.value })}
                required
              />
              <input
                name="imgUrlProducto"
                placeholder="Imagen (ruta)"
                value={nuevoProducto.imgUrlProducto}
                onChange={(e) => setNuevoProducto({ ...nuevoProducto, imgUrlProducto: e.target.value })}
                required
              />
              <button type="submit">Crear producto</button>
            </form>

            {productoEditando && (
              <form onSubmit={handleEditarProducto} className="formulario-edicion">
                <h3>Editar producto</h3>
                <input
                  name="nombreProducto"
                  placeholder="Nombre"
                  value={productoEditando.nombreProducto}
                  onChange={(e) => setProductoEditando({ ...productoEditando, nombreProducto: e.target.value })}
                  required
                />
                <input
                  name="precioProducto"
                  placeholder="Precio"
                  type="number"
                  value={productoEditando.precioProducto}
                  onChange={(e) => setProductoEditando({ ...productoEditando, precioProducto: e.target.value })}
                  required
                />
                <input
                  name="imgUrlProducto"
                  placeholder="Imagen (ruta)"
                  value={productoEditando.imgUrlProducto}
                  onChange={(e) => setProductoEditando({ ...productoEditando, imgUrlProducto: e.target.value })}
                  required
                />
                <button type="submit">Guardar cambios</button>
                <button type="button" onClick={() => setProductoEditando(null)}>Cancelar</button>
              </form>
            )}

            <ul className="lista-productos">
              {productos.map(p => (
                <li key={p.idProducto} className="item-producto">
                  <img src={p.imgUrlProducto} alt={p.nombreProducto} width="60" />
                  <div>
                    <strong>{p.nombreProducto}</strong><br />
                    <span>${p.precioProducto}</span>
                  </div>
                  <button onClick={() => setProductoEditando(p)}>Editar</button>
                  <button onClick={() => eliminarProducto(p.idProducto)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {vista === 'ordenes' && (
          <section className="vista">
            <h2>Órdenes registradas</h2>
            <p>Funcionalidad en desarrollo.</p>
          </section>
        )}
      </main>
    </div>
  );
}
