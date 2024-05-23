function updateCartDisplay() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.photo}" alt="${item.name}">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Price: €${item.price}</p>
                    <button class="delete-button" data-index="${index}">Remove</button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += itemHTML;

        totalPrice += parseFloat(item.price) || 0;
    });

    const totalPriceDisplay = document.getElementById('total-price');
    totalPriceDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const indexToDelete = parseInt(button.dataset.index, 10);
            cartItems.splice(indexToDelete, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartDisplay();
        });
    });

    const purchaseButton = document.querySelector('.pay-button');
    if (cartItems.length === 0) {
        purchaseButton.disabled = true;
        purchaseButton.style.backgroundColor = '#ccc';
        purchaseButton.removeEventListener('click', handlePurchase);
    } else {
        purchaseButton.disabled = false;
        purchaseButton.style.backgroundColor = '#C4B5AA';
        purchaseButton.addEventListener('click', handlePurchase);
    }
}

function handlePurchase() {
    const purchaseItems = JSON.parse(localStorage.getItem('purchaseItems')) || [];
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    let orderCount = parseInt(localStorage.getItem('orderCount'), 10) || 0;
    orderCount += 1;
    localStorage.setItem('orderCount', orderCount);

    const timestamp = new Date().toISOString();
    const itemsWithOrderNumber = cartItems.map(item => ({
        ...item,
        orderNumber: orderCount,
        timestamp,
    }));

    localStorage.setItem('purchaseItems', JSON.stringify(itemsWithOrderNumber.concat(purchaseItems)));
    localStorage.removeItem('cartItems');
    updateCartDisplay();
    window.location.href = "purchase.html";
}


updateCartDisplay();


