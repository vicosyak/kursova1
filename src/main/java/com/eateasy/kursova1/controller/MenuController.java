package com.eateasy.kursova1.controller;

import com.eateasy.kursova1.model.Menu;
import com.eateasy.kursova1.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getAllMenuItems() {
        return menuService.getAllItems();
    }
}
