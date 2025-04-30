package com.eateasy.kursova1.service;

import com.eateasy.kursova1.model.Order;
import com.eateasy.kursova1.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order createOrder(Order order) {
        order.setStatus("NEW");
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id).orElseThrow();
        order.setStatus(status);
        orderRepository.save(order);
    }

    public List<Order> getActiveOrders() {
        return orderRepository.findByStatusNot("DONE");
    }

    public List<Order> getArchivedOrders() {
        return orderRepository.findByStatus("DONE");
    }

}
