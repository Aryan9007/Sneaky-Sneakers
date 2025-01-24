const shoeId = new URLSearchParams(window.location.search).get('id');
const data = JSON.parse(localStorage.getItem("data"));
const currentShoe = data.find(shoe => shoe.id === shoeId);

const shoeNameInput = document.getElementById('shoe-name');
const shoePriceInput = document.getElementById('shoe-price');
const shoePhoto1 = document.getElementById('shoe-photo1');
const shoePhoto2 = document.getElementById('shoe-photo2');
const shoePhoto3 = document.getElementById('shoe-photo3');

shoeNameInput.value = currentShoe.name;
shoePriceInput.value = currentShoe.price;
shoePhoto1.value = currentShoe.photo1;
shoePhoto2.value = currentShoe.photo2;
shoePhoto3.value = currentShoe.photo3;

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', function () {
    currentShoe.name = shoeNameInput.value;
    currentShoe.price = shoePriceInput.value;
    currentShoe.photo1 = shoePhoto1.value;
    currentShoe.photo2 = shoePhoto2.value;
    currentShoe.photo3 = shoePhoto3.value;
    localStorage.setItem("data", JSON.stringify(data));

    window.location.href = "admin.html";
});

const cancelBtn = document.getElementById('cancel-btn');
cancelBtn.addEventListener('click', function () {
    window.location.href = "admin.html";
}); 
