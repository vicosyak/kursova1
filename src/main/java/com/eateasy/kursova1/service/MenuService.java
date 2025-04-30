package com.eateasy.kursova1.service;

import com.eateasy.kursova1.model.Menu;
import com.eateasy.kursova1.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Menu addItem(Menu item) {
        return menuRepository.save(item);
    }

    public void deleteItem(Long id) {
        menuRepository.deleteById(id);
    }

    public List<Menu> getAllItems() {
        return menuRepository.findAll();
    }
}
