document.addEventListener('DOMContentLoaded', function () {
    function updateOrderDisplay() {
        const orderItems = JSON.parse(localStorage.getItem('purchaseItems')) || [];

        const orderList = document.getElementById('order-list');
        orderList.innerHTML = '';

        if (orderItems.length === 0) {
            orderList.innerHTML = '<p>No orders found.</p>';
            return;
        }

        orderItems.forEach((item, index) => {
            const itemHTML = `
                <div class="order-item">
                    <img src="${item.photo}" alt="${item.name}">
                    <div class="order-info">
                        <h3>${item.name}</h3>
                        <p>Size: ${item.size}</p>
                        <p>Price: €${item.price}</p>
                        <button class="complete-button" data-index="${index}">Complete Order</button>
                        <h3 class="orderNumber">Order Number: ${item.orderNumber}</h3>
                    </div>
                </div>
            `;
            orderList.innerHTML += itemHTML;
        });

        const completeButtons = document.querySelectorAll('.complete-button');
        completeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const indexToComplete = parseInt(button.dataset.index, 10);
                orderItems.splice(indexToComplete, 1);
                localStorage.setItem('purchaseItems', JSON.stringify(orderItems));
                updateOrderDisplay();
            });
        });
    }

    updateOrderDisplay();
});
