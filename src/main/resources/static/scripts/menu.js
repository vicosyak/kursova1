window.onload = () => {
    fetch("/api/menu")
        .then(res => res.json())
        .then(data => {
            const grouped = {};
            data.forEach(item => {
                if (!grouped[item.category]) grouped[item.category] = [];
                grouped[item.category].push(item);
            });

            const container = document.getElementById('menu-container');
            const sidebar = document.getElementById('category-sidebar');
            container.innerHTML = '';
            sidebar.innerHTML = '';

            Object.keys(grouped).forEach(category => {
                const id = category.toLowerCase().replace(/\s+/g, '-'); // id типу "pizza", "hot-dishes"

                // 🔹 Створюємо навігацію
                const link = document.createElement('a');
                link.href = `#${id}`;
                link.textContent = category;
                sidebar.appendChild(link);

                // 🔹 Створюємо секцію меню
                const section = document.createElement('div');
                section.className = 'menu-section';
                section.id = id;
                section.innerHTML = `<h2>${category}</h2>`;

                grouped[category].forEach(item => {
                    const el = document.createElement('div');
                    el.className = 'menu-card';
                    el.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p><strong>${item.price} грн</strong></p>
                        <button class="add-to-cart">Додати до кошика</button>
                    `;
                    el.querySelector('.add-to-cart').addEventListener('click', () => {
                        addToCart(item);
                        showNotification("Додано до кошика");
                    });
                    section.appendChild(el);
                });

                container.appendChild(section);
            });
        });
};


function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
}


function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}