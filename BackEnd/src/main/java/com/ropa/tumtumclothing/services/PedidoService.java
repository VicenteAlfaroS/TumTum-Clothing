package com.ropa.tumtumclothing.services;

import com.ropa.tumtumclothing.dto.PedidoDTO;
import com.ropa.tumtumclothing.entities.Pedido;

import java.util.List;
import java.util.Optional;

public interface PedidoService {
    List<Pedido> findByAll();
    Optional<Pedido> findById(Long id);
    Pedido save(Pedido unPedido);
    Optional<Pedido> delete(Pedido unPedido);
    Pedido crearPedidoDesdeDTO(PedidoDTO pedidoDTO);
}