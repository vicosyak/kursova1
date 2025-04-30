package com.eateasy.kursova1.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "orders1")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String address;
    private String phone;
    private String status;

    @ElementCollection
    private List<String> items;

    public Order() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public String getCustomerName() {
        return firstName + " " + address;
    }

    public void setCustomerName(String customerName) {
        String[] parts = customerName.split(" ", 2);
        this.firstName = parts[0];
        this.address = parts.length > 1 ? parts[1] : "";
    }
}


