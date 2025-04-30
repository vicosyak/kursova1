package com.eateasy.kursova1.controller;

import com.eateasy.kursova1.model.Menu;
import com.eateasy.kursova1.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/menu")
public class UserController {

    private final MenuService menuService;

    public UserController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getMenu() {
        return menuService.getAllItems();
    }
}
