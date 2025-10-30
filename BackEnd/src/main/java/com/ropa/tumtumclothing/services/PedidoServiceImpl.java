package com.ropa.tumtumclothing.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ropa.tumtumclothing.dto.ItemDTO;
import com.ropa.tumtumclothing.dto.PedidoDTO;
import com.ropa.tumtumclothing.entities.*;
import com.ropa.tumtumclothing.repository.PedidoRepository;
import com.ropa.tumtumclothing.repository.ProductoRepository;

@Service
public class PedidoServiceImpl implements PedidoService {

    @Autowired
    private PedidoRepository repository;

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    @Transactional
    public Pedido crearPedidoDesdeDTO(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setEstadoPedido(pedidoDTO.getEstadoPedido());
        pedido.setCorreoClientePedido(pedidoDTO.getCorreoClientePedido());
        pedido.setNombreClientePedido(pedidoDTO.getNombreClientePedido());
        pedido.setTotalPedido(pedidoDTO.getTotalPedido());

        Pedido pedidoGuardado = repository.save(pedido);
        for (ItemDTO item : pedidoDTO.getDetalles()) {
            Optional<Producto> productoOptional = productoRepository.findById(item.getIdProducto());
            if (productoOptional.isPresent()) {
                Producto producto = productoOptional.get();
                pedidoGuardado.agregarProducto(producto, item.getCantidadDetalle());
            } else {
                throw new RuntimeException("Producto no encontrado con ID: " + item.getIdProducto());
            }
        }

        return repository.save(pedidoGuardado);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Pedido> findByAll() {
        return (List<Pedido>)repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pedido> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Pedido save(Pedido unPedido) {
        return repository.save(unPedido);
    };

    @Override
    @Transactional
    public Optional<Pedido> delete(Pedido unPedido){
        Optional<Pedido> pedidoOptional = repository.findById(unPedido.getIdPedido());
        pedidoOptional.ifPresent(productoDB->{
            repository.delete(unPedido);
        });
        return pedidoOptional;
    }
}