import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Producto.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/tumtum/productos/${id}`)
      .then(res => res.json())
      .then(p => {
        const adaptado = {
          idProducto: p.idProducto,
          nombreProducto: p.nombreProducto,
          categoriaProducto: p.categoriaProducto,
          precioProducto: p.precioProducto,
          imgUrlProducto: p.imgUrlProducto,
          stockProducto: p.stockProducto,
          descripcionProducto: p.descripcionProducto
        };
        setProducto(adaptado);
      })
      .catch(err => console.error('Error al cargar producto:', err));

    fetch('http://localhost:8080/tumtum/usuarios/activo', { credentials: 'include' })
    .then(res => {
      console.log("Usuario status:", res.status);
      if (!res.ok) throw new Error("No autorizado");
      return res.json();
    })
    .then(data => {
      console.log("Usuario recibido:", data);
    })
    .catch(err => {
      console.error("Error al cargar usuario:", err);
    });
}, []);

  if (!producto) return <p>Producto no encontrado</p>;

  const agregarAlCarrito = async () => {
    const talla = document.getElementById("talla").value;

    const item = {
      idProducto: producto.idProducto,
      nombreProducto: producto.nombreProducto,
      precioProducto: producto.precioProducto,
      imgUrlProducto: producto.imgUrlProducto,
      talla,
      cantidad: 1
    };

    try {
      const res = await fetch("http://localhost:8080/tumtum/carrito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(item)
      });

      if (!res.ok) throw new Error("Error al agregar al carrito");
      alert(`${producto.nombreProducto} (talla ${talla}) agregado al carrito`);
    } catch (err) {
      console.error("Error:", err);
      alert("No se pudo agregar al carrito");
    }
  };

  return (
    <>
      <Navbar />
      <main className="detalle-producto">
        <img src={producto.imgUrlProducto} alt={producto.nombreProducto} />
        <div className="info">
          <h1>{producto.nombreProducto}</h1>
          <p className="precio">${producto.precioProducto.toLocaleString("es-CL")}</p>
          <p>{producto.descripcionProducto}</p>

          <div className="opciones">
            <label htmlFor="talla">Talla:</label>
            <select id="talla">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>

            <div className="tabla-talles">
              <h3>Guía de talles</h3>
              <table>
                <thead>
                  <tr><th>Talle</th><th>Ancho</th><th>Largo</th></tr>
                </thead>
                <tbody>
                  <tr><td>S</td><td>57 cm</td><td>78 cm</td></tr>
                  <tr><td>M</td><td>60 cm</td><td>80 cm</td></tr>
                  <tr><td>L</td><td>62 cm</td><td>82 cm</td></tr>
                  <tr><td>XL</td><td>65 cm</td><td>84 cm</td></tr>
                </tbody>
              </table>
            </div>

            <button className="agregar-carrito" onClick={agregarAlCarrito}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
