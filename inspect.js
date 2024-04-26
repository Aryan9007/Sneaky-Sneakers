async function getProductData() {
    try {
        let data = localStorage.getItem("data");
        if (!data) {
            const response = await fetch('shoes.json');
            if (!response.ok) {
                throw new Error('Failed to fetch shoe data');
            }
            data = await response.json();
            localStorage.setItem("data", JSON.stringify(data));
            console.log("Shoe data fetched and stored in local storage.");
        } else {
            data = JSON.parse(data);
            console.log("Shoe data loaded from local storage.");
        }
        return data;
    } catch (error) {
        console.error('Error fetching shoe data:', error);
        throw error;
    }
}

function handleThumbnailHover(thumbnailSrc) {
    document.getElementById('shoe-image').src = thumbnailSrc;
}

async function populateProductDetails() {
    try {
        const shoeId = new URLSearchParams(window.location.search).get('id');
        const data = await getProductData();
        const shoe = data.find(item => item.id === shoeId);

        if (shoe) {
            document.getElementById('shoe-image').src = shoe.photo1;
            document.getElementById('shoe-name').textContent = shoe.name;
            document.getElementById('shoe-price').textContent = '€' + shoe.price;
            document.getElementById('shoe-description').textContent = shoe.description;

            const thumbnailContainer = document.getElementById('thumbnail-container');
            thumbnailContainer.innerHTML = '';

            for (let i = 1; i <= 3; i++) {
                const thumbnailImg = document.createElement('img');
                thumbnailImg.src = shoe[`photo${i}`];
                thumbnailImg.alt = `Thumbnail ${i}`;
                thumbnailImg.classList.add('thumbnail-image');
                thumbnailImg.addEventListener('mouseenter', function () {
                    handleThumbnailHover(this.src);
                });
                thumbnailContainer.appendChild(thumbnailImg);
            }

            const sizes = shoe.sizes;
            const sizeOptions = document.getElementById('size-options');
            sizeOptions.innerHTML = '';

            sizes.forEach(size => {
                const button = document.createElement('button');
                button.classList.add('size-button');
                button.textContent = size;
                button.addEventListener('click', function () {
                    const buttons = document.querySelectorAll('.size-button');
                    buttons.forEach(btn => btn.classList.remove('selected'));

                    button.classList.add('selected');

                    const selectedSize = size;
                    console.log('Selected size:', selectedSize);
                });
                sizeOptions.appendChild(button);
            });
        } else {
            console.log('Shoe with ID ' + shoeId + ' not found.');
        }
    } catch (error) {
        console.error('Error populating shoe details:', error);
    }
}

const addToCartButton = document.querySelector('.button-shop');

addToCartButton.addEventListener('click', async function () {
    const shoeId = new URLSearchParams(window.location.search).get('id');
    const selectedSize = document.querySelector('.size-button.selected').textContent;

    try {
        const response = await fetch('shoes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch shoe data');
        }
        const data = await response.json();
        const selectedShoe = data.find(shoe => shoe.id === shoeId);

        if (selectedShoe) {
            const selectedItem = {
                id: shoeId,
                name: selectedShoe.name,
                size: selectedSize,
                photo: selectedShoe.photo1,
                price: selectedShoe.price,
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(selectedItem);

            // Store updated cart items in local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            console.log('Item added to cart:', selectedItem);
        } else {
            console.log('Shoe with ID ' + shoeId + ' not found.');
        }
    } catch (error) {
        console.error('Error fetching shoe data:', error);
    }
});

populateProductDetails();
