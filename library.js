async function Product() {
    try {
        const response = await fetch('shoes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch shoe data');
        }
        const data = await response.json();
        localStorage.setItem("shoeData", JSON.stringify(data));
        console.log("Shoe data fetched and stored in local storage.");
        return data;
    } catch (error) {
        console.error('Error fetching shoe data:', error);
        throw error;
    }
}


async function krijgproducten(brand = null) {
    let data;
    if (localStorage.getItem("data")) {
        data = JSON.parse(localStorage.getItem("data"));
    } else {
        data = await Product();
    }
    const alles = document.getElementById('product');
    alles.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!brand || item.merk === brand) {
            const listItem = document.createElement('div');
            listItem.classList.add('card');
            listItem.innerHTML = `
                <div class="card-images">
                <img src="${item.photo1}" alt="${item.name}" class="main-image">
            </div>
            <div class="card-info">
                <div class="thumbnail-images">
                    <img src="${item.photo1}" alt="${item.name}" class="thumbnail-image" data-src="${item.photo1}">
                    <img src="${item.photo2}" alt="${item.name}" class="thumbnail-image" data-src="${item.photo2}">
                    <img src="${item.photo3}" alt="${item.name}" class="thumbnail-image" data-src="${item.photo3}">
                </div>
                <a href="inspect.html?id=${item.id}"><h2>${item.name}</h2></a>
                <a href="inspect.html?id=${item.id}"><p>€${item.price}</p></a>
            </div>
        `;
            alles.appendChild(listItem);
        }
    }

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
}

document.querySelector('a[href="#allsneaker"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    krijgproducten(); // Load all products
});

// Add event listeners to filter logos
document.querySelector('.nikefilter').addEventListener('click', function () {
    krijgproducten('nike');
});

document.querySelector('.adidasfilter').addEventListener('click', function () {
    krijgproducten('adidas');
});

document.querySelector('.jordanfilter').addEventListener('click', function () {
    krijgproducten('jordan');
});

krijgproducten();
