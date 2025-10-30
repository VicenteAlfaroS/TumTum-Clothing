package com.ropa.tumtumclothing.dto;

import java.util.List;

public class PedidoDTO {
    private String estadoPedido;
    private String correoClientePedido;
    private String nombreClientePedido;
    private int totalPedido;
    private List<ItemDTO> detalles;

    public String getEstadoPedido() {
        return estadoPedido;
    }

    public void setEstadoPedido(String estadoPedido) {
        this.estadoPedido = estadoPedido;
    }

    public String getCorreoClientePedido() {
        return correoClientePedido;
    }

    public void setCorreoClientePedido(String correoClientePedido) {
        this.correoClientePedido = correoClientePedido;
    }

    public String getNombreClientePedido() {
        return nombreClientePedido;
    }

    public void setNombreClientePedido(String nombreClientePedido) {
        this.nombreClientePedido = nombreClientePedido;
    }

    public int getTotalPedido() {
        return totalPedido;
    }

    public void setTotalPedido(int totalPedido) {
        this.totalPedido = totalPedido;
    }

    public List<ItemDTO> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<ItemDTO> detalles) {
        this.detalles = detalles;
    }
}

