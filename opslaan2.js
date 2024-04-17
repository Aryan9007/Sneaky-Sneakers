const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const shoeId = urlParams.get('id');

async function Product() {
    try {
        const response = await fetch('shoes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}



fetch('shoes.json')
    .then(response => response.json())
    .then(data => {
        const shoe = data.find(item => item.id === shoeId);

        if (shoe) {
            populateShoeDetails(shoe);
        } else {
            console.log('Shoe with ID ' + shoeId + ' not found.');
        }
    })
    .catch(error => console.log('Error fetching shoe details:', error));

function populateShoeDetails(shoe) {
    document.getElementById('shoe-image').src = shoe.photo1;
    document.getElementById('shoe-name').textContent = shoe.name;
    document.getElementById('shoe-price').textContent = shoe.price;
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
}

// Function to handle thumbnail hover
function handleThumbnailHover(thumbnailSrc) {
    document.getElementById('shoe-image').src = thumbnailSrc;
}
