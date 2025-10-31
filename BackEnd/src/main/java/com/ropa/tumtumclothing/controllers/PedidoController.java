package com.ropa.tumtumclothing.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ropa.tumtumclothing.entities.DetallePedido;
import com.ropa.tumtumclothing.entities.Pedido;
import com.ropa.tumtumclothing.entities.Producto;
import com.ropa.tumtumclothing.repository.ProductoRepository;
import com.ropa.tumtumclothing.repository.PedidoRepository;
import com.ropa.tumtumclothing.services.PedidoService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tumtum/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoService.findByAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> verPedido(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoService.findById(id);
        if (pedido.isPresent()) {
            return ResponseEntity.ok(pedido.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido) {
        try {
            if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
                return ResponseEntity.badRequest().body("El pedido debe tener al menos un producto");
            }

            List<DetallePedido> detallesReconstruidos = new ArrayList<>();

            for (DetallePedido detalle : pedido.getDetalles()) {
                Long idProducto = detalle.getProductoDetalle().getIdProducto();
                if (idProducto == null || detalle.getCantidadDetalle() <= 0) {
                    return ResponseEntity.badRequest().body("Producto inválido o cantidad incorrecta");
                }

                Producto producto = productoRepository.findById(idProducto).orElse(null);
                if (producto == null) {
                    return ResponseEntity.badRequest().body("Producto no encontrado: ID " + idProducto);
                }

                DetallePedido nuevoDetalle = new DetallePedido();
                nuevoDetalle.setProductoDetalle(producto);
                nuevoDetalle.setPedidoDetalle(pedido);
                nuevoDetalle.setCantidadDetalle(detalle.getCantidadDetalle());
                detallesReconstruidos.add(nuevoDetalle);
            }

            pedido.setDetalles(detallesReconstruidos);
            pedidoRepository.save(pedido);

            return ResponseEntity.status(HttpStatus.CREATED).body("Pedido registrado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al registrar el pedido");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> modificarPedido(@PathVariable Long id, @RequestBody Pedido pedidoActualizado) {
        Optional<Pedido> pedidoOptional = pedidoService.findById(id);

        if (pedidoOptional.isPresent()) {
            Pedido pedidoExistente = pedidoOptional.get();
            pedidoExistente.setCorreoClientePedido(pedidoActualizado.getCorreoClientePedido());
            pedidoExistente.setNombreClientePedido(pedidoActualizado.getNombreClientePedido());
            pedidoExistente.setEstadoPedido(pedidoActualizado.getEstadoPedido());
            pedidoExistente.setFechaCreacionPedido(pedidoActualizado.getFechaCreacionPedido());
            pedidoExistente.setTotalPedido(pedidoActualizado.getTotalPedido());
            pedidoExistente.setDetalles(pedidoActualizado.getDetalles());

            Pedido pedidoModificado = pedidoService.save(pedidoExistente);
            return ResponseEntity.ok(pedidoModificado);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPedido(@PathVariable Long id) {
        Pedido pedido = new Pedido();
        pedido.setIdPedido(id);
        Optional<Pedido> eliminado = pedidoService.delete(pedido);

        if (eliminado.isPresent()) {
            return ResponseEntity.ok(eliminado.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pedido no encontrado");
        }
    }   

}
