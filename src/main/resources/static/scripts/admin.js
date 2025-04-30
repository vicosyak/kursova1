document.addEventListener("DOMContentLoaded", () => {
    const menuTableBody = document.querySelector("#menu-table tbody");
    const form = document.getElementById("add-menu-form");
    const activeBtn = document.getElementById("show-active-btn");
    const archivedBtn = document.getElementById("show-archived-btn");

    // ========== 📌 ЗАМОВЛЕННЯ ==========

    function loadOrders(url) {
        fetch(url)
            .then(res => res.json())
            .then(orders => {
                const tbody = document.getElementById("orders-body");
                tbody.innerHTML = "";

                orders.forEach(order => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.phone}</td>
            <td>${order.items.join(", ")}</td>
            <td>${order.status}</td>
            <td>
              <select data-id="${order.id}" ${order.status === 'DONE' ? 'disabled' : ''}>
                <option value="NEW" ${order.status === 'NEW' ? 'selected' : ''}>NEW</option>
                <option value="IN_PROGRESS" ${order.status === 'IN_PROGRESS' ? 'selected' : ''}>IN_PROGRESS</option>
                <option value="DONE" ${order.status === 'DONE' ? 'selected' : ''}>DONE</option>
              </select>
            </td>
          `;
                    tbody.appendChild(tr);
                });

                // Обробка зміни статусу
                document.querySelectorAll("select[data-id]").forEach(select => {
                    select.addEventListener("change", () => {
                        const id = select.dataset.id;
                        const status = select.value;

                        fetch(`/api/admin/orders/${id}/status?status=${status}`, {
                            method: "PUT"
                        })
                            .then(() => {
                                alert("Статус оновлено");
                                loadOrders(url); // оновити після зміни
                            })
                            .catch(() => alert("Помилка при зміні статусу"));
                    });
                });
            });
    }

    // При завантаженні — активні замовлення
    loadOrders("/api/admin/orders/active");

    // Кнопки перемикання
    activeBtn.addEventListener("click", () => {
        loadOrders("/api/admin/orders/active");
    });

    archivedBtn.addEventListener("click", () => {
        loadOrders("/api/admin/orders/archived");
    });

    // ========== 📌 МЕНЮ ==========

    function fetchMenu() {
        fetch("/api/menu")
            .then(res => res.json())
            .then(data => {
                menuTableBody.innerHTML = "";
                data.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price.toFixed(2)} грн</td>
            <td><button onclick="deleteItem(${item.id})">Видалити</button></td>
            <td>${item.category}</td>
          `;
                    menuTableBody.appendChild(row);
                });
            });
    }

    // Видалення елемента меню
    window.deleteItem = function (id) {
        fetch(`/api/admin/menu/${id}`, {
            method: "DELETE"
        }).then(() => fetchMenu());
    };

    // Додавання нового елемента меню
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const newItem = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            price: parseFloat(document.getElementById("price").value),
            category: document.getElementById("category").value
        };

        fetch("/api/admin/menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newItem)
        })
            .then(res => {
                if (res.ok) {
                    alert("Страву додано!");
                    form.reset();
                    fetchMenu();
                } else {
                    alert("Помилка при додаванні страви.");
                }
            });
    });

    fetchMenu();
});
