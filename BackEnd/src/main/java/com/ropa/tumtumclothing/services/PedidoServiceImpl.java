package com.ropa.tumtumclothing.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ropa.tumtumclothing.entities.DetallePedido;
import com.ropa.tumtumclothing.entities.Pedido;
import com.ropa.tumtumclothing.entities.Producto;
import com.ropa.tumtumclothing.repository.PedidoRepository;
import com.ropa.tumtumclothing.repository.ProductoRepository;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    @Transactional
    public Pedido save(Pedido pedido) {
        if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("El pedido debe contener al menos un producto");
        }

        List<DetallePedido> detallesValidados = new ArrayList<>();

        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = productoRepository.findById(
                detalle.getProductoDetalle().getIdProducto()
            ).orElseThrow(() -> new RuntimeException(
                "Producto no encontrado con ID: " + detalle.getProductoDetalle().getIdProducto()
            ));

            DetallePedido nuevoDetalle = new DetallePedido();
            nuevoDetalle.setProductoDetalle(producto);
            nuevoDetalle.setCantidadDetalle(detalle.getCantidadDetalle());
            nuevoDetalle.setPedidoDetalle(pedido);

            detallesValidados.add(nuevoDetalle);
        }

        pedido.setDetalles(detallesValidados);
        return pedidoRepository.save(pedido);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Pedido> findByAll() {
        return pedidoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pedido> findById(Long id) {
        return pedidoRepository.findById(id);
    }

    @Override
    @Transactional
    public Optional<Pedido> delete(Pedido pedido) {
        Optional<Pedido> pedidoOptional = pedidoRepository.findById(pedido.getIdPedido());
        pedidoOptional.ifPresent(pedidoRepository::delete);
        return pedidoOptional;
    }
}