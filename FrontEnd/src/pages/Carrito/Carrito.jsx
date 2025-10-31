import { useState, useEffect } from 'react';
import './Carrito.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/tumtum/usuarios/activo', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsuario(data))
      .catch(() => setUsuario(null));
    setCarrito([]);
  }, []);

  const sumar = (index) => {
    const nuevo = [...carrito];
    nuevo[index].cantidad++;
    setCarrito(nuevo);
  };

  const restar = (index) => {
    const nuevo = [...carrito];
    if (nuevo[index].cantidad > 1) {
      nuevo[index].cantidad--;
    } else {
      nuevo.splice(index, 1);
    }
    setCarrito(nuevo);
  };

  const eliminar = (index) => {
    const nuevo = [...carrito];
    nuevo.splice(index, 1);
    setCarrito(nuevo);
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    const pedido = {
      estadoPedido: "Pendiente",
      correoClientePedido: usuario?.correoUsuario || "invitado@duoc.cl",
      nombreClientePedido: usuario?.nombreUsuario || "Invitado",
      totalPedido: carrito.reduce((acc, item) => acc + item.precioProducto * item.cantidad, 0),
      detalles: carrito.map(item => ({
      cantidadDetalle: item.cantidad,
      productoDetalle: {
        idProducto: item.idProducto
      }
    }))
    };

    try {
      const res = await fetch("http://localhost:8080/tumtum/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(pedido)
      });

      if (!res.ok) throw new Error("Error al registrar el pedido");

      setCarrito([]);
      alert("Gracias por tu compra. Pedido registrado correctamente.");
    } catch (err) {
      console.error("Error al finalizar compra:", err);
      alert("No se pudo registrar el pedido");
    }
  };

  const totalGeneral = carrito.reduce((acc, item) => acc + item.precioProducto * item.cantidad, 0);

  return (
    <>
      <Navbar />
      <main className="carrito-page">
        <h1>Carrito de Compras</h1>
        {carrito.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <table className="tabla-carrito">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.imgUrlProducto} alt={item.nombreProducto} width="50" />
                      <p>{item.nombreProducto}</p>
                      <small>Talla: {item.talla || 'Única'}</small>
                    </td>
                    <td>${item.precioProducto.toLocaleString("es-CL")}</td>
                    <td>
                      <button onClick={() => restar(index)}>-</button>
                      {item.cantidad}
                      <button onClick={() => sumar(index)}>+</button>
                    </td>
                    <td>${(item.precioProducto * item.cantidad).toLocaleString("es-CL")}</td>
                    <td>
                      <button onClick={() => eliminar(index)}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="resumen">
              <p><strong>Total general:</strong> ${totalGeneral.toLocaleString("es-CL")}</p>
              <button onClick={finalizarCompra}>Finalizar compra</button>
            </div>
          </>
        )}
      </main>
      <footer>
        <p>&copy; 2025 TumTum Ropa. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
