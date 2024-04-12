document.addEventListener('DOMContentLoaded', function () {
    // Fetch JSON data
    fetch('shoes.json')
        .then(response => response.json())
        .then(data => {
            const allCart = document.getElementById('all-cart');

            // Function to create cards based on data
            const createCards = (shoesData) => {
                allCart.innerHTML = ''; // Clear existing cards
                shoesData.forEach(item => {
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
                });

                const thumbnailImages = document.querySelectorAll('.thumbnail-image');
                thumbnailImages.forEach(image => {
                    image.addEventListener('mouseenter', function () {
                        const mainImage = this.closest('.card').querySelector('.main-image');
                        mainImage.src = this.dataset.src;
                    });
                    image.addEventListener('mouseleave', function () {
                        const mainImage = this.closest('.card').querySelector('.main-image');
                        const mainImageUrl = mainImage.src.split('/').pop();
                        if (mainImageUrl !== this.dataset.src.split('/').pop()) {
                            mainImage.src = this.dataset.src;
                        }
                    });
                });
            };

            createCards(data);

            const filterLogos = document.querySelectorAll('.filterlogo img');
            filterLogos.forEach(logo => {
                logo.addEventListener('click', function () {
                    const brand = this.alt.toLowerCase();
                    const filteredData = data.filter(item => item.merk === brand);
                    createCards(filteredData);
                });
            });

            const allSneakersLink = document.querySelector('.nav-links a[href="#allsneaker"]');
            allSneakersLink.addEventListener('click', function (event) {
                event.preventDefault();
                createCards(data);
            });

            const filterLinks = document.querySelectorAll('.nav-links a[href="#male"], .nav-links a[href="#female"]');
            filterLinks.forEach((filterLink) => {
                filterLink.addEventListener('click', (event) => {
                    const filter = event.target.hash.substring(1);
                    event.preventDefault();
                    const filteredData = data.filter((item) => item.gender === filter);
                    createCards(filteredData);
                });
            });
        })
        .catch(error => console.log('Error fetching JSON:', error));
});
