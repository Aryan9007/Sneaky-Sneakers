fetch('shoes.json')
    .then(response => response.json())
    .then(data => {
        const allCart = document.getElementById('all-cart');
        // Loop through each item in the JSON array
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            // Create a card element for each item
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-images">
                    <img src="${item.photo1}" alt="${item.name}" class="main-image">
                </div>
                <div class="card-info">
                    <div class="thumbnail-images">
                        <img src="${item.photo1}" alt="${item.name}" class="thumbnail-image" data-src="${item.photo1}">
                        <img src="${item.photo2}" alt="${item.name}" class="thumbnail-image" data-src="${item.photo2}">
                        <img src="${item.photo3}" alt="${item.name}" class="thumbnail-image" data-src="${item.photo3}">
                    </div>
                    <h2>${item.name}</h2>
                    <p>${item.price}</p>
                </div>
            `;
            allCart.appendChild(card);
        }

        // Add event listeners to thumbnail images
        const thumbnailImages = document.querySelectorAll('.thumbnail-image');
        thumbnailImages.forEach(image => {
            image.addEventListener('mouseenter', function () {
                const mainImage = this.closest('.card').querySelector('.main-image');
                mainImage.src = this.dataset.src;
            });
            image.addEventListener('mouseleave', function () {
                const mainImage = this.closest('.card').querySelector('.main-image');
                const mainImageUrl = mainImage.src.split('/').pop(); // Get the filename of the main image
                if (mainImageUrl !== this.dataset.src.split('/').pop()) {
                    mainImage.src = this.dataset.src; // Restore the main image if it's not the same as the hovered thumbnail
                }
            });
        });
    })
    .catch(error => console.log('Error fetching JSON:', error));
