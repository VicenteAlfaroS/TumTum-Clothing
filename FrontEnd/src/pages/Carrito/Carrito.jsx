import { useState, useEffect } from 'react';
import './Carrito.css';
import Navbar from '../../components/Navbar/Navbar';

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(datos);

    const user = JSON.parse(localStorage.getItem('usuarioActivo'));
    setUsuario(user);
  }, []);

  const actualizarCarrito = (nuevo) => {
    setCarrito(nuevo);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
  };

  const sumar = (index) => {
    const nuevo = [...carrito];
    nuevo[index].cantidad++;
    actualizarCarrito(nuevo);
  };

  const restar = (index) => {
    const nuevo = [...carrito];
    if (nuevo[index].cantidad > 1) {
      nuevo[index].cantidad--;
    } else {
      nuevo.splice(index, 1);
    }
    actualizarCarrito(nuevo);
  };

  const eliminar = (index) => {
    if (confirm(`¿Eliminar "${carrito[index].nombre}" del carrito?`)) {
      const nuevo = [...carrito];
      nuevo.splice(index, 1);
      actualizarCarrito(nuevo);
    }
  };

  const vaciarCarrito = () => {
    actualizarCarrito([]);
  };

  const finalizarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    const pedido = {
      estadoPedido: "Pendiente",
      correoClientePedido: usuario?.correoUsuario || "Invitado",
      nombreClientePedido: usuario?.nombreUsuario || "Invitado",
      totalPedido: carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      detalles: carrito.map(item => ({
      idProducto: item.id,
      cantidadDetalle: item.cantidad
    }))
    };

    try {
      const res = await fetch("http://localhost:8080/tumtum/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      if (!res.ok) throw new Error("Error al registrar el pedido");

      localStorage.removeItem("carrito");
      setCarrito([]);
      alert("Gracias por tu compra. Pedido registrado correctamente.");
    } catch (err) {
      console.error("Error al finalizar compra:", err);
      alert("No se pudo registrar el pedido");
    }
  };

  const totalGeneral = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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
                      <img src={item.imagen} alt={item.nombre} width="50" />
                      <p>{item.nombre}</p>
                      <small>Talla: {item.talla}</small>
                    </td>
                    <td>${item.precio.toLocaleString("es-CL")}</td>
                    <td>
                      <button onClick={() => restar(index)}>-</button>
                      {item.cantidad}
                      <button onClick={() => sumar(index)}>+</button>
                    </td>
                    <td>${(item.precio * item.cantidad).toLocaleString("es-CL")}</td>
                    <td>
                      <button onClick={() => eliminar(index)}>X</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="resumen">
              <p><strong>Total general:</strong> ${totalGeneral.toLocaleString("es-CL")}</p>
              <button onClick={vaciarCarrito}>Vaciar carrito</button>
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
