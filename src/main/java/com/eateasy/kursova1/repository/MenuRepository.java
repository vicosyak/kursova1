package com.eateasy.kursova1.repository;

import com.eateasy.kursova1.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
