package com.ropa.tumtumclothing.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "detalle_pedido")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetalle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto productoDetalle;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    private Pedido pedidoDetalle;

    @Column(name = "cantidad_detalle", nullable = false)
    private Integer cantidadDetalle;

    public DetallePedido() {}

    public DetallePedido(Producto productoDetalle, Pedido pedidoDetalle, Integer cantidadDetalle) {
        this.productoDetalle = productoDetalle;
        this.pedidoDetalle = pedidoDetalle;
        this.cantidadDetalle = cantidadDetalle;
    }

    public DetallePedido(Long idDetalle, Producto productoDetalle, Pedido pedidoDetalle, Integer cantidadDetalle) {
        this.idDetalle = idDetalle;
        this.productoDetalle = productoDetalle;
        this.pedidoDetalle = pedidoDetalle;
        this.cantidadDetalle = cantidadDetalle;
    }

    public Long getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(Long idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Producto getProductoDetalle() {
        return productoDetalle;
    }

    public void setProductoDetalle(Producto productoDetalle) {
        this.productoDetalle = productoDetalle;
    }

    public Pedido getPedidoDetalle() {
        return pedidoDetalle;
    }

    public void setPedidoDetalle(Pedido pedidoDetalle) {
        this.pedidoDetalle = pedidoDetalle;
    }

    public Integer getCantidadDetalle() {
        return cantidadDetalle;
    }

    public void setCantidadDetalle(Integer cantidadDetalle) {
        this.cantidadDetalle = cantidadDetalle;
    }
}
