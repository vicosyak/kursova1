package com.eateasy.kursova1.controller;

import com.eateasy.kursova1.model.Menu;
import com.eateasy.kursova1.model.Order;
import com.eateasy.kursova1.service.MenuService;
import com.eateasy.kursova1.service.OrderService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final MenuService menuService;
    private final OrderService orderService;

    public AdminController(MenuService menuService, OrderService orderService) {
        this.menuService = menuService;
        this.orderService = orderService;
    }

    // --- Управління меню ---

    @PostMapping("/menu")
    public Menu addMenuItem(@RequestBody Menu item) {
        return menuService.addItem(item);
    }

    @DeleteMapping("/menu/{id}")
    public void deleteMenuItem(@PathVariable Long id) {
        menuService.deleteItem(id);
    }

    // --- Обробка замовлень ---

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/orders/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        orderService.updateOrderStatus(id, status);
    }

    @GetMapping("/orders/active")
    public List<Order> getActiveOrders() {
        return orderService.getActiveOrders();
    }

    @GetMapping("/orders/archived")
    public List<Order> getArchivedOrders() {
        return orderService.getArchivedOrders();
    }

}
