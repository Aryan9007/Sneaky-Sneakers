async function Product() {
    try {
        const response = await fetch('shoes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch shoe data');
        }
        const data = await response.json();
        localStorage.setItem("data", JSON.stringify(data));
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
                <h2>${item.name}</h2>
                <p>€${item.price}</p>
                <a href="edit.html?id=${item.id}" class="edit-button">Edit</a>
                ${item.disabled ? `<button onclick="enablebtn(${item.id})" class="enable-btn">Enable</button>` :
        `<button onclick="disablebtn(${item.id})" class="disable-btn">Disable</button>`}
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

async function disablebtn(id) {
    console.log("disablebtn", id);
    const data = JSON.parse(localStorage.getItem("data"));
    console.log("data", data);
    const itemData = data.find(item => item.id === JSON.stringify(id));
    console.log("itemData", itemData);
    if (itemData) {
        itemData.disabled = true;
        localStorage.setItem("data", JSON.stringify(data));
        await krijgproducten();
    } else {
        console.log("Item not found");
    }
    await krijgproducten();
}
async function enablebtn(id) {
    console.log("enablebtn", id);
    const data = JSON.parse(localStorage.getItem("data"));
    console.log("data", data);
    const itemData = data.find(item => item.id === JSON.stringify(id));
    console.log("itemData", itemData);
    if (itemData) {
        itemData.disabled = false;
        localStorage.setItem("data", JSON.stringify(data));
        await krijgproducten();
    } else {
        console.log("Item not found");
    }
    await krijgproducten();
}

function addcart() {
    const data = JSON.parse(localStorage.getItem("data"));
    const item = {};
    for (let i = 0; i < data.length + 1; i++) {
        if (data.find(items => parseInt(items.id, 10) === i + 1) === undefined) {
            item.id = i + 1;
            break;
        }
    }
    console.log(item.id);
    item.id = JSON.stringify(item.id);
    item.name = "In Progress";
    item.price = 0;
    item.size = "In Progress";
    item.photo1 = "(Img location)";
    item.photo2 = "(Img location)";
    item.photo3 = "(Img location)";
    item.disabled = true;
    data.push(item);
    localStorage.setItem("data", JSON.stringify(data));
    krijgproducten();
}
function reset() {
    localStorage.removeItem("data");
    krijgproducten();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "c") {
        console.log("clear");
        localStorage.clear();
        krijgproducten();
    }
});

krijgproducten();
