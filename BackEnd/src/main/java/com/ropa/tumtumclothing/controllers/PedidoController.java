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
import com.ropa.tumtumclothing.services.PedidoService;

import com.ropa.tumtumclothing.dto.PedidoDTO;
import com.ropa.tumtumclothing.dto.ItemDTO;
import com.ropa.tumtumclothing.repository.PedidoRepository;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tumtum/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService service;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;


    @GetMapping
    public List<Pedido> listarPedidos() {
        return service.findByAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> verPedido(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody PedidoDTO dto) {
        try {
            Pedido pedido = new Pedido();
            pedido.setEstadoPedido(dto.getEstadoPedido());
            pedido.setCorreoClientePedido(dto.getCorreoClientePedido());
            pedido.setNombreClientePedido(dto.getNombreClientePedido());
            pedido.setTotalPedido(dto.getTotalPedido());

            List<DetallePedido> detallesReconstruidos = new ArrayList<>();

            for (ItemDTO item : dto.getDetalles()) {
                if (item.getIdProducto() == null || item.getCantidadDetalle() <= 0) {
                    return ResponseEntity.badRequest().body("Producto inválido o cantidad incorrecta");
                }

                Producto producto = productoRepository.findById(item.getIdProducto()).orElse(null);
                if (producto == null) {
                    return ResponseEntity.badRequest().body("Producto no encontrado: ID " + item.getIdProducto());
                }

                DetallePedido detalle = new DetallePedido();
                detalle.setProductoDetalle(producto); 
                detalle.setPedidoDetalle(pedido);     
                detalle.setCantidadDetalle(item.getCantidadDetalle());
                detallesReconstruidos.add(detalle);
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
        return service.findById(id).map(pedidoExistente -> {
            pedidoExistente.setCorreoClientePedido(pedidoActualizado.getCorreoClientePedido());
            pedidoExistente.setNombreClientePedido(pedidoActualizado.getNombreClientePedido());
            pedidoExistente.setEstadoPedido(pedidoActualizado.getEstadoPedido());
            pedidoExistente.setFechaCreacionPedido(pedidoActualizado.getFechaCreacionPedido());
            pedidoExistente.setTotalPedido(pedidoActualizado.getTotalPedido());
            pedidoExistente.setDetalles(pedidoActualizado.getDetalles());

            Pedido pedidoModificado = service.save(pedidoExistente);
            return ResponseEntity.ok(pedidoModificado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarPedido(@PathVariable Long id) {
        Pedido pedido = new Pedido();
        pedido.setIdPedido(id);
        Optional<Pedido> eliminado = service.delete(pedido);
        return eliminado.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
