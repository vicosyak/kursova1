document.addEventListener("DOMContentLoaded", () => {

    function addToCart(item) {
        const cart = getCart();
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function getCart() {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function renderCart() {
        const cart = getCart();
        const container = document.getElementById("cart-container");
        const totalEl = document.getElementById("total-price");

        container.innerHTML = "";

        if (cart.length === 0) {
            container.innerHTML = "<p class='a'>Кошик порожній</p>";
            totalEl.textContent = "";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "cart-item";
            card.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>${item.price} грн</strong></p>
                <button class="remove-btn" data-index="${index}">Видалити</button>
            `;
            container.appendChild(card);

            total += item.price;
        });

        totalEl.textContent = `Загальна сума: ${total.toFixed(2)} грн`;

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.dataset.index);
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        const cart = getCart();
        cart.splice(index, 1);
        saveCart(cart);
        renderCart();
    }

    function clearCart() {
        localStorage.removeItem("cart");
        renderCart();
    }

    document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

    document.getElementById("submit-order-btn").addEventListener("click", () => {
        const firstName = document.getElementById("first-name").value.trim();
        const lastName = document.getElementById("address").value.trim();
        const phone = document.getElementById("phone-number").value.trim();
        const items = getCart().map(item => item.name);

        const phoneRegex = /^\+?380\d{9}$/;
        if (!phoneRegex.test(phone)) {
            showNotification("Введіть коректний номер телефону у форматі +380XXXXXXXXX");
            return;
        }


        if (!firstName || !address || !phone) {
            showNotification("Будь ласка, заповніть усі поля!");
            return;
        }

        if (items.length === 0) {
            showNotification("Кошик порожній!");
            return;
        }

        const order = {
            firstName,
            lastName,
            phone,
            items
        };

        fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(res => {
                if (!res.ok) throw new Error("Помилка при оформленні");
                return res.json();
            })
            .then(() => {
                showNotification("Замовлення оформлено успішно!");
                clearCart();
                document.getElementById("first-name").value = "";
                document.getElementById("address").value = "";
                document.getElementById("phone-number").value = "";
            })
            .catch(error => {
                console.error(error);
                showNotification("Помилка при оформленні")
            });
    });

    renderCart();
});

function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

